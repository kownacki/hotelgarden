import {LitElement, html, css} from 'lit-element';
import {staticProp} from '../../utils.js';
import '../../content/hg-article.js';
import '../../content/hg-icons.js';
import '../../content/hg-mosaic.js';
import '../../content/hg-links.js';

customElements.define('hg-villa-garden', class extends LitElement {
  static get properties() {
    return {
    };
  }
  static get styles() {
    return css`
      :host {
      }
    `;
  }
  render() {
    return html`
      <hg-article .uid=${'villa-garden'}></hg-article>
      <hg-icons .uid=${'villa-garden'}></hg-icons>
      <hg-mosaic .uid=${'villa-garden'} .buttons=${staticProp({
        primary: [{url: '#', text: 'Zobacz ofertę'}, {url: '#', text: 'Lorem ipsum'}],
        secondary: [{url: '#'}],
      })}></hg-mosaic>
      <hg-links .path=${'/villa-garden'} .superpath=${'/'}></hg-links>
    `;
  }
});
