import {LitElement, html, css} from 'lit-element';
import {staticProp} from '../../utils.js';
import '../../content/hg-article/hg-intro-article.js';
import '../../content/hg-links.js';
import '../rooms/hg-room.js';
import HgContent from "../../elements/hg-content";

const VILLA_ROOM_INDEX = 3;

customElements.define('hg-villa-garden', class extends HgContent {
  render() {
    return html`
      <hg-intro-article .uid=${'villa-garden'}></hg-intro-article>
      <hg-room 
        .index=${VILLA_ROOM_INDEX} 
        .extraButtons=${staticProp([{url: '/pokoje', text: 'Zobacz pozostałe pokoje'}])}>
      </hg-room>
      <hg-links .path=${'/villa-garden'} .superpath=${'/'}></hg-links>
    `;
  }
});
