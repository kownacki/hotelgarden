import {LitElement, html, css, unsafeCSS} from 'lit';
import '../elements/mkwc/hg-editable-image-with-sync.js';
import sharedStyles from '../styles/shared-styles.js';
import {staticProp} from '../utils.js';
import './hg-halls-block/hg-halls-slider.js';

const maxImageWidth = 750;
const maxImageHeight = 400;

export class HgHallsBlock extends LitElement {
  static properties = {
    uid: String,
    type: String, // 'conference' / 'banquet'
  };
  static styles = [sharedStyles, css`
    :host {
      ${unsafeCSS(`
        --max-image-width: ${maxImageWidth}px;
        --max-image-height: ${maxImageHeight}px;
      `)}
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
    hg-editable-image-with-sync {
      margin: 0 40px;
      flex: 1;
      width: 620px;
      max-width: 100%;
      height: var(--max-image-height);
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
        height: var(--max-image-height);
        margin: 40px auto 0;
      }
      hg-editable-image-with-sync {
        margin: auto;
        width: var(--max-image-width);
        max-width: calc(100% - 40px);
      }
    }
    @media all and (max-width: 599px) {
      :host(:not([scores])) hg-editable-image-with-sync {
        height: 280px;
      }
      hg-halls-slider {
        height: 350px;
      }
    }
    @media all and (max-width: 479px) {
      :host(:not([scores])) hg-editable-image-with-sync {
        height: 200px;
      }
      hg-halls-slider {
        height: 450px;
      }
    }
  `];
  render() {
    return html`
      <h2 class="content-heading">Zobacz sale</h2>
      <div class="container">
        <hg-editable-image-with-sync
          .path=${staticProp({doc: `images/${this.uid}-halls-block`})}
          .fit=${'cover'}
          .maxWidth=${maxImageWidth}
          .maxHeight=${maxImageHeight}>
        </hg-editable-image-with-sync>
        <hg-halls-slider .type=${this.type}></hg-halls-slider>
      </div>
    `;
  }
}
customElements.define('hg-halls-block', HgHallsBlock);
