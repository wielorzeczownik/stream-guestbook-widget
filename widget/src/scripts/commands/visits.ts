import Tixyel from '@tixyel/streamelements';

import { queueVisit } from '@/book';
import { COMMAND_PREFIX } from '@/constants';
import { getUser, isModeratorOrBroadcaster, sendChatMessage } from '@/helpers';
import { storage } from '@/storage';
import type { CommandEvent, Config } from '@/types';

export function initVisits(config: Config): void {
  function onCommand(arguments_: string[], event: CommandEvent): void {
    if (!config.enableVisitsCommand) return;

    const target = arguments_[0]?.replace(/^@/, '');
    if (target && isModeratorOrBroadcaster(event)) {
      const guestEntry = Object.values(storage.data.guests).find(
        (entry) => entry.displayName.toLowerCase() === target.toLowerCase()
      );
      const count = guestEntry?.count ?? 0;
      const template =
        count === 0
          ? config.visitsMessageNotFoundOther
          : config.visitsMessageFoundOther;
      const message = template
        .replace('{target}', target)
        .replace('{count}', String(count));
      if (count > 0 && config.enableVisitsAnimation) {
        queueVisit(count, () => {
          void sendChatMessage(message);
        });
      } else {
        void sendChatMessage(message);
      }
      return;
    }

    const { userId, displayName: name } = getUser(event);
    const entry = storage.data.guests[userId];
    const count = entry?.count ?? 0;
    const template =
      count === 0 ? config.visitsMessageNotFound : config.visitsMessageFound;
    const message = template
      .replace('{name}', name)
      .replace('{count}', String(count));
    if (count > 0 && config.enableVisitsAnimation) {
      queueVisit(count, () => {
        void sendChatMessage(message);
      });
    } else {
      void sendChatMessage(message);
    }
  }

  void new Tixyel.actions.Command({
    prefix: COMMAND_PREFIX,
    name: config.visitsCommandName,
    description: 'Check how many times you signed the Guestbook',
    arguments: false,
    run: (arguments_, event) => onCommand(arguments_, event),
  });

  void new Tixyel.actions.Button({
    field: 'btnTestVisitsAnimation',
    name: 'Test visits animation',
    run() {
      const count = Object.keys(storage.data.guests).length || 1;
      queueVisit(count);
      Tixyel.logger.success('[Guestbook] Test visits animation triggered');
    },
  });
}
