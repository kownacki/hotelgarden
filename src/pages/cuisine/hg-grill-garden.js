import {LitElement, html, css} from 'lit-element';
import '../../content/hg-menu.js'

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
      <hg-menu .uid=${'grill-garden'}></hg-menu> 
    `;
  }
});
