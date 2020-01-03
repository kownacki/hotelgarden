import {LitElement, html, css} from 'lit-element';
import '../../elements/hg-list.js';
import './hg-reviews/hg-reviews-item.js';

customElements.define('hg-reviews', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 1200px;
        padding: 20px;
        margin: auto;
      }
    `;
  }
  render() {
    return html`
      <hg-list
        .reverse=${true}
        .doc=${'reviews/reviews'}
        .template=${(review) => html`<hg-reviews-item .review=${review}></hg-reviews-item>`}>
      </hg-list>
    `;
  }
});
