import type { StreamElements } from '@tixyel/streamelements';

import {
  DEFAULT_COVER_COLOR,
  DEFAULT_DISPLAY_DURATION_S,
  DEFAULT_PAGE_COLOR,
  DEFAULT_RESET_COMMAND,
  DEFAULT_SIGN_COMMAND,
  DEFAULT_SIGN_REWARD,
  DEFAULT_STAMP_COLOR,
  DEFAULT_STAMPS_PER_PAGE,
  DEFAULT_TOP_COMMAND,
  DEFAULT_TOP_COUNT,
  DEFAULT_VISITS_COMMAND,
  FLIP_SPEED_MAP,
  STREAK_RESET_DAYS,
} from '@/constants';
import type { Config } from '@/types';

export function parseFields(
  raw: Record<string, StreamElements.CustomField.Value>
): Config {
  const getString = (key: string, fallback = '') =>
    String(raw[key] ?? fallback);
  const getBoolean = (key: string, fallback: boolean) =>
    raw[key] === undefined
      ? fallback
      : raw[key] !== false && raw[key] !== 'false';
  const getNumber = (key: string, fallback: number) => {
    const parsedNumber = Number(raw[key]);
    return Number.isNaN(parsedNumber) ? fallback : parsedNumber;
  };

  return {
    jwtToken: getString('jwtToken'),
    // Convert seconds to milliseconds
    displayDuration:
      Math.max(1, getNumber('displayDuration', DEFAULT_DISPLAY_DURATION_S)) *
      1000,
    flipSpeed: FLIP_SPEED_MAP[getString('flipSpeed', 'normal')] ?? 1,
    signCommandName: getString('signCommandName', DEFAULT_SIGN_COMMAND),
    enableSignCommandTwitch: getBoolean('enableSignCommandTwitch', false),
    enableSignCommandOther: getBoolean('enableSignCommandOther', true),
    enableSignReward: getBoolean('enableSignReward', true),
    signRewardName: getString('signRewardName', DEFAULT_SIGN_REWARD),
    enableSignMessage: getBoolean('enableSignMessage', true),
    signMessage: getString(
      'signMessage',
      '@{name} signed the Guestbook for the {count} time!'
    ),
    enableSignAnimation: getBoolean('enableSignAnimation', true),
    enableResetCommand: getBoolean('enableResetCommand', false),
    enableSelfReset: getBoolean('enableSelfReset', false),
    resetCommandName: getString('resetCommandName', DEFAULT_RESET_COMMAND),
    resetMessageSelf: getString(
      'resetMessageSelf',
      '@{name}, your Guestbook entry has been reset!'
    ),
    resetMessageOther: getString(
      'resetMessageOther',
      "@{target}'s Guestbook entry has been reset!"
    ),
    resetMessageNotFound: getString(
      'resetMessageNotFound',
      "@{target} hasn't signed the Guestbook yet!"
    ),
    enableVisitsCommand: getBoolean('enableVisitsCommand', true),
    enableVisitsAnimation: getBoolean('enableVisitsAnimation', true),
    visitsCommandName: getString('visitsCommandName', DEFAULT_VISITS_COMMAND),
    visitsMessageFound: getString(
      'visitsMessageFound',
      "@{name}, you've signed the Guestbook {count} time(s)!"
    ),
    visitsMessageNotFound: getString(
      'visitsMessageNotFound',
      "@{name}, you haven't signed the Guestbook yet!"
    ),
    visitsMessageFoundOther: getString(
      'visitsMessageFoundOther',
      '@{target} has signed the Guestbook {count} time(s)!'
    ),
    visitsMessageNotFoundOther: getString(
      'visitsMessageNotFoundOther',
      "@{target} hasn't signed the Guestbook yet!"
    ),
    enableTopCommand: getBoolean('enableTopCommand', true),
    topCommandName: getString('topCommandName', DEFAULT_TOP_COMMAND),
    topCount: Math.max(1, getNumber('topCount', DEFAULT_TOP_COUNT)),
    topMessage: getString('topMessage', 'Top visitors: {list}'),
    topMessageEmpty: getString(
      'topMessageEmpty',
      'Nobody has signed the Guestbook yet!'
    ),
    streakResetDays: Math.max(
      1,
      getNumber('streakResetDays', STREAK_RESET_DAYS)
    ),
    stampsPerPage: Math.max(
      1,
      getNumber('stampsPerPage', DEFAULT_STAMPS_PER_PAGE)
    ),
    coverColor: getString('coverColor', DEFAULT_COVER_COLOR),
    coverTextureFront: getString('coverTextureFront'),
    coverTextureBack: getString('coverTextureBack'),
    pageColor: getString('pageColor', DEFAULT_PAGE_COLOR),
    pageTexture: getString('pageTexture'),
    stampColor: getString('stampColor', DEFAULT_STAMP_COLOR),
    stampTexture: getString('stampTexture'),
  };
}
