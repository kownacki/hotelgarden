import {html} from 'lit';
import '../content/hg-article/hg-intro-article.js';
import '../content/hg-links.js';
import HgContent from '../elements/hg-content.js';
import {staticProp} from '../utils.js';
import './hg-rooms/hg-room.js';

const VILLA_ROOM_INDEX = 3;

export class HgVillaGarden extends HgContent {
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
}
customElements.define('hg-villa-garden', HgVillaGarden);
