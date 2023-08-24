import {LitElement, html} from 'lit';
import '../content/hg-content-icons.js';
import '../content/hg-links.js';
import '../elements/hg-content.js';
import sharedStyles from '../styles/shared-styles.js';
import {staticProp} from '../utils.js';
import './hg-rooms/hg-room.js';

export class HgRooms extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = sharedStyles;
  render() {
    const roomsPageUid = 'rooms';

    return html`
      <hg-content>
        <hg-content-icons .uid=${roomsPageUid}></hg-content-icons>
        ${_.map((index) => html`
          <hg-room .index=${index}></hg-room>
        `, [1, 2, 3, 4])}
        <h2 class="content-heading">Warunki rezerwacji</h2>
        <hg-content-icons .uid=${'rooms-conditions'}></hg-content-icons>
        <hg-links .pageUid=${roomsPageUid} .excludedPages=${staticProp(['careers'])}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-rooms', HgRooms);
