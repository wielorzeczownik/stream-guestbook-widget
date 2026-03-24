import Tixyel from '@tixyel/streamelements';
import {
  animate,
  type AnimationPlaybackControls,
  type AnimationSequence,
  stagger,
} from 'motion';

import {
  ANIM_START_DELAY,
  COVER_SPEED_MULTIPLIER,
  PAGE_SPEED_MULTIPLIER,
  PAGE_STAGGER_MULTIPLIER,
  POST_HIDE_CLEANUP_DELAY,
  POST_OPEN_PAUSE,
  POST_STAMP_PAUSE,
  PRE_STAMP_PAUSE,
} from '@/constants';
import type { BookQueueItem, Config } from '@/types';

class Book {
  private readonly wrapper: HTMLDivElement | null;
  private readonly el: HTMLUListElement | null;
  private readonly queue: InstanceType<
    typeof Tixyel.modules.useQueue<BookQueueItem>
  >;
  private activeSequence: AnimationPlaybackControls | undefined = undefined;

  constructor(private readonly config: Config) {
    this.config = config;
    this.wrapper = document.getElementById('wrapper') as HTMLDivElement | null;
    this.el = document.getElementById('book') as HTMLUListElement | null;
    this.queue = new Tixyel.modules.useQueue<BookQueueItem>({
      processor: async ({ count, visit, onDone }) => {
        await (visit ? this.showVisit(count) : this.showSign(count));
        onDone?.();
      },
    });
    this.applyStyles();
  }

  private applyStyles(): void {
    const { config } = this;
    const root = document.documentElement;
    root.style.setProperty('--cover-color', config.coverColor);
    root.style.setProperty(
      '--cover-texture-front',
      config.coverTextureFront ? `url(${config.coverTextureFront})` : 'none'
    );
    root.style.setProperty(
      '--cover-texture-back',
      config.coverTextureBack ? `url(${config.coverTextureBack})` : 'none'
    );
    root.style.setProperty('--page-color', config.pageColor);
    root.style.setProperty(
      '--page-texture',
      config.pageTexture ? `url(${config.pageTexture})` : 'none'
    );
    root.style.setProperty(
      '--stamp-texture',
      config.stampTexture ? `url(${config.stampTexture})` : 'none'
    );
    // texture handles the color already, border would just double up
    root.style.setProperty(
      '--stamp-color',
      config.stampTexture ? 'transparent' : config.stampColor
    );
  }

  private cancelPending(): void {
    this.activeSequence?.stop();
    this.activeSequence = undefined;
  }

  private getPage(item: HTMLDivElement | HTMLLIElement): HTMLDivElement | null {
    return item.querySelector<HTMLDivElement>('.book__page');
  }

  private reset(): void {
    for (const pageItem of this.el?.querySelectorAll<HTMLLIElement>(
      '.book__list-item:not(:first-child):not(:last-child)'
    ) ?? [])
      pageItem.remove();

    for (const selector of [
      '.book__list-item:first-child',
      '.book__list-item:last-child',
    ]) {
      const cover = this.el?.querySelector<HTMLDivElement>(selector);
      if (!cover) continue;
      const page = this.getPage(cover);
      if (!page) continue;
      cover.classList.remove('is-flipped');
      page.style.removeProperty('--page-rotate');
    }
  }

  private getItems(): HTMLLIElement[] {
    return [
      ...(this.el?.querySelectorAll<HTMLLIElement>(
        ':scope > .book__list-item'
      ) ?? []),
    ];
  }

  // higher index = closer to front cover
  private setZIndices(): void {
    const items = this.getItems();
    for (const [index, item] of items.entries()) {
      item.style.zIndex = String(items.length - index);
    }
  }

  private createContentPage(): HTMLLIElement {
    const template = document.getElementById(
      'page-template'
    ) as HTMLTemplateElement;
    return (template.content.cloneNode(true) as DocumentFragment)
      .firstElementChild as HTMLLIElement;
  }

  private getGridLayout(stampsPerPage: number): {
    columnCount: number;
    rowCount: number;
  } {
    let columnCount = 1;
    for (let divisor = 2; divisor <= Math.sqrt(stampsPerPage); divisor++) {
      if (stampsPerPage % divisor === 0) columnCount = divisor;
    }
    return { columnCount, rowCount: stampsPerPage / columnCount };
  }

  private getStampClass(
    stampIndex: number,
    count: number,
    markNew: boolean
  ): string {
    if (stampIndex >= count) return 'book__stamp book__stamp--empty';
    return markNew && stampIndex === count - 1
      ? 'book__stamp book__stamp--new'
      : 'book__stamp book__stamp--filled';
  }

  // markNew highlights the last stamp slot for the stamp-drop animation
  private buildPages(count: number, markNew = true): void {
    const { stampsPerPage } = this.config;

    for (const pageItem of this.el?.querySelectorAll<HTMLElement>(
      '.book__list-item:not(:first-child):not(:last-child)'
    ) ?? [])
      pageItem.remove();

    const backCover = this.el?.querySelector<HTMLElement>(
      '.book__list-item:last-child'
    );

    // each leaf = front + back face
    const STAMPS_PER_LEAF = 2 * stampsPerPage;
    const totalLeaves = Math.max(1, Math.ceil(count / STAMPS_PER_LEAF));

    // largest divisor <= sqrt gives the most square grid layout
    const { columnCount, rowCount } = this.getGridLayout(stampsPerPage);

    for (let leafIndex = 0; leafIndex < totalLeaves; leafIndex++) {
      const pageElement = this.createContentPage();
      const faces: [HTMLElement, number][] = [
        [
          pageElement.querySelector<HTMLElement>(
            '.book__page-face--front .book__stamps'
          )!,
          0,
        ],
        [
          pageElement.querySelector<HTMLElement>(
            '.book__page-face--back .book__stamps'
          )!,
          stampsPerPage,
        ],
      ];

      for (const [grid, faceOffset] of faces) {
        grid.style.setProperty('--cols', String(columnCount));
        grid.style.setProperty('--rows', String(rowCount));

        for (let stampSlot = 0; stampSlot < stampsPerPage; stampSlot++) {
          const stampIndex =
            leafIndex * STAMPS_PER_LEAF + faceOffset + stampSlot;
          const stamp = document.createElement('div');
          stamp.className = this.getStampClass(stampIndex, count, markNew);
          grid.append(stamp);
        }
      }

      if (backCover) {
        this.el?.insertBefore(pageElement, backCover);
      } else {
        this.el?.append(pageElement);
      }
    }

    this.setZIndices();
  }

  private prepareFlip(item: HTMLElement, items: HTMLElement[]): void {
    item.classList.add('is-flipped');
    // `items.length + indexOf` guarantees this page sits above the entire
    // unflipped stack regardless of how many pages are left
    item.style.zIndex = String(items.length + items.indexOf(item) + 1);
  }

  private pageEls(items: HTMLLIElement[]): HTMLDivElement[] {
    return items
      .map((item) => this.getPage(item))
      .filter((page): page is HTMLDivElement => page !== null);
  }

  private showSign(count: number): Promise<void> {
    const { flipSpeed, stampsPerPage, displayDuration } = this.config;
    return new Promise((resolve) => {
      this.cancelPending();
      this.reset();
      this.buildPages(count);

      const items = this.getItems();
      const frontCover = items[0];
      const contentPages = items.slice(1, -1);
      const backCover = items[items.length - 1];

      const COVER_S = COVER_SPEED_MULTIPLIER * flipSpeed; // cover flips slower
      const QUICK_S = PAGE_SPEED_MULTIPLIER * flipSpeed; // content pages flip fast
      const STAGGER_S = PAGE_STAGGER_MULTIPLIER * flipSpeed;

      this.wrapper?.classList.add('is-visible');

      const STAMPS_PER_LEAF = 2 * stampsPerPage;
      // if the new stamp is on the back face, flip all pages; otherwise the last leaf stays half-open
      const newStampOnBack = (count - 1) % STAMPS_PER_LEAF >= stampsPerPage;
      const pagesToFlip = newStampOnBack
        ? contentPages
        : contentPages.slice(0, -1);
      // Pages that weren't flipped open still need to be flipped during close
      const remainingPages = contentPages.slice(pagesToFlip.length);

      const seq: AnimationSequence = [];

      const frontCoverPage = this.getPage(frontCover);
      seq.push([
        () => {
          this.prepareFlip(frontCover, items);
        },
        { at: ANIM_START_DELAY },
      ]);
      if (frontCoverPage) {
        seq.push([
          frontCoverPage,
          { '--page-rotate': ['180deg', '0deg'] },
          { at: ANIM_START_DELAY, duration: COVER_S, ease: 'easeOut' },
        ]);
      }

      // Flip content pages with a small stagger so they fan out slightly
      for (const [index, pageItem] of pagesToFlip.entries()) {
        seq.push([
          () => {
            this.prepareFlip(pageItem, items);
          },
          { at: ANIM_START_DELAY + COVER_S + index * STAGGER_S },
        ]);
      }
      const openPageEls = this.pageEls(pagesToFlip);
      if (openPageEls.length > 0) {
        seq.push([
          openPageEls,
          { '--page-rotate': ['180deg', '0deg'] },
          {
            at: ANIM_START_DELAY + COVER_S,
            duration: QUICK_S,
            delay: stagger(STAGGER_S),
            ease: 'easeOut',
          },
        ]);
      }

      // wait for the last page flip before slamming the stamp
      const stampAt =
        ANIM_START_DELAY +
        COVER_S +
        pagesToFlip.length * STAGGER_S +
        (pagesToFlip.length > 0 ? QUICK_S : 0) +
        PRE_STAMP_PAUSE;

      seq.push([
        () =>
          this.el
            ?.querySelector<HTMLElement>('.book__stamp--new')
            ?.classList.add('is-stamping'),
        { at: stampAt },
      ]);

      const closeAt = stampAt + POST_STAMP_PAUSE + displayDuration / 1000;
      // pages that stayed on the right during open need to close first
      const closeItems = [...remainingPages, backCover];

      for (const [index, pageItem] of closeItems.entries()) {
        seq.push([
          () => {
            this.prepareFlip(pageItem, items);
          },
          { at: closeAt + index * STAGGER_S },
        ]);
      }
      const closePageEls = this.pageEls(closeItems);
      if (closePageEls.length > 0) {
        seq.push([
          closePageEls,
          { '--page-rotate': ['180deg', '0deg'] },
          {
            at: closeAt,
            duration: QUICK_S,
            delay: stagger(STAGGER_S),
            ease: 'easeOut',
          },
        ]);
      }

      const hideAt =
        closeAt + (remainingPages.length + 1) * STAGGER_S + QUICK_S;

      seq.push(
        [() => this.wrapper?.classList.remove('is-visible'), { at: hideAt }],
        [
          () => {
            this.reset();
            resolve();
          },
          { at: hideAt + POST_HIDE_CLEANUP_DELAY },
        ]
      );

      this.activeSequence = animate(seq);
    });
  }

  private showVisit(count: number): Promise<void> {
    const { flipSpeed } = this.config;
    return new Promise((resolve) => {
      this.cancelPending();
      this.reset();
      this.buildPages(count, false);

      const items = this.getItems();
      const frontCover = items[0];
      const contentPages = items.slice(1, -1);
      const backCover = items[items.length - 1];

      const QUICK_S = PAGE_SPEED_MULTIPLIER * flipSpeed;
      const STAGGER_S = PAGE_STAGGER_MULTIPLIER * flipSpeed;

      this.wrapper?.classList.add('is-visible');

      const seq: AnimationSequence = [];

      // Front cover first, then all remaining pages staggered together
      const frontCoverPage = this.getPage(frontCover);
      seq.push([
        () => {
          this.prepareFlip(frontCover, items);
        },
        { at: ANIM_START_DELAY },
      ]);
      if (frontCoverPage) {
        seq.push([
          frontCoverPage,
          { '--page-rotate': ['180deg', '0deg'] },
          { at: ANIM_START_DELAY, duration: QUICK_S, ease: 'easeOut' },
        ]);
      }

      const restPages = [...contentPages, backCover];
      for (const [index, pageItem] of restPages.entries()) {
        seq.push([
          () => {
            this.prepareFlip(pageItem, items);
          },
          { at: ANIM_START_DELAY + QUICK_S + index * STAGGER_S },
        ]);
      }
      const restOpenEls = this.pageEls(restPages);
      if (restOpenEls.length > 0) {
        seq.push([
          restOpenEls,
          { '--page-rotate': ['180deg', '0deg'] },
          {
            at: ANIM_START_DELAY + QUICK_S,
            duration: QUICK_S,
            delay: stagger(STAGGER_S),
            ease: 'easeOut',
          },
        ]);
      }

      // Brief pause after all pages are open, then just disappear
      const hideAt =
        ANIM_START_DELAY +
        QUICK_S +
        (contentPages.length + 1) * STAGGER_S +
        QUICK_S +
        POST_OPEN_PAUSE;

      seq.push(
        [() => this.wrapper?.classList.remove('is-visible'), { at: hideAt }],
        [
          () => {
            this.reset();
            resolve();
          },
          { at: hideAt + POST_HIDE_CLEANUP_DELAY },
        ]
      );

      this.activeSequence = animate(seq);
    });
  }

  enqueueSign(count: number, onDone?: () => void): void {
    this.queue.enqueue({ count, onDone });
  }

  enqueueVisit(count: number, onDone?: () => void): void {
    this.queue.enqueue({ count, visit: true, onDone });
  }
}

let instance: Book;

export function init(config: Config): void {
  instance = new Book(config);
}

export function queueSign(count: number, onDone?: () => void): void {
  instance.enqueueSign(count, onDone);
}

export function queueVisit(count: number, onDone?: () => void): void {
  instance.enqueueVisit(count, onDone);
}
