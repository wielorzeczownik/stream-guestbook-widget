import Tixyel from '@tixyel/streamelements';

import { COMMAND_PREFIX } from '@/constants';
import { sendChatMessage } from '@/helpers';
import { storage } from '@/storage';
import type { Config } from '@/types';

export function initTop(config: Config): void {
  function onCommand(): void {
    if (!config.enableTopCommand) return;

    const sorted = Object.values(storage.data.guests)
      .sort((guestA, guestB) => guestB.count - guestA.count)
      .slice(0, config.topCount);

    if (sorted.length === 0) {
      void sendChatMessage(config.topMessageEmpty);
      return;
    }

    const list = sorted
      .map(
        (guest, index) => `${index + 1}. ${guest.displayName} (${guest.count})`
      )
      .join(' | ');

    const message = config.topMessage.replace('{list}', list);
    void sendChatMessage(message);
  }

  void new Tixyel.actions.Command({
    prefix: COMMAND_PREFIX,
    name: config.topCommandName,
    description: 'Show top Guestbook visitors',
    arguments: false,
    run: () => onCommand(),
  });

  void new Tixyel.actions.Button({
    field: 'btnPostTop',
    name: 'Post top in chat',
    run: () => onCommand(),
  });
}
