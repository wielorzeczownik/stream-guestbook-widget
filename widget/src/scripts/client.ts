import Tixyel from '@tixyel/streamelements';

import { WIDGET_ID } from '@/constants';

const client = new Tixyel.Client({
  id: WIDGET_ID,
  debug: import.meta.env.DEV,
});

export default client;
