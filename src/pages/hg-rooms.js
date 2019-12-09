import {LitElement, html, css} from 'lit-element';
import '../hg-banner.js';
import '../content/hg-article.js';
import '../content/hg-icons/hg-icons.js';

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
      <hg-banner .uid=${'rooms'}></hg-banner>
      <hg-article .uid=${'rooms'}></hg-article>
      <hg-icons .uid=${'rooms'}></hg-icons>
    `;
  }
});
