import {LitElement, html, css} from 'lit-element';
import './hg-halls-block/hg-halls-slider.js';
import '../elements/hg-image.js';
import './hg-text-image.js';

customElements.define('hg-halls-block', class extends LitElement {
  static get properties() {
    return {
      uid: String,
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
        margin: 80px 0;
      }
      .container {
        max-width: 1200px;
        margin: 60px auto;
        display: flex;
        justify-content: center;
      }
      hg-halls-slider {
        width: 450px;
      }
      hg-image {
        margin: 0 40px;
        flex: 1;
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
          margin: 0 20px;
        }
      }
      @media all and (max-width: 599px) {
        :host(:not([scores])) hg-image {
          height: 280px;
        }
        hg-halls-slider {
          height: 500px;
        }
      }
      @media all and (max-width: 479px) {
        :host(:not([scores])) hg-image {
          height: 200px;
        }
      }
    `;
  }
  render() {
    return html`
      <hg-text-image .uid=${this.uid + '-halls-block'}></hg-text-image>
      <div class="container">
        <hg-halls-slider .uid=${this.uid}></hg-halls-slider>
        <hg-image .sizing=${'cover'} .uid=${this.uid + '-halls-block'}></hg-image>
      </div>
    `;
  }
});
