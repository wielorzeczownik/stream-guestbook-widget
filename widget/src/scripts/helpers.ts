import Tixyel from '@tixyel/streamelements';

import client from '@/client';
import { SE_BOT_API } from '@/constants';
import type { CommandEvent, EventData } from '@/types';

let _jwtToken = '';

export function initChatMessage(jwtToken: string): void {
  _jwtToken = jwtToken;
}

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
  if (import.meta.env.DEV || _jwtToken === '') {
    Tixyel.logger.info(message);
    return;
  }

  const channelId = client.details.user.id;
  await fetch(`${SE_BOT_API}/${channelId}/say`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${_jwtToken}`,
    },
    body: JSON.stringify({ message }),
  });
}
