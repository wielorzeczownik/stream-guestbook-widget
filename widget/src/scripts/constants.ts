// cover feels heavier so it flips slower than content pages
export const COVER_SPEED_MULTIPLIER = 1.5;
export const PAGE_SPEED_MULTIPLIER = 0.4;
export const PAGE_STAGGER_MULTIPLIER = 0.2;

// slight delay so the fade-in settles before pages start moving
export const ANIM_START_DELAY = 0.6;
export const PRE_STAMP_PAUSE = 0.3;
export const POST_STAMP_PAUSE = 0.3;
export const POST_OPEN_PAUSE = 0.6;
export const POST_HIDE_CLEANUP_DELAY = 0.5;

// flip speed - the dropdown value maps to a numeric multiplier applied to
// all the timing constants above. Higher = slower animation
export const FLIP_SPEED_MAP: Record<string, number> = {
  slow: 2,
  normal: 1,
  fast: 0.5,
};

// widget identity - shared between the Tixyel client and the storage module
// so both use the same namespace without duplicating the string
export const WIDGET_ID = 'guestbook';

export const COMMAND_PREFIX = '!';

// streak resets if they missed more than this many days between streams
export const STREAK_RESET_DAYS = 7;

// field defaults
export const DEFAULT_DISPLAY_DURATION_S = 5;
export const DEFAULT_STAMPS_PER_PAGE = 6;
export const DEFAULT_TOP_COUNT = 5;
export const DEFAULT_COVER_COLOR = '#1b1920';
export const DEFAULT_PAGE_COLOR = '#ffffff';
export const DEFAULT_STAMP_COLOR = '#1b1920';
export const DEFAULT_SIGN_COMMAND = 'sign';
export const DEFAULT_SIGN_REWARD = 'Sign Guestbook';
export const DEFAULT_RESET_COMMAND = 'reset';
export const DEFAULT_VISITS_COMMAND = 'visits';
export const DEFAULT_TOP_COMMAND = 'top';

export const SE_BOT_API = 'https://api.streamelements.com/kappa/v2/bot';
