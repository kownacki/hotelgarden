import {LitElement, html, css} from 'lit-element';
import {staticProp} from '../utils.js';
import './hg-halls-block/hg-halls-slider.js';
import './hg-text-image.js';
import '../elements/hg-image.js';
import sharedStyles from "../styles/shared-styles";

customElements.define('hg-halls-block', class extends LitElement {
  static get properties() {
    return {
      type: String, // 'conference' / 'banquet'
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
        margin: 80px 0;
      }
      .container {
        max-width: 1200px;
        margin: 60px auto;
        display: flex;
        flex-direction: row-reverse;
        justify-content: center;
      }
      hg-halls-slider {
        width: 500px;
      }
      hg-image {
        margin: 0 40px;
        flex: 1;
        width: 620px;
        max-width: 100%;
        height: 400px;
      }
      @media all and (max-width: 959px) {
        :host {
          margin: 40px auto;
        }
        .container {
          display: block;
        }
        hg-halls-slider {
          width: 600px;
          max-width: 100%;
          height: 400px;
          margin: 40px auto 0;
        }
        hg-image {
          margin: auto;
          width: 750px;
          max-width: calc(100% - 40px);
        }
      }
      @media all and (max-width: 599px) {
        :host(:not([scores])) hg-image {
          height: 280px;
        }
        hg-halls-slider {
          height: 350px;
        }
      }
      @media all and (max-width: 479px) {
        :host(:not([scores])) hg-image {
          height: 200px;
        }
        hg-halls-slider {
          height: 450px;
        }
      }
    `];
  }
  render() {
    return html`
      <h2 class="content-heading">Zobacz sale</h2>
      <div class="container">
        <hg-image .sizing=${'cover'} .path=${staticProp({doc: `images/${this.uid}-halls-block`})}></hg-image>
        <hg-halls-slider .type=${this.type}></hg-halls-slider>
      </div>
    `;
  }
});
