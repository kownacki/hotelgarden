import {LitElement, html} from 'lit';
import '../content/hg-article/hg-intro-article.js';
import '../content/hg-content-icons.js';
import '../content/hg-links.js';
import '../elements/hg-content.js';
import sharedStyles from '../styles/shared-styles.js';
import './hg-rooms/hg-room.js';

export class HgRooms extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = sharedStyles;
  render() {
    return html`
      <hg-intro-article .uid=${'rooms'} .isInitialPage=${this.isInitialPage}></hg-intro-article>
      <hg-content>
        <hg-content-icons .uid=${'rooms'}></hg-content-icons>
        ${_.map((index) => html`
          <hg-room .index=${index}></hg-room>
        `, [1, 2, 3, 4])}
        <h2 class="content-heading">Warunki rezerwacji</h2>
        <hg-content-icons .uid=${'rooms-conditions'}></hg-content-icons>
        <hg-links .path=${'/pokoje'} .superpath=${'/'}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-rooms', HgRooms);
