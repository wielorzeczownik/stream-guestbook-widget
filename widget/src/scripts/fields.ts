import type { StreamElements } from '@tixyel/streamelements';

import type { Config } from '@/types';

// flip speed - the dropdown value maps to a numeric multiplier applied to
// the animation timing constants in book.ts. Higher = slower animation
const FLIP_SPEED_MAP: Record<string, number> = {
  slow: 2,
  normal: 1,
  fast: 0.5,
};

// streak resets if they missed more than this many days between streams
const STREAK_RESET_DAYS = 7;

// field defaults
const DEFAULT_DISPLAY_DURATION_S = 5;
const DEFAULT_STAMPS_PER_PAGE = 6;
const DEFAULT_TOP_COUNT = 5;
const DEFAULT_COVER_COLOR = '#1b1920';
const DEFAULT_PAGE_COLOR = '#ffffff';
const DEFAULT_STAMP_COLOR = '#1b1920';
const DEFAULT_SIGN_COMMAND = 'sign';
const DEFAULT_SIGN_REWARD = 'Sign Guestbook';
const DEFAULT_RESET_COMMAND = 'reset';
const DEFAULT_VISITS_COMMAND = 'visits';
const DEFAULT_TOP_COMMAND = 'top';

export function parseFields(
  raw: Record<string, StreamElements.CustomField.Value>
): Config {
  const getString = (key: string, fallback = '') =>
    String(raw[key] ?? fallback);
  const isEnabled = (key: string, isEnabledByDefault: boolean) =>
    raw[key] === undefined
      ? isEnabledByDefault
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
    enableSignCommandTwitch: isEnabled('enableSignCommandTwitch', false),
    enableSignCommandOther: isEnabled('enableSignCommandOther', true),
    enableSignReward: isEnabled('enableSignReward', true),
    signRewardName: getString('signRewardName', DEFAULT_SIGN_REWARD),
    enableSignMessage: isEnabled('enableSignMessage', true),
    signMessage: getString(
      'signMessage',
      '@{name} signed the Guestbook for the {count} time!'
    ),
    enableSignAnimation: isEnabled('enableSignAnimation', true),
    enableResetCommand: isEnabled('enableResetCommand', false),
    enableSelfReset: isEnabled('enableSelfReset', false),
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
    enableVisitsCommand: isEnabled('enableVisitsCommand', true),
    enableVisitsAnimation: isEnabled('enableVisitsAnimation', true),
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
    enableTopCommand: isEnabled('enableTopCommand', true),
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
