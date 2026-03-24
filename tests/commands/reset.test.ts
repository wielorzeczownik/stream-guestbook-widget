import { makeConfig, makeEvent } from '@tests/helpers';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { initReset } from '@/commands/reset';
import type { CommandEvent, GuestbookData } from '@/types';

const { mockUpdate, mockStorage, mockSignedThisStream, mockSendMessage } =
  vi.hoisted(() => {
    const update = vi.fn();
    const store = {
      data: {} as GuestbookData,
      update,
    };
    return {
      mockUpdate: update,
      mockStorage: store,
      mockSignedThisStream: new Set<string>(),
      mockSendMessage: vi.fn(),
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
vi.mock('@/helpers', async (orig) => ({
  ...(await orig<typeof import('@/helpers')>()),
  sendChatMessage: mockSendMessage,
}));
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

function makeReset(config = makeConfig()) {
  MockCommand.mockReset();
  initReset(config);
  return (
    MockCommand.mock.calls[0][0] as {
      run: (arguments_: string[], event: CommandEvent) => void;
    }
  ).run;
}

describe('Reset command', () => {
  beforeEach(() => {
    mockStorage.data = { guests: {}, visits: {} };
    mockSignedThisStream.clear();
    mockUpdate.mockReset();
    mockSendMessage.mockReset();
  });

  it('mod can reset another user by display name', () => {
    mockStorage.data.guests['alice'] = { displayName: 'Alice', count: 3 };
    mockSignedThisStream.add('alice');

    const run = makeReset();
    run(['@Alice'], makeEvent('bob', 'Bob', true));

    const { guests } = mockUpdate.mock.calls[0][0] as GuestbookData;
    expect(guests['alice']).toBeUndefined();
    expect(mockSignedThisStream.has('alice')).toBe(false);
    expect(mockSendMessage).toHaveBeenCalledWith('@Alice reset!');
  });

  it("sends not-found message when target doesn't exist", () => {
    const run = makeReset();
    run(['@Charlie'], makeEvent('bob', 'Bob', true));

    expect(mockUpdate).not.toHaveBeenCalled();
    expect(mockSendMessage).toHaveBeenCalledWith('@Charlie not found!');
  });

  it('allows self-reset when enableSelfReset is true', () => {
    mockStorage.data.guests['alice'] = { displayName: 'Alice', count: 2 };
    mockSignedThisStream.add('alice');

    const run = makeReset(makeConfig({ enableSelfReset: true }));
    run([], makeEvent('alice', 'Alice', false));

    const { guests } = mockUpdate.mock.calls[0][0] as GuestbookData;
    expect(guests['alice']).toBeUndefined();
    expect(mockSendMessage).toHaveBeenCalledWith('@Alice reset!');
  });

  it('blocks self-reset when enableSelfReset is false', () => {
    mockStorage.data.guests['alice'] = { displayName: 'Alice', count: 2 };

    const run = makeReset(makeConfig({ enableSelfReset: false }));
    run([], makeEvent('alice', 'Alice', false));

    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('non-mod cannot reset another user', () => {
    mockStorage.data.guests['alice'] = { displayName: 'Alice', count: 2 };
    mockStorage.data.guests['bob'] = { displayName: 'Bob', count: 1 };
    mockSignedThisStream.add('alice');
    mockSignedThisStream.add('bob');

    const run = makeReset(makeConfig({ enableSelfReset: false }));
    run(['@Alice'], makeEvent('bob', 'Bob', false));

    // Alice should be untouched
    expect(mockStorage.data.guests['alice']).toBeDefined();
    // self-reset is disabled, so nothing happens at all
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('does nothing when command is disabled', () => {
    mockStorage.data.guests['alice'] = { displayName: 'Alice', count: 2 };

    const run = makeReset(makeConfig({ enableResetCommand: false }));
    run(['@Alice'], makeEvent('bob', 'Bob', true));

    expect(mockUpdate).not.toHaveBeenCalled();
  });
});
