import { makeConfig, makeEvent } from '@tests/helpers';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { initSign } from '@/commands/sign';
import type { CommandEvent, GuestbookData } from '@/types';

const {
  mockUpdate,
  mockStorage,
  mockSignedThisStream,
  mockQueueSign,
  mockSendMessage,
  mockClientOn,
} = vi.hoisted(() => {
  const update = vi.fn();
  const store = {
    data: {} as GuestbookData,
    update,
  };
  return {
    mockUpdate: update,
    mockStorage: store,
    mockSignedThisStream: new Set<string>(),
    mockQueueSign: vi.fn(),
    mockSendMessage: vi.fn(),
    mockClientOn: vi.fn(),
  };
});

vi.mock('@/storage', () => ({
  get storage() {
    return mockStorage;
  },
  get signedThisStream() {
    return mockSignedThisStream;
  },
}));
vi.mock('@/book', () => ({ queueSign: mockQueueSign, queueVisit: vi.fn() }));
vi.mock('@/helpers', async (orig) => ({
  ...(await orig<typeof import('@/helpers')>()),
  sendChatMessage: mockSendMessage,
}));
vi.mock('@/client', () => ({ default: { on: mockClientOn } }));

const MockCommand = vi.hoisted(() => vi.fn());
vi.mock('@tixyel/streamelements', () => ({
  default: {
    Client: vi.fn(),
    actions: { Command: MockCommand, Button: vi.fn() },
    logger: { success: vi.fn(), debug: vi.fn(), info: vi.fn() },
    SeAPI: Promise.resolve({ sendMessage: vi.fn() }),
  },
  StreamElements: {},
}));

function makeSign(config = makeConfig()) {
  MockCommand.mockReset();
  initSign(config);
  // Sign registers one Command
  return (
    MockCommand.mock.calls[0][0] as {
      run: (arguments_: string[], event: CommandEvent) => void;
    }
  ).run;
}

function triggerReward(
  config = makeConfig({ enableSignReward: true }),
  rewardName = config.signRewardName
) {
  initSign(config);
  const calls = mockClientOn.mock.calls as Array<
    [string, (provider: string, event: unknown) => void]
  >;
  const found = calls.find(([event]) => event === 'event');
  found?.[1]?.('twitch', {
    listener: 'event',
    event: {
      type: 'channelPointsRedemption',
      data: {
        redemption: rewardName,
        providerId: 'alice',
        displayName: 'Alice',
        username: 'alice',
      },
    },
  });
}

describe('Sign command', () => {
  beforeEach(() => {
    mockStorage.data = { guests: {}, visits: {} };
    mockSignedThisStream.clear();
    mockUpdate.mockReset();
    mockQueueSign.mockReset();
    mockSendMessage.mockReset();
    mockClientOn.mockReset();
  });

  it('records a new guest on first sign', () => {
    const run = makeSign();
    run([], makeEvent('alice', 'Alice'));

    expect(mockUpdate).toHaveBeenCalledOnce();
    const { guests } = mockUpdate.mock.calls[0][0] as GuestbookData;
    expect(guests['alice'].displayName).toBe('Alice');
    expect(guests['alice'].count).toBe(1);
  });

  it('increments count on subsequent signs', () => {
    mockStorage.data.guests['alice'] = {
      displayName: 'Alice',
      count: 3,
      streak: 2,
      lastSeen: Date.now(),
    };
    const run = makeSign();
    run([], makeEvent('alice', 'Alice'));

    const { guests } = mockUpdate.mock.calls[0][0] as GuestbookData;
    expect(guests['alice'].count).toBe(4);
  });

  it('blocks re-signing in the same stream session', () => {
    mockSignedThisStream.add('alice');
    const run = makeSign();
    run([], makeEvent('alice', 'Alice'));

    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('increments streak when signing within the reset window', () => {
    const recentLastSeen = Date.now() - 1 * 24 * 60 * 60 * 1000; // 1 day ago
    mockStorage.data.guests['alice'] = {
      displayName: 'Alice',
      count: 1,
      streak: 1,
      lastSeen: recentLastSeen,
    };
    const run = makeSign(makeConfig({ streakResetDays: 7 }));
    run([], makeEvent('alice', 'Alice'));

    const { guests } = mockUpdate.mock.calls[0][0] as GuestbookData;
    expect(guests['alice'].streak).toBe(2);
  });

  it('resets streak to 1 when signing after the reset window', () => {
    const oldLastSeen = Date.now() - 30 * 24 * 60 * 60 * 1000; // 30 days ago
    mockStorage.data.guests['alice'] = {
      displayName: 'Alice',
      count: 5,
      streak: 5,
      lastSeen: oldLastSeen,
    };
    const run = makeSign(makeConfig({ streakResetDays: 7 }));
    run([], makeEvent('alice', 'Alice'));

    const { guests } = mockUpdate.mock.calls[0][0] as GuestbookData;
    expect(guests['alice'].streak).toBe(1);
  });

  it('queues sign animation when enabled', () => {
    const run = makeSign(makeConfig({ enableSignAnimation: true }));
    run([], makeEvent('alice', 'Alice'));

    expect(mockQueueSign).toHaveBeenCalledOnce();
    expect(mockQueueSign).toHaveBeenCalledWith(1);
  });

  it('does not queue animation when disabled', () => {
    const run = makeSign(makeConfig({ enableSignAnimation: false }));
    run([], makeEvent('alice', 'Alice'));

    expect(mockQueueSign).not.toHaveBeenCalled();
  });

  it('sends chat message with name and count substituted', () => {
    const run = makeSign(
      makeConfig({ signMessage: '@{name} signed #{count}!' })
    );
    run([], makeEvent('alice', 'Alice'));

    expect(mockSendMessage).toHaveBeenCalledWith('@Alice signed #1!');
  });

  it('does not send message when disabled', () => {
    const run = makeSign(makeConfig({ enableSignMessage: false }));
    run([], makeEvent('alice', 'Alice'));

    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it('blocks Twitch command when enableSignCommandTwitch is false', () => {
    const run = makeSign(makeConfig({ enableSignCommandTwitch: false }));
    run([], makeEvent('alice', 'Alice'));

    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('blocks non-Twitch command when enableSignCommandOther is false', () => {
    const run = makeSign(makeConfig({ enableSignCommandOther: false }));
    run([], makeEvent('alice', 'Alice', false, 'youtube'));

    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('records visits entry alongside guests on sign', () => {
    const run = makeSign();
    run([], makeEvent('alice', 'Alice'));

    const call = mockUpdate.mock.calls[0][0] as GuestbookData;
    expect(call.visits['alice']).toHaveLength(1);
    expect(call.visits['alice'][0].platform).toBe('twitch');
    expect(call.visits['alice'][0].via).toBe('command');
  });

  describe('Channel Points reward', () => {
    it('signs on matching reward redemption', () => {
      triggerReward();

      expect(mockUpdate).toHaveBeenCalledOnce();
      const { guests } = mockUpdate.mock.calls[0][0] as GuestbookData;
      expect(guests['alice'].count).toBe(1);
    });

    it('ignores reward when enableSignReward is false', () => {
      triggerReward(makeConfig({ enableSignReward: false }));

      expect(mockUpdate).not.toHaveBeenCalled();
    });

    it('ignores redemption with a different reward name', () => {
      triggerReward(makeConfig({ enableSignReward: true }), 'Wrong Reward');

      expect(mockUpdate).not.toHaveBeenCalled();
    });

    it('records via as reward in visits entry', () => {
      triggerReward();

      const call = mockUpdate.mock.calls[0][0] as GuestbookData;
      expect(call.visits['alice'][0].via).toBe('reward');
    });
  });
});
