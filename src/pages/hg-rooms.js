import {LitElement, html, css} from 'lit-element';
import '../hg-banner.js';

customElements.define('hg-rooms', class extends LitElement {
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
        .src=${'https://picsum.photos/id/514/1920/980'}
        .uid=${'rooms'}>
      </hg-banner>
    `;
  }
});
