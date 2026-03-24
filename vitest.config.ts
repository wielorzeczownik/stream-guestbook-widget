import path from 'node:path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'widget/src/scripts'),
      '@tests': path.resolve(__dirname, 'tests'),
    },
  },
  test: {
    environment: 'node',
  },
});
