import {LitElement, html} from 'lit';
import {pagesStaticData} from '../../utils/urlStructure.js';
import '../content/hg-contact-block.js';
import '../content/hg-content-icons.js';
import '../content/hg-content-slider.js';
import '../content/hg-halls-block.js';
import '../content/hg-links.js';
import '../content/hg-mosaic.js';
import '../content/hg-quote.js';
import '../content/hg-reviews-block.js';
import '../elements/hg-content.js';
import sharedStyles from '../styles/shared-styles.js';

export class HgChrzciny extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = sharedStyles;
  render() {
    const chrzcinyPageUid = 'chrzciny';

    return html`
      <hg-content>
        <hg-quote .uid=${chrzcinyPageUid}></hg-quote>
        <hg-content-icons .uid=${chrzcinyPageUid}></hg-content-icons>
        <hg-content-slider .uid=${chrzcinyPageUid}></hg-content-slider>
        <hg-mosaic .uid=${chrzcinyPageUid}></hg-mosaic>
        <hg-halls-block .uid=${chrzcinyPageUid} .type=${'banquet'}></hg-halls-block>
        <hg-reviews-block uid=${chrzcinyPageUid}></hg-reviews-block>
        <hg-contact-block></hg-contact-block>
        <hg-links .pageUid=${chrzcinyPageUid} .isParentPageIncluded=${true}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-chrzciny', HgChrzciny);
