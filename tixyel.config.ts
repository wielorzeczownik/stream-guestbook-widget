import { defineConfig } from '@tixyel/cli/api';

export default defineConfig({
  search: {
    maxDepth: 3,
    ignore: ['node_modules', 'dist', 'build', '.git'],
  },
  metadata: {
    name: 'guestbook',
    author: 'wielorzeczownik',
    description:
      'A stream overlay widget where viewers sign the guestbook via chat command or Channel Points redemption. Works with Twitch, YouTube, and Kick via StreamElements.',
    tags: [
      'guestbook',
      'chat',
      'twitch',
      'youtube',
      'kick',
      'streamelements',
      'stream-overlay',
      'widget',
      'obs',
      'obs-widget',
      'channel-points',
    ],
  },
  dirs: {
    entry: 'compiled',
    output: 'dist',
    extension: 'export',
  },
  scaffold: {
    single: [
      {
        name: 'src',
        type: 'folder',
        content: [
          {
            name: 'scripts',
            type: 'folder',
            content: [
              {
                name: 'index.ts',
                type: 'file',
                content: ``,
              },
            ],
          },
          {
            name: 'styles',
            type: 'folder',
            content: [
              {
                name: 'index.scss',
                type: 'file',
                content: ``,
              },
            ],
          },
          {
            name: 'index.html',
            type: 'file',
            content: ``,
          },
          {
            name: 'fields.json',
            type: 'file',
            content: '{}',
          },
          {
            name: 'data.json',
            type: 'file',
            content: '{}',
          },
        ],
      },
      {
        name: 'compiled',
        type: 'folder',
      },
      {
        name: 'dist',
        type: 'folder',
      },
      {
        name: 'export',
        type: 'folder',
      },
    ],
  },
  build: {
    parallel: true,
    verbose: false,
    find: {
      html: ['index.html'],
      script: ['script.ts', 'script.js'],
      css: ['style.css'],
      fields: ['fields.json', 'fields.jsonc'],
    },
    result: {
      'HTML.html': 'html',
      'SCRIPT.js': 'script',
      'CSS.css': 'css',
      'FIELDS.json': 'fields',
    },
    widgetIO: {
      'html.txt': 'html',
      'js.txt': 'script',
      'css.txt': 'css',
      'fields.txt': 'fields',
    },
    htmlRegex: /<div id="widget">([\s\S]*?)<\/div>\s*<div id="dev-panel"/i,
    obfuscation: {
      javascript: {
        compact: true,
        log: false,
        debugProtection: false,
        selfDefending: false,
        deadCodeInjection: false,
        controlFlowFlattening: false,
        stringArray: false,
        simplify: true,
        identifierNamesGenerator: 'mangled',
      },
      css: {
        removeNesting: true,
        autoprefixer: {
          flexbox: true,
          overrideBrowserslist: ['Chrome 127'],
        },
        cssnano: {
          preset: 'default',
        },
      },
      html: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: true,
      },
    },
  },
});
