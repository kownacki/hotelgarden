import {LitElement, html, css} from 'lit-element';
import '../../content/hg-links.js';

customElements.define('hg-faq', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
    `;
  }
  render() {
    return html`
      <hg-links .path=${'/faq'} .superpath=${'/'}></hg-links>
    `;
  }
});
