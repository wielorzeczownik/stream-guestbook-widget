import Tixyel, { type StreamElements } from '@tixyel/streamelements';

import { queueSign } from '@/book';
import client from '@/client';
import { COMMAND_PREFIX } from '@/constants';
import { getUser, sendChatMessage } from '@/helpers';
import { signedThisStream, storage } from '@/storage';
import type { CommandEvent, Config, GuestEntry, VisitEntry } from '@/types';

export function initSign(config: Config): void {
  function sign(
    userId: string,
    displayName: string,
    platform: string,
    via: 'command' | 'reward' = 'command'
  ): void {
    if (signedThisStream.has(userId)) {
      Tixyel.logger.debug(
        `[Guestbook] ${displayName} already signed this stream`
      );
      return;
    }

    signedThisStream.add(userId);

    const updatedGuests: Record<string, GuestEntry> = {
      ...storage.data.guests,
    };
    const now = Date.now();
    const existingEntry = updatedGuests[userId] ?? { displayName, count: 0 };
    const newCount = existingEntry.count + 1;

    const resetThresholdMs = config.streakResetDays * 24 * 60 * 60 * 1000;
    const gapSinceLastSign = existingEntry.lastSeen
      ? now - existingEntry.lastSeen
      : Infinity;
    const newStreak =
      gapSinceLastSign <= resetThresholdMs
        ? (existingEntry.streak ?? 1) + 1
        : 1;

    updatedGuests[userId] = {
      displayName,
      count: newCount,
      platform,
      firstSeen: existingEntry.firstSeen ?? now,
      lastSeen: now,
      streak: newStreak,
    };

    const updatedVisits = { ...storage.data.visits };
    const visitEntry: VisitEntry = { timestamp: now, platform, via };
    updatedVisits[userId] = [...(updatedVisits[userId] ?? []), visitEntry];

    storage.update({ guests: updatedGuests, visits: updatedVisits });
    if (config.enableSignAnimation) queueSign(newCount);

    if (config.enableSignMessage) {
      const message = config.signMessage
        .replace('{name}', displayName)
        .replace('{count}', String(newCount));
      void sendChatMessage(message);
    }

    Tixyel.logger.success(
      `[Guestbook] ${displayName} signed (visit #${newCount})`
    );
  }

  function onCommand(event: CommandEvent): void {
    if (event.provider === 'twitch' && !config.enableSignCommandTwitch) return;
    if (event.provider !== 'twitch' && !config.enableSignCommandOther) return;

    const { userId, displayName } = getUser(event);
    sign(userId, displayName, event.provider);
  }

  client.on('event', (provider, event) => {
    if (!config.enableSignReward || provider !== 'twitch') return;

    const twitchEvent = event as StreamElements.Event.Provider.Twitch.Event;
    if (twitchEvent.listener !== 'event') return;

    const inner = twitchEvent.event;
    if (inner.type !== 'channelPointsRedemption') return;
    if (inner.data.redemption !== config.signRewardName) return;

    sign(
      inner.data.providerId,
      inner.data.displayName || inner.data.username,
      provider,
      'reward'
    );
  });

  void new Tixyel.actions.Command({
    prefix: COMMAND_PREFIX,
    name: config.signCommandName,
    description: 'Sign the Guestbook',
    arguments: false,
    run: (_arguments, event) => onCommand(event),
  });

  void new Tixyel.actions.Button({
    field: 'btnTestAnimation',
    name: 'Test animation',
    run() {
      const count = Object.keys(storage.data.guests).length || 1;
      queueSign(count);
      Tixyel.logger.success('[Guestbook] Test animation triggered');
    },
  });

  void new Tixyel.actions.Button({
    field: 'btnResetSession',
    name: 'Reset stream session (allow re-signing)',
    run() {
      signedThisStream.clear();
      Tixyel.logger.success('[Guestbook] Stream session reset');
    },
  });
}
