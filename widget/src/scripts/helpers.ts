import Tixyel from '@tixyel/streamelements';

import type { CommandEvent, EventData } from '@/types';

export function getEventData(event: CommandEvent): EventData {
  return (event.data as { event: { data: EventData } }).event.data;
}

export function isModeratorOrBroadcaster(event: CommandEvent): boolean {
  const data = getEventData(event);

  if (event.provider === 'youtube') {
    return !!(
      data.authorDetails?.isChatOwner || data.authorDetails?.isChatModerator
    );
  }

  return data.badges.some(
    (badge) => badge.type === 'broadcaster' || badge.type === 'moderator'
  );
}

export function getUser(event: CommandEvent): {
  userId: string;
  displayName: string;
} {
  const data = getEventData(event);
  return {
    // `nick` is the fallback for platforms that don't send a separate userId
    userId: data.userId ?? data.nick,
    displayName: data.displayName ?? data.nick,
  };
}

export async function sendChatMessage(message: string): Promise<void> {
  if (import.meta.env.DEV) {
    Tixyel.logger.info(message);
    return;
  }

  const api = await Tixyel.SeAPI;
  Tixyel.logger.info(api);
  api.sendMessage(message, {});
}
