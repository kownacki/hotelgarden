import {html} from 'lit';
import {staticProp} from '../utils.js';
import HgContent from '../elements/hg-content.js';
import '../content/hg-article/hg-intro-article.js';
import '../content/hg-quote.js';
import '../content/hg-content-icons.js';
import '../content/hg-content-slider.js';
import '../content/hg-mosaic.js';
import '../content/hg-text-image.js';
import '../content/hg-halls-block.js';
import '../content/hg-reviews-block.js';
import '../content/hg-contact-block.js';
import '../content/hg-links.js';

export class HgWeddings extends HgContent {
  render() {
    return html`
      <hg-intro-article .uid=${'weddings'}></hg-intro-article>
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
    `;
  }
}
customElements.define('hg-weddings', HgWeddings);
