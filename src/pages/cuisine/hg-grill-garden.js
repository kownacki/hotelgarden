import {LitElement, html, css} from 'lit-element';
import {staticProp} from '../../utils.js';
import '../../content/hg-article/hg-intro-article.js'
import '../../content/hg-icons.js'
import '../../content/hg-mosaic.js'
import '../../content/hg-content-slider.js';
import '../../content/hg-reviews-block.js';
import '../../content/hg-menu.js'
import '../../content/hg-links.js';

customElements.define('hg-grill-garden', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
    `;
  }
  render() {
    return html`
      <hg-intro-article .uid=${'grill-garden'}></hg-intro-article>
      <hg-icons .uid=${'grill-garden'}></hg-icons>
      <hg-mosaic .uid=${'grill-garden'} .buttons=${staticProp({primary: [{url: '#menu', text: 'Zobacz menu'}]})}></hg-mosaic>
      <hg-content-slider .uid=${'grill-garden'}></hg-content-slider>
      <hg-reviews-block .uid=${'grill-garden'}></hg-reviews-block>
      <hg-links .path=${'/grill-garden'} .superpath=${'/kuchnia'}></hg-links>
    `;
  }
});
