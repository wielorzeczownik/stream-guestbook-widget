import type { Command } from '@tixyel/streamelements';

export type Config = {
  jwtToken: string;
  displayDuration: number;
  flipSpeed: number;
  signCommandName: string;
  enableSignCommandTwitch: boolean;
  enableSignCommandOther: boolean;
  enableSignReward: boolean;
  enableSignAnimation: boolean;
  signRewardName: string;
  enableSignMessage: boolean;
  signMessage: string;
  enableResetCommand: boolean;
  enableSelfReset: boolean;
  resetCommandName: string;
  resetMessageSelf: string;
  resetMessageOther: string;
  resetMessageNotFound: string;
  enableVisitsCommand: boolean;
  enableVisitsAnimation: boolean;
  visitsCommandName: string;
  visitsMessageFound: string;
  visitsMessageNotFound: string;
  visitsMessageFoundOther: string;
  visitsMessageNotFoundOther: string;
  enableTopCommand: boolean;
  topCommandName: string;
  topCount: number;
  topMessage: string;
  topMessageEmpty: string;
  streakResetDays: number;
  stampsPerPage: number;
  coverColor: string;
  coverTextureFront: string;
  coverTextureBack: string;
  pageColor: string;
  pageTexture: string;
  stampColor: string;
  stampTexture: string;
};

export type GuestEntry = {
  displayName: string;
  count: number; // total signs across all streams
  platform?: string; // e.g. "twitch", "youtube"
  firstSeen?: number; // unix ms - when they first signed
  lastSeen?: number; // unix ms - most recent signing
  streak?: number; // consecutive stream sessions signed in a row
};

export type VisitEntry = {
  timestamp: number; // unix ms
  platform: string;
  via: 'command' | 'reward';
};

export type GuestbookData = {
  guests: Record<string, GuestEntry>; // key - userId
  visits: Record<string, VisitEntry[]>; // key - userId, chronological list
};

export type EventData = {
  userId: string;
  nick: string;
  displayName: string;
  badges: Array<{ type: string; version: string }>;
  authorDetails?: { isChatOwner: boolean; isChatModerator: boolean };
};

// Shorthand for the second argument passed to a Command's `run` callback
export type CommandEvent = Parameters<
  ConstructorParameters<typeof Command>[0]['run']
>[1];

export type BookQueueItem = {
  count: number;
  visit?: boolean;
  onDone?: () => void;
};
