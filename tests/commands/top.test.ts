import { makeConfig } from '@tests/helpers';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { initTop } from '@/commands/top';
import type { GuestbookData } from '@/types';

const { mockStorage, mockSendMessage } = vi.hoisted(() => {
  const store = {
    data: {} as GuestbookData,
    update: vi.fn(),
  };
  return { mockStorage: store, mockSendMessage: vi.fn() };
});

vi.mock('@/storage', () => ({
  get storage() {
    return mockStorage;
  },
}));
vi.mock('@/helpers', () => ({ sendChatMessage: mockSendMessage }));
vi.mock('@/client', () => ({ default: { on: vi.fn() } }));

const MockCommand = vi.hoisted(() => vi.fn());
vi.mock('@tixyel/streamelements', () => ({
  default: {
    Client: vi.fn(),
    actions: { Command: MockCommand, Button: vi.fn() },
    logger: { success: vi.fn(), debug: vi.fn() },
    SeAPI: Promise.resolve({ sendMessage: vi.fn() }),
  },
  StreamElements: {},
}));

function makeTop(config = makeConfig()) {
  MockCommand.mockReset();
  initTop(config);
  return (
    MockCommand.mock.calls[0][0] as {
      run: (arguments_: string[], event: unknown) => void;
    }
  ).run;
}

const fakeEvent = {
  provider: 'twitch',
  data: {
    event: {
      data: {
        userId: 'bob',
        nick: 'bob',
        displayName: 'Bob',
        badges: [{ type: 'broadcaster', version: '1' }],
      },
    },
  },
};

describe('Top command', () => {
  beforeEach(() => {
    mockStorage.data = { guests: {}, visits: {} };
    mockSendMessage.mockReset();
  });

  it('sends empty message when no guests', () => {
    const run = makeTop();
    run([], fakeEvent);
    expect(mockSendMessage).toHaveBeenCalledWith('Nobody yet');
  });

  it('lists guests sorted by count descending', () => {
    mockStorage.data.guests = {
      u1: { displayName: 'Alice', count: 5 },
      u2: { displayName: 'Bob', count: 10 },
      u3: { displayName: 'Charlie', count: 3 },
    };
    const run = makeTop();
    run([], fakeEvent);
    expect(mockSendMessage).toHaveBeenCalledWith(
      'Top: 1. @Bob (10) | 2. @Alice (5) | 3. @Charlie (3)'
    );
  });

  it('respects topCount limit', () => {
    mockStorage.data.guests = {
      u1: { displayName: 'Alice', count: 5 },
      u2: { displayName: 'Bob', count: 10 },
      u3: { displayName: 'Charlie', count: 3 },
      u4: { displayName: 'Dave', count: 1 },
    };
    const run = makeTop(makeConfig({ topCount: 2 }));
    run([], fakeEvent);
    expect(mockSendMessage).toHaveBeenCalledWith(
      'Top: 1. @Bob (10) | 2. @Alice (5)'
    );
  });

  it('does nothing when command is disabled', () => {
    mockStorage.data.guests = { u1: { displayName: 'Alice', count: 1 } };
    const run = makeTop(makeConfig({ enableTopCommand: false }));
    run([], fakeEvent);
    expect(mockSendMessage).not.toHaveBeenCalled();
  });
});
