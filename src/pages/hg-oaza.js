import {LitElement, html} from 'lit';
import '../content/hg-content-icons.js';
import '../content/hg-content-slider.js';
import '../content/hg-links.js';
import '../content/hg-mosaic.js';
import '../content/hg-text-image.js';
import '../elements/hg-content.js';
import sharedStyles from '../styles/shared-styles.js';

export class HgOaza extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = sharedStyles;
  render() {
    const oazaPageUid = 'oaza';

    return html`
      <hg-content>
        <hg-content-icons .uid=${oazaPageUid}></hg-content-icons>
        <hg-mosaic .uid=${oazaPageUid}></hg-mosaic>
        <hg-content-slider .uid=${oazaPageUid}></hg-content-slider>
        <hg-text-image .uid=${oazaPageUid}></hg-text-image>
        <hg-links .pageUid=${oazaPageUid} .isParentPageIncluded=${true}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-oaza', HgOaza);
