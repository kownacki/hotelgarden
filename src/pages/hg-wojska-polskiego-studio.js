import {LitElement, html} from 'lit';
import '../content/hg-content-icons.js';
import '../content/hg-links.js';
import '../content/hg-map.js';
import '../content/hg-text-image.js';
import '../elements/hg-content.js';
import {staticProp} from '../utils.js';
import sharedStyles from '../styles/shared-styles.js';
import './hg-rooms/hg-room.js';

const WOJSKA_POLSKIEGO_STUDIO_ROOM_INDEX = 5;

export class HgWojskaPolskiegoStudio extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = sharedStyles;
  render() {
    const pageUid = 'wojska-polskiego-studio';

    return html`
      <hg-content>
        <hg-content-icons .uid=${pageUid}></hg-content-icons>
        <hg-room .index=${WOJSKA_POLSKIEGO_STUDIO_ROOM_INDEX}></hg-room>
        <hg-text-image .swap=${true} .uid=${pageUid}></hg-text-image>
        <hg-links .pageUid=${pageUid} .excludedPages=${staticProp(['careers'])}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-wojska-polskiego-studio', HgWojskaPolskiegoStudio);
