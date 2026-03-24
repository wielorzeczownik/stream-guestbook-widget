import Tixyel from '@tixyel/streamelements';

import { COMMAND_PREFIX } from '@/constants';
import { getUser, isModeratorOrBroadcaster, sendChatMessage } from '@/helpers';
import { signedThisStream, storage } from '@/storage';
import type { CommandEvent, Config } from '@/types';

function resetUser(userId: string): void {
  signedThisStream.delete(userId);

  const updatedGuests = { ...storage.data.guests };
  delete updatedGuests[userId];
  storage.update({ guests: updatedGuests });
}

export function initReset(config: Config): void {
  function onCommand(arguments_: string[], event: CommandEvent): void {
    if (!config.enableResetCommand) return;

    const target = arguments_[0]?.replace(/^@/, '');

    // Mods and the broadcaster can reset anyone by passing a username
    if (target && isModeratorOrBroadcaster(event)) {
      // Look up by display name since chat users type names, not IDs
      const entry = Object.entries(storage.data.guests).find(
        ([, guest]) => guest.displayName.toLowerCase() === target.toLowerCase()
      );

      if (!entry) {
        const message = config.resetMessageNotFound.replace('{target}', target);
        void sendChatMessage(message);
        return;
      }

      const [userId] = entry;
      resetUser(userId);

      Tixyel.logger.success(
        `[Guestbook] Reset entry for ${target} (mod action)`
      );

      if (config.resetMessageOther) {
        const message = config.resetMessageOther.replace('{target}', target);
        void sendChatMessage(message);
      }
      return;
    }

    // Regular viewers can only reset themselves if the streamer allows it
    if (!config.enableSelfReset) return;

    const { userId, displayName } = getUser(event);
    resetUser(userId);

    Tixyel.logger.success(`[Guestbook] Reset entry for ${displayName} (self)`);

    if (config.resetMessageSelf) {
      const message = config.resetMessageSelf.replace('{name}', displayName);
      void sendChatMessage(message);
    }
  }

  void new Tixyel.actions.Command({
    prefix: COMMAND_PREFIX,
    name: config.resetCommandName,
    description: 'Reset a Guestbook entry',
    arguments: false,
    run: (arguments_, event) => onCommand(arguments_, event),
  });

  void new Tixyel.actions.Button({
    field: 'btnClearAll',
    name: 'Clear all guestbook data',
    run() {
      storage.update({ guests: {}, visits: {} });
      signedThisStream.clear();
      Tixyel.logger.success('[Guestbook] All data cleared');
    },
  });
}
