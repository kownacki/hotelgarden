import {LitElement, html} from 'lit';
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
    return html`
      <hg-content>
        <hg-quote .uid=${'chrzciny'}></hg-quote>
        <hg-content-icons .uid=${'chrzciny'}></hg-content-icons>
        <hg-content-slider .uid=${'chrzciny'}></hg-content-slider>
        <hg-mosaic .uid=${'chrzciny'}></hg-mosaic>
        <hg-halls-block .uid=${'chrzciny'} .type=${'banquet'}></hg-halls-block>
        <hg-reviews-block uid=${'chrzciny'}></hg-reviews-block>
        <hg-contact-block></hg-contact-block>
        <hg-links .path=${'/chrzciny'} .superpath=${'/wesela'} .includeSuperpath=${true}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-chrzciny', HgChrzciny);
