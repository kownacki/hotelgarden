import {LitElement, html, css} from 'lit-element';
import '../../content/hg-article.js';
import '../../content/hg-icons.js';
import '../../content/hg-mosaic.js';
import '../../content/hg-content-slider.js';
import '../../content/hg-halls-block.js';

customElements.define('hg-weddings', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
    `;
  }
  render() {
    return html`
      <hg-article .uid=${'weddings'}></hg-article>
      <hg-quote .uid=${'weddings'}></hg-quote>
      <hg-icons .uid=${'weddings'}></hg-icons>
      <hg-content-slider .uid=${'weddings'}></hg-content-slider>
      <hg-mosaic .uid=${'weddings'}}></hg-mosaic>
      <hg-opinions-block uid=${'weddings'}></hg-opinions-block>
      <hg-text-image swap .uid=${'weddings'}}></hg-text-image>
      <hg-halls-block .uid=${'weddings'}></hg-halls-block>
      <hg-links .path=${'/wesela'} .superpath=${'/wesela'}></hg-links>
    `;
  }
});
