import type { CommandEvent, Config } from '@/types';

export function makeEvent(
  userId: string,
  displayName: string,
  asModule = false,
  provider = 'twitch'
): CommandEvent {
  const badges = asModule ? [{ type: 'broadcaster', version: '1' }] : [];
  return {
    provider,
    data: { event: { data: { userId, nick: userId, displayName, badges } } },
  } as CommandEvent;
}

export function makeConfig(overrides: Partial<Config> = {}): Config {
  return {
    jwtToken: '',
    displayDuration: 5000,
    flipSpeed: 1,
    signCommandName: 'sign',
    enableSignCommandTwitch: true,
    enableSignCommandOther: true,
    enableSignReward: false,
    signRewardName: 'Sign Guestbook',
    enableSignMessage: true,
    signMessage: '@{name} signed for the {count} time!',
    enableSignAnimation: true,
    enableResetCommand: true,
    enableSelfReset: false,
    resetCommandName: 'reset',
    resetMessageSelf: '@{name} reset!',
    resetMessageOther: '@{target} reset!',
    resetMessageNotFound: '@{target} not found!',
    enableVisitsCommand: true,
    enableVisitsAnimation: false,
    visitsCommandName: 'visits',
    visitsMessageFound: '@{name} visited {count} times!',
    visitsMessageNotFound: '@{name} never visited!',
    visitsMessageFoundOther: '@{target} visited {count} times!',
    visitsMessageNotFoundOther: '@{target} never visited!',
    enableTopCommand: true,
    topCommandName: 'top',
    topCount: 5,
    topMessage: 'Top: {list}',
    topMessageEmpty: 'Nobody yet',
    streakResetDays: 7,
    stampsPerPage: 6,
    coverColor: '#000',
    coverTextureFront: '',
    coverTextureBack: '',
    pageColor: '#fff',
    pageTexture: '',
    stampColor: '#000',
    stampTexture: '',
    ...overrides,
  };
}
