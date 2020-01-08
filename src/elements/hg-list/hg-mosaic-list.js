import HgList from '../hg-list.js';
import {css} from 'lit-element';

customElements.define('hg-mosaic-list', class extends HgList {
  static get styles() {
    return css`
      :host {
        position: relative;
        padding-bottom: calc(100% * (3 / 16));
        display: flex;
        flex-wrap: wrap;
      }
      :host > * {
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
    `;
  }
  calculateItemTop(index) {
    return Math.floor(index/5) * 2 + (_.includes(index%10, [2, 3, 8, 9]) ? 1 : 0);
  }
  calculateHeightRemainder(remainder) {
    return remainder === 0 ? 0 : remainder < 3 ? 1 : remainder < 6 ? 2 : 4;
  }
  calculateHeight(tilesCount) {
    return Math.floor(tilesCount/10) * 4 + this.calculateHeightRemainder(tilesCount%10);
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('_list')) {
      this.style = `margin-bottom: ${(this.calculateHeight(this._list.length + 1) - 1) * 3/16 * 100}%`;
    }
  }
  constructor() {
    super();
    this.array = true;
    this.addAtStart = true;
    this.transform = () => _.reverse;
  }
});

