import Tixyel from '@tixyel/streamelements';

import { init as initBook } from '@/book';
import client from '@/client';
import { initReset } from '@/commands/reset';
import { initSign } from '@/commands/sign';
import { initTop } from '@/commands/top';
import { initVisits } from '@/commands/visits';
import { parseFields } from '@/fields';

if (import.meta.env.DEV) {
  void Tixyel.Local.start();
}

client.on('load', () => {
  const config = parseFields(client.fields);
  initBook(config);
  initSign(config);
  initReset(config);
  initVisits(config);
  initTop(config);

  if (import.meta.env.DEV) {
    void import('@/development-panel').then(({ initDevelopmentPanel }) =>
      initDevelopmentPanel(config)
    );
  }
});
