import {LitElement, html, css} from 'lit-element';
import '../../content/hg-article/hg-intro-article.js'
import '../../content/hg-icons.js'
import '../../content/hg-mosaic.js'
import '../../content/hg-content-slider.js';
import '../../content/hg-reviews-block.js';
import '../../content/hg-links.js';

customElements.define('hg-catering', class extends LitElement {
  static get properties() {
    return {
    };
  }
  static get styles() {
    return css`
    `;
  }
  render() {
    return html`
      <hg-intro-article .uid=${'catering'}></hg-intro-article>
      <hg-icons .uid=${'catering'}></hg-icons>
      <hg-mosaic .uid=${'catering'}></hg-mosaic>
      <hg-content-slider .uid=${'catering'}></hg-content-slider>
      <hg-reviews-block .uid=${'catering'}></hg-reviews-block>
      <hg-links .path=${'/catering'} .superpath=${'/kuchnia'}></hg-links>
    `;
  }
});
