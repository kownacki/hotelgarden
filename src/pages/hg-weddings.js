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
    return html`
      <hg-content>
        <hg-quote .uid=${'weddings'}></hg-quote>
        <hg-content-icons .uid=${'weddings'}></hg-content-icons>
        <hg-content-slider .uid=${'weddings'}></hg-content-slider>
        <hg-mosaic .uid=${'weddings'} .buttons=${staticProp({
          primary: [{url: '#kontakt', text: 'Skontaktuj się z nami'}],
        })}></hg-mosaic>
        <hg-text-image swap .uid=${'weddings'}></hg-text-image>
        <hg-halls-block .uid=${'weddings'} .type=${'banquet'}></hg-halls-block>
        <hg-reviews-block uid=${'weddings'}></hg-reviews-block>
        <hg-content-slider .uid=${'weddings-2'}></hg-content-slider>
        <hg-contact-block id="kontakt"></hg-contact-block>
        <hg-links .path=${'/wesela'} .superpath=${'/wesela'}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-weddings', HgWeddings);
