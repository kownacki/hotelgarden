import {LitElement, html, css} from 'lit';
import '../content/hg-article/hg-intro-article.js';
import '../content/hg-content-icons.js';
import HgContent from '../elements/hg-content.js';
import '../content/hg-links.js';
import sharedStyles from '../styles/shared-styles.js'
import './hg-rooms/hg-room.js';

export class HgRooms extends HgContent {
  static styles = [super.styles, sharedStyles];
  render() {
    return html`
      <hg-intro-article .uid=${'rooms'}></hg-intro-article>
      <hg-content-icons .uid=${'rooms'}></hg-content-icons>
      ${_.map((index) => html`
        <hg-room .index=${index}></hg-room>
      `, [1, 2, 3, 4])}
      <h2 class="content-heading">Warunki rezerwacji</h2>
      <hg-content-icons .uid=${'rooms-conditions'}></hg-content-icons>
      <hg-links .path=${'/pokoje'} .superpath=${'/'}></hg-links>
    `;
  }
}
customElements.define('hg-rooms', HgRooms);
