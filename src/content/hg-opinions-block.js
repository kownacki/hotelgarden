import {LitElement, html, css} from 'lit-element';
import '../hg-heading.js';
import './hg-scores.js';
import '../hg-slider.js';
import {storage} from "../utils";

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
        <hg-slider
          .items=${this._images}
          .template=${(image) => html`
            <iron-image
              .src=${image.url}
              .sizing=${'contain'}>
            </iron-image>
          `}>
        </hg-slider>
      </div>
    `;
  }
});
