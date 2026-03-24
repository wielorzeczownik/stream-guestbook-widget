import { makeConfig, makeEvent } from '@tests/helpers';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { initVisits } from '@/commands/visits';
import type { CommandEvent, GuestbookData } from '@/types';

const { mockStorage, mockSendMessage, mockQueueVisit } = vi.hoisted(() => {
  const store = {
    data: {} as GuestbookData,
    update: vi.fn(),
  };
  return {
    mockStorage: store,
    mockSendMessage: vi.fn(),
    mockQueueVisit: vi.fn(),
  };
});

vi.mock('@/storage', () => ({
  get storage() {
    return mockStorage;
  },
}));
vi.mock('@/book', () => ({ queueSign: vi.fn(), queueVisit: mockQueueVisit }));
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

function makeVisits(config = makeConfig()) {
  MockCommand.mockReset();
  initVisits(config);
  return (
    MockCommand.mock.calls[0][0] as {
      run: (arguments_: string[], event: CommandEvent) => void;
    }
  ).run;
}

describe('Visits command', () => {
  beforeEach(() => {
    mockStorage.data = { guests: {}, visits: {} };
    mockSendMessage.mockReset();
    mockQueueVisit.mockReset();
  });

  it('sends not-found message for user who never signed', () => {
    const run = makeVisits();
    run([], makeEvent('alice', 'Alice'));
    expect(mockSendMessage).toHaveBeenCalledWith('@Alice never visited!');
  });

  it('sends found message with count for self-lookup', () => {
    mockStorage.data.guests['alice'] = { displayName: 'Alice', count: 4 };
    const run = makeVisits();
    run([], makeEvent('alice', 'Alice'));
    expect(mockSendMessage).toHaveBeenCalledWith('@Alice visited 4 times!');
  });

  it('queues visit animation when count > 0 and animation is enabled', () => {
    mockStorage.data.guests['alice'] = { displayName: 'Alice', count: 2 };
    const run = makeVisits(makeConfig({ enableVisitsAnimation: true }));
    run([], makeEvent('alice', 'Alice'));
    expect(mockQueueVisit).toHaveBeenCalledOnce();
  });

  it('does not queue animation when disabled', () => {
    mockStorage.data.guests['alice'] = { displayName: 'Alice', count: 2 };
    const run = makeVisits(makeConfig({ enableVisitsAnimation: false }));
    run([], makeEvent('alice', 'Alice'));
    expect(mockQueueVisit).not.toHaveBeenCalled();
  });

  it('mod lookup by display name - found', () => {
    mockStorage.data.guests['alice'] = { displayName: 'Alice', count: 7 };
    const run = makeVisits();
    run(['@Alice'], makeEvent('bob', 'Bob', true));
    expect(mockSendMessage).toHaveBeenCalledWith('@Alice visited 7 times!');
  });

  it('mod lookup by display name - not found', () => {
    const run = makeVisits();
    run(['@Charlie'], makeEvent('bob', 'Bob', true));
    expect(mockSendMessage).toHaveBeenCalledWith('@Charlie never visited!');
  });

  it('does nothing when command is disabled', () => {
    const run = makeVisits(makeConfig({ enableVisitsCommand: false }));
    run([], makeEvent('alice', 'Alice'));
    expect(mockSendMessage).not.toHaveBeenCalled();
  });
});
