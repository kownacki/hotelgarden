import {LitElement, html, css} from 'lit-element';
import {staticProp} from '../../utils.js';
import '../../content/hg-menu.js'
import '../../content/hg-reviews-block.js';

customElements.define('hg-restaurant', class extends LitElement {
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
      <hg-article .uid=${'restaurant'}></hg-article>
      <hg-icons .uid=${'restaurant'}></hg-icons>
      <hg-mosaic .uid=${'restaurant'} .buttons=${staticProp({primary: [{url: '#menu', text: 'Zobacz menu'}]})}></hg-mosaic>
      <hg-content-slider .uid=${'restaurant'}></hg-content-slider>
      <hg-reviews-block .uid=${'restaurant'}></hg-reviews-block>
      <hg-menu .uid=${'restaurant'}></hg-menu> 
    `;
  }
});
