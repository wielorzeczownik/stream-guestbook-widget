import Tixyel from '@tixyel/streamelements';

import { WIDGET_ID } from '@/constants';
import type { GuestbookData } from '@/types';

export const storage = new Tixyel.modules.useStorage<GuestbookData>({
  id: WIDGET_ID,
  data: { guests: {}, visits: {} },
});

// Tracks who already signed during the current stream session (resets on widget reload)
export const signedThisStream = new Set<string>();
