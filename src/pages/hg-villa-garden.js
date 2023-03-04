import {LitElement, html} from 'lit';
import '../content/hg-article/hg-intro-article.js';
import '../content/hg-links.js';
import '../elements/hg-content.js';
import {staticProp} from '../utils.js';
import sharedStyles from '../styles/shared-styles.js';
import './hg-rooms/hg-room.js';

const VILLA_ROOM_INDEX = 3;

export class HgVillaGarden extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = sharedStyles;
  render() {
    return html`
      <hg-intro-article .uid=${'villa-garden'} .isInitialPage=${this.isInitialPage}></hg-intro-article>
      <hg-content>
        <hg-room 
          .index=${VILLA_ROOM_INDEX} 
          .extraButtons=${staticProp([{url: '/pokoje', text: 'Zobacz pozostałe pokoje'}])}>
        </hg-room>
        <hg-links .path=${'/villa-garden'} .superpath=${'/'}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-villa-garden', HgVillaGarden);
