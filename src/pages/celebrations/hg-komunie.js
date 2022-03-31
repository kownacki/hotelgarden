import {LitElement, html, css} from 'lit';
import HgContent from '../../elements/hg-content.js';
import '../../content/hg-article/hg-intro-article.js';
import '../../content/hg-quote.js';
import '../../content/hg-content-icons.js';
import '../../content/hg-content-slider.js';
import '../../content/hg-mosaic.js';
import '../../content/hg-halls-block.js';
import '../../content/hg-reviews-block.js';
import '../../content/hg-contact-block.js';
import '../../content/hg-links.js';

export class HgKomunie extends HgContent {
  render() {
    return html`
      <hg-intro-article .uid=${'komunie'}></hg-intro-article>
      <hg-quote .uid=${'komunie'}></hg-quote>
      <hg-content-icons .uid=${'komunie'}></hg-content-icons>
      <hg-content-slider .uid=${'komunie'}></hg-content-slider>
      <hg-mosaic .uid=${'komunie'}></hg-mosaic>
      <hg-halls-block .uid=${'komunie'} .type=${'banquet'}></hg-halls-block>
      <hg-reviews-block uid=${'komunie'}></hg-reviews-block>
      <hg-contact-block></hg-contact-block>
      <hg-links .path=${'/komunie'} .superpath=${'/wesela'} .includeSuperpath=${true}></hg-links>
    `;
  }
}
customElements.define('hg-komunie', HgKomunie);
