import {LitElement, html, css} from 'lit-element';
import '../../content/hg-menu/hg-menu.js'
import '../../content/hg-opinions-block/hg-opinions-block.js';

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
      <hg-mosaic .uid=${'restaurant'} .buttons=${{primary: [{url: '#menu', text: 'Zobacz menu'}]}}></hg-mosaic>
      <hg-content-slider .uid=${'restaurant'}></hg-content-slider>
      <hg-opinions-block .uid=${'restaurant'}></hg-opinions-block>
      <hg-menu id="menu"></hg-menu> 
    `;
  }
});
