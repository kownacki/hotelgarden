import {css} from 'lit';
import HgListOld from '../hg-list-old.js';

export class HgMosaicListOld extends HgListOld {
  static styles = [super.styles, css`
    :host {
      display: flex;
      flex-wrap: wrap;
    }
    @media all and (min-width: 840px) {
      :host {
        position: relative;
        padding-bottom: calc(100% * (3 / 16));
      }
      /* Prevent bugs. Iphone adds style tag as host's last child. */
      :host > :not(style) {
        position: absolute;
        width: calc(100% * (5 / 16));
        max-width: 100%;
        height: 100%;
      }
      :host > :nth-child(10n + 1), :host > :nth-child(10n + 3), :host > :nth-child(10n + 6) {
        left: 0;
      }
      :host > :nth-child(10n + 5), :host > :nth-child(10n + 8), :host > :nth-child(10n + 10) {
        right: 0;
      }
      :host > :nth-child(10n + 2), :host > :nth-child(10n + 4) {
        left: calc(100% * (5 / 16));
      }
      :host > :nth-child(10n + 7), :host > :nth-child(10n + 9) {
        right: calc(100% * (5 / 16));
      }
      :host > :nth-child(10n + 5), :host > :nth-child(10n + 6) {
        width: calc(100% * (6 / 16));
        height: 200%;
      }
    }
    @media all and (max-width: 839px) {
      /* Prevent bugs. Iphone adds style tag as host's last child. */
      :host > :not(style) {
        width: 50%;
        height: 300px;
      }
    }
    @media all and (max-width: 719px) {
      /* Prevent bugs. Iphone adds style tag as host's last child. */
      :host > :not(style) {
        height: 250px;
      }
    }
    @media all and (max-width: 599px) {
      /* Prevent bugs. Iphone adds style tag as host's last child. */
      :host > :not(style) {
        height: 200px;
      }
    }
    @media all and (max-width: 479px) {
      /* Prevent bugs. Iphone adds style tag as host's last child. */
      :host > :not(style) {
        height: 150px;
      }
    }
  `];
  calculateItemTop(index) {
    return Math.floor(index/5) * 2 + (_.includes(index%10, [2, 3, 8, 9]) ? 1 : 0);
  }
  calculateHeightRemainder(remainder) {
    return remainder === 0 ? 0 : remainder < 3 ? 1 : remainder < 6 ? 2 : 4;
  }
  calculateHeight(tilesCount) {
    return Math.floor(tilesCount/10) * 4 + this.calculateHeightRemainder(tilesCount%10);
  }
  setMargin() {
    const tilesCount = this._list.length + ((this._loggedIn && !this.noAdd) ? 1 : 0);
    this.style = `margin-bottom: ${(this.calculateHeight(tilesCount) - 1) * 3/16 * 100}%`;
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if ((changedProperties.has('_loggedIn') || changedProperties.has('noAdd') || changedProperties.has('_list')) && window.innerWidth > 839) {
      this.setMargin();
    }
  }
  constructor() {
    super();
    this.array = true;
    this.addAtStart = true;
    this.transform = () => _.reverse;
    window.addEventListener('resize', _.throttle(100, () => {
      if (this._list && window.innerWidth > 839) {
        this.setMargin();
      } else {
        this.style = null;
      }
    }));
  }
}
customElements.define('hg-mosaic-list-old', HgMosaicListOld);
