import {LitElement, html, css} from 'lit-element';
import './hg-halls-slider.js';
import '../../content/hg-image.js';
import '../../content/hg-text-image.js';

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
        margin-left: 40px;
        flex: 1;
        margin-right: 40px;
        height: 400px;
      }
    `;
  }
  render() {
    return html`
      <hg-text-image .uid=${this.uid}></hg-text-image>
      <div class="container">
        <hg-halls-slider .uid=${this.uid}></hg-halls-slider>
        <hg-image .sizing=${'cover'} .uid=${this.uid}></hg-image>
      </div>
    `;
  }
});
