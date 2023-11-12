import {LitElement, html} from 'lit';
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
    const villaGardenPageUid = 'villa-garden';

    return html`
      <hg-content>
        <hg-room
          .index=${VILLA_ROOM_INDEX} 
          .extraButtons=${staticProp([{url: '/pokoje', text: 'Zobacz pozostałe pokoje'}])}>
        </hg-room>
        <hg-links .pageUid=${villaGardenPageUid} .excludedPages=${staticProp(['careers'])}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-villa-garden', HgVillaGarden);
