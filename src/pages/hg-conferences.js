import {LitElement, html, css} from 'lit-element';
import '../hg-banner.js';

customElements.define('hg-conferences', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
    `;
  }
  render() {
    return html`
      <hg-banner
        .src=${'https://picsum.photos/id/3/1920/980'}
        .uid=${'conferences'}>
      </hg-banner>
    `;
  }
});
