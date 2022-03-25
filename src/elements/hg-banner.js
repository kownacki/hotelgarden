import {LitElement, html, css} from 'lit';
import '../edit/hg-editable-text.js';
import sharedStyles from '../styles/shared-styles.js';
import {updateData} from '../utils.js';
import {firebaseUtils as fb} from '../utils/firebase.js';
import './mkwc/hg-image.js';

// HDTV resolution
const maxImageWidth = 1920;
const maxImageHeight = 1080;

export class HgBanner extends LitElement {
  static properties = {
    uid: String,
    path: Object,
    useTitleAsHeading: String,
    noImage: {type: Boolean, reflect: true, attribute: 'no-image'},
    noSubheading: Boolean,
    _banner: Object,
    _dataReady: Boolean,
  };
  static styles = [sharedStyles, css`
    :host {
      height: 100%;
      display: flex;
    }
    hg-image {
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
      background: rgba(var(--secondary-color-rgb), 0.5);
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
      :host(:not([no-image])), hg-image {
        height: 66%;
      }
    }
  `];
  async updated(changedProperties) {
    if (changedProperties.has('uid') && this.uid) {
      this.path = {doc: 'banners/' + this.uid};
    }
    if (changedProperties.has('path') && this.path) {
      this._dataReady = false;
      const path = this.path;
      const doc = (await db.doc(this.path.doc).get()).data();
      if (_.isEqual(this.path, path)) {
        this._banner = (this.path.field ? _.get(this.path.field, doc) : doc) || {};
        this._dataReady = true;
      }
    }
  }
  updateData(path, data) {
    updateData(this.path.doc, `${this.path.hasOwnProperty('field') ? `${this.path.field}.` : ''}${path}`, data)
  }
  render() {
    return html`
      ${this.noImage ? ''
        : html`<hg-image
          .path=${this.path && fb.path(this.path.doc, this.path.field).extend('image')}
          .fit=${'cover'}
          .maxWidth=${maxImageWidth}
          .maxHeight=${maxImageHeight}
          .compressionQuality=${0.7}>
        </hg-image>
        <div class="gradient"></div>
      `}
      <div class="heading">
        <hg-editable-text
          .ready=${this._dataReady}
          .text=${_.get(this.useTitleAsHeading ? 'title' : 'heading', this._banner) || ''}
          @save=${(event) => this.updateData(this.useTitleAsHeading ? 'title' : 'heading', event.detail)}>
          <h1 class="horizontally-spacious-text"></h1>
        </hg-editable-text>
        ${this.noSubheading ? '' : html`<hg-editable-text
          .ready=${this._dataReady}
          .text=${_.get('subheading', this._banner) || ''}
          @save=${(event) => this.updateData('subheading', event.detail)}>
          <p class="horizontally-spacious-text"></p>
        </hg-editable-text>`}
      </div>
    `;
  }
}
customElements.define('hg-banner', HgBanner);
