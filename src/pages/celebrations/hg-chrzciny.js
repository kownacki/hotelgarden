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

export class HgChrzciny extends HgContent {
  render() {
    return html`
      <hg-intro-article .uid=${'chrzciny'}></hg-intro-article>
      <hg-quote .uid=${'chrzciny'}></hg-quote>
      <hg-content-icons .uid=${'chrzciny'}></hg-content-icons>
      <hg-content-slider .uid=${'chrzciny'}></hg-content-slider>
      <hg-mosaic .uid=${'chrzciny'}></hg-mosaic>
      <hg-halls-block .uid=${'chrzciny'} .type=${'banquet'}></hg-halls-block>
      <hg-reviews-block uid=${'chrzciny'}></hg-reviews-block>
      <hg-contact-block></hg-contact-block>
      <hg-links .path=${'/chrzciny'} .superpath=${'/wesela'} .includeSuperpath=${true}></hg-links>
    `;
  }
}
customElements.define('hg-chrzciny', HgChrzciny);
