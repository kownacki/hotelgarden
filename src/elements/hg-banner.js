import {LitElement, html, css} from 'lit';
import {HDTV_WIDTH, HDTV_HEIGHT, IMAGE_COMPRESSION_QUALITY} from '../../utils/config.js';
import '../edit/hg-editable-text.js';
import '../elements/mkwc/hg-editable-image.js';
import sharedStyles from '../styles/shared-styles.js';

const maxImageWidth = HDTV_WIDTH;
const maxImageHeight = HDTV_HEIGHT;

export class HgBanner extends LitElement {
  static properties = {
    banner: Object,
    ready: Boolean,
    noImage: {type: Boolean, reflect: true, attribute: 'no-image'},
    noSubheading: Boolean,
    noTextsEditing: Boolean,
  };
  static styles = [sharedStyles, css`
    :host {
      height: 100%;
      display: flex;
    }
    hg-editable-image {
      inset: 0;
      position: absolute;
    }
    .gradient {
      inset: 0;
      position: absolute;
      pointer-events: none;
      background: linear-gradient(to bottom,rgba(0,0,0,.4),transparent 45%);
     }
    .heading {
      background: rgba(var(--surface-dark-color-rgb), 0.5);
      padding: 20px;
      width: 1000px;
      max-width: 100%;
      margin: auto auto 0;
      text-align: center;
      text-transform: uppercase;
      z-index: 1;
    }
    h1 {
      margin: 10px;
      color: white;
    }
    p {
      font-weight: 300;
      font-size: 18px;
      margin: 10px;
      color: white;
    }
    :host([no-image]) {
      height: auto;
    }
    :host([no-image]) .heading {
      background: transparent;
    }
    :host([no-image]) h1, :host([no-image]) p {
      color: inherit;
    }
    @media all and (max-width: 599px) {
      :host(:not([no-image])), hg-editable-image {
        height: 66%;
      }
    }
  `];
  render() {
    return html`
      ${this.noImage ? ''
        : html`<hg-editable-image
          .src=${this.banner?.image?.url}
          .ready=${this.ready}
          .fit=${'cover'}
          .maxWidth=${maxImageWidth}
          .maxHeight=${maxImageHeight}
          .compressionQuality=${IMAGE_COMPRESSION_QUALITY}
          @image-uploaded=${({detail: blob}) => {
            this.dispatchEvent(new CustomEvent('request-image-change', {detail: blob}));
          }}>
        </hg-editable-image>
        <div class="gradient"></div>
      `}
      <div class="heading">
        <hg-editable-text
          .ready=${this.ready}
          .text=${this.banner?.heading || ''}
          .editingEnabled=${!this.noTextsEditing}
          @save=${({detail: text}) => {
            this.dispatchEvent(new CustomEvent('request-heading-change', {detail: text}));
          }}>
          <h1 class="horizontally-spacious-text"></h1>
        </hg-editable-text>
        ${this.noSubheading ? ''
          : html`
            <hg-editable-text
              .ready=${this.ready}
              .text=${this.banner?.subheading || ''}
              .editingEnabled=${!this.noTextsEditing}
              @save=${({detail: text}) => {
                this.dispatchEvent(new CustomEvent('request-subheading-change', {detail: text}));
              }}>
              <p class="horizontally-spacious-text"></p>
            </hg-editable-text>
          `
        }
      </div>
    `;
  }
}
customElements.define('hg-banner', HgBanner);
