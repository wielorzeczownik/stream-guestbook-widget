import '@styles/dev-panel.scss';

import Tixyel from '@tixyel/streamelements';

import { queueSign, queueVisit } from '@/book';
import { COMMAND_PREFIX } from '@/constants';
import { signedThisStream, storage } from '@/storage';
import type { Config } from '@/types';

function getName(): string {
  return (
    (
      document.getElementById('dev-username') as HTMLInputElement | null
    )?.value.trim() ?? 'TestUser'
  );
}

function emulateCommand(
  platform: 'twitch' | 'youtube',
  name: string,
  message: string,
  asModule = false
): void {
  if (platform === 'twitch') {
    Tixyel.Local.emulate.twitch.message({
      name,
      userId: name.toLowerCase(),
      message,
      // "broadcaster" badge satisfies the isModOrBroadcaster check in helpers.ts
      badges: asModule ? 'broadcaster' : [],
    });
  } else {
    Tixyel.Local.emulate.youtube.message({
      name,
      userId: name.toLowerCase(),
      message,
    });
  }
}

function emulateChannelPoints(name: string, rewardName: string): void {
  Tixyel.Local.emulate.send('onEventReceived', {
    provider: 'twitch',
    listener: 'event',
    event: {
      type: 'channelPointsRedemption',
      data: {
        amount: 1,
        quantity: 1,
        avatar: '',
        message: '',
        username: name.toLowerCase(),
        displayName: name,
        providerId: name.toLowerCase(),
        redemption: rewardName,
      },
    },
    // Double cast because emulate.send expects a branded event type that
    // doesn't accept a plain object literal without going through unknown first
  } as unknown as Parameters<
    typeof Tixyel.Local.emulate.send<'onEventReceived'>
  >[1]);
}

function renderGuests(): void {
  const container = document.querySelector('#dev-panel-guests');
  if (!container) return;

  const guests = Object.values(storage.data.guests).sort(
    (guestA, guestB) => guestB.count - guestA.count
  );
  container.innerHTML = '';

  if (guests.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'dev-panel__empty';
    empty.textContent = 'no guests yet';
    container.append(empty);
    return;
  }

  for (const [index, guest] of guests.entries()) {
    const row = document.createElement('div');
    row.className = 'dev-panel__guest-row';
    row.innerHTML = `<span>${index + 1}. ${guest.displayName}</span><span class="dev-panel__guest-count">×${guest.count}</span>`;
    container.append(row);
  }
}

export function initDevelopmentPanel(config: Config): void {
  const signYoutube = document.getElementById(
    'dev-sign-youtube'
  ) as HTMLButtonElement | null;
  signYoutube?.addEventListener('click', () => {
    emulateCommand(
      'youtube',
      getName(),
      `${COMMAND_PREFIX}${config.signCommandName}`
    );
    // Small delay to let storage update propagate before re-rendering the list
    setTimeout(renderGuests, 50);
  });

  const signTwitch = document.getElementById(
    'dev-sign-twitch'
  ) as HTMLButtonElement | null;
  signTwitch?.addEventListener('click', () => {
    emulateCommand(
      'twitch',
      getName(),
      `${COMMAND_PREFIX}${config.signCommandName}`
    );
    setTimeout(renderGuests, 50);
  });

  const signPoints = document.getElementById(
    'dev-sign-points'
  ) as HTMLButtonElement | null;
  signPoints?.addEventListener('click', () => {
    emulateChannelPoints(getName(), config.signRewardName);
    setTimeout(renderGuests, 50);
  });

  const visitsSelf = document.getElementById(
    'dev-visits-self'
  ) as HTMLButtonElement | null;
  visitsSelf?.addEventListener('click', () => {
    emulateCommand(
      'youtube',
      getName(),
      `${COMMAND_PREFIX}${config.visitsCommandName}`
    );
  });

  const visitsOther = document.getElementById(
    'dev-visits-other'
  ) as HTMLButtonElement | null;
  visitsOther?.addEventListener('click', () => {
    emulateCommand(
      'twitch',
      'Streamer',
      `${COMMAND_PREFIX}${config.visitsCommandName} @${getName()}`,
      true
    );
  });

  const resetOther = document.getElementById(
    'dev-reset-other'
  ) as HTMLButtonElement | null;
  resetOther?.addEventListener('click', () => {
    emulateCommand(
      'twitch',
      'Streamer',
      `${COMMAND_PREFIX}${config.resetCommandName} @${getName()}`,
      true
    );
    setTimeout(renderGuests, 50);
  });

  const topButton = document.getElementById(
    'dev-top'
  ) as HTMLButtonElement | null;
  topButton?.addEventListener('click', () => {
    emulateCommand(
      'twitch',
      'Streamer',
      `${COMMAND_PREFIX}${config.topCommandName}`,
      true
    );
  });

  const animSign = document.getElementById(
    'dev-anim-sign'
  ) as HTMLButtonElement | null;
  animSign?.addEventListener('click', () => {
    // Fallback to 1 so the animation always runs even if the guestbook is empty
    queueSign(Object.keys(storage.data.guests).length || 1);
  });

  const animVisits = document.getElementById(
    'dev-anim-visits'
  ) as HTMLButtonElement | null;
  animVisits?.addEventListener('click', () => {
    queueVisit(Object.keys(storage.data.guests).length || 1);
  });

  const resetSession = document.getElementById(
    'dev-reset-session'
  ) as HTMLButtonElement | null;
  resetSession?.addEventListener('click', () => {
    signedThisStream.clear();
  });

  const clearAll = document.getElementById(
    'dev-clear-all'
  ) as HTMLButtonElement | null;
  clearAll?.addEventListener('click', () => {
    storage.update({ guests: {}, visits: {} });
    signedThisStream.clear();
    renderGuests();
  });

  renderGuests();
}
