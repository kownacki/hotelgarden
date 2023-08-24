import {LitElement, html} from 'lit';
import '../content/hg-contact-block.js';
import '../content/hg-content-icons.js';
import '../content/hg-content-slider.js';
import '../content/hg-halls-block.js';
import '../content/hg-links.js';
import '../content/hg-mosaic.js';
import '../content/hg-quote.js';
import '../content/hg-reviews-block.js';
import '../content/hg-text-image.js';
import '../elements/hg-content.js';
import sharedStyles from '../styles/shared-styles.js';
import {staticProp} from '../utils.js';

export class HgWeddings extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = sharedStyles;
  render() {
    const weddingsPageUid = 'weddings';

    return html`
      <hg-content>
        <hg-quote .uid=${weddingsPageUid}></hg-quote>
        <hg-content-icons .uid=${weddingsPageUid}></hg-content-icons>
        <hg-content-slider .uid=${weddingsPageUid}></hg-content-slider>
        <hg-mosaic .uid=${weddingsPageUid} .buttons=${staticProp({
          primary: [{url: '#kontakt', text: 'Skontaktuj się z nami'}],
        })}></hg-mosaic>
        <hg-text-image swap .uid=${weddingsPageUid}></hg-text-image>
        <hg-halls-block .uid=${weddingsPageUid} .type=${'banquet'}></hg-halls-block>
        <hg-reviews-block uid=${weddingsPageUid}></hg-reviews-block>
        <hg-content-slider .uid=${'weddings-2'}></hg-content-slider>
        <hg-contact-block id="kontakt"></hg-contact-block>
        <hg-links .pageUid=${weddingsPageUid}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-weddings', HgWeddings);
