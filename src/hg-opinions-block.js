import {LitElement, html, css} from 'lit-element';
import './hg-heading.js';
import './hg-scores.js';

customElements.define('hg-opinions-block', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .container {
        display: flex;
        justify-content: center;
      }
    `;
  }
  render() {
    return html`
      <hg-heading .text=${'Nasi goście o nas'} center></hg-heading>
      <div class="container">
        <hg-scores></hg-scores>
      </div>
    `;
  }
});
