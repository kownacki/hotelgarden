import {LitElement, html, css} from 'lit';
import {HDTV_WIDTH, HDTV_HEIGHT} from '../../config.js';
import '../edit/hg-editable-text.js';
import '../elements/mkwc/hg-editable-image.js';
import sharedStyles from '../styles/shared-styles.js';
import {DbPath, createDbPath, getFromDb, updateDataOrImageInObjectInDb} from '../utils/database.js';
import {ObjectDbSyncController} from '../utils/ObjectDbSyncController.js';

const maxImageWidth = HDTV_WIDTH;
const maxImageHeight = HDTV_HEIGHT;

export class HgBanner extends LitElement {
  _objectDbSync;
  static properties = {
    uid: String,
    path: DbPath,
    useTitleAsHeading: String,
    noImage: {type: Boolean, reflect: true, attribute: 'no-image'},
    noSubheading: Boolean,
    _path: DbPath,
    _banner: Object,
    _dataReady: Boolean,
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
      :host(:not([no-image])), hg-editable-image {
        height: 66%;
      }
    }
  `];
  constructor() {
    super();
    this._objectDbSync = new ObjectDbSyncController(
      this,
      async (path) => await getFromDb(path) || {},
      async (objectPath, dataPath, {type, data}, oldData, object) => {
        return updateDataOrImageInObjectInDb(type, objectPath, dataPath, data, object);
      },
      (ready) => this._dataReady = ready,
      (banner) => this._banner = banner,
    );
  }
  async willUpdate(changedProperties) {
    if (changedProperties.has('uid') && this.uid) {
      this._path = createDbPath(`banners/${this.uid}`);
    }
    if (changedProperties.has('path') && this.path) {
      this._path = this.path;
    }
    if (changedProperties.has('_path')) {
      this._objectDbSync.setPath(this._path);
    }
  }
  render() {
    return html`
      ${this.noImage ? ''
        : html`<hg-editable-image
          .src=${this._banner?.image?.url}
          .ready=${this._dataReady}
          .fit=${'cover'}
          .maxWidth=${maxImageWidth}
          .maxHeight=${maxImageHeight}
          .compressionQuality=${0.7}
          @image-uploaded=${({detail: blob}) => {
            this._objectDbSync.requestFieldUpdate('image', {type: 'image', data: blob});
          }}>
        </hg-editable-image>
        <div class="gradient"></div>
      `}
      <div class="heading">
        <hg-editable-text
          .ready=${this._dataReady}
          .text=${this._banner?.[this.useTitleAsHeading ? 'title' : 'heading'] || ''}
          @save=${({detail: text}) => {
            this._objectDbSync.requestFieldUpdate(this.useTitleAsHeading ? 'title' : 'heading', {type: 'data', data: text});
          }}>
          <h1 class="horizontally-spacious-text"></h1>
        </hg-editable-text>
        ${this.noSubheading ? '' : html`<hg-editable-text
          .ready=${this._dataReady}
          .text=${this._banner?.subheading || ''}
          @save=${({detail: text}) => {
            this._objectDbSync.requestFieldUpdate('subheading', {type: 'data', data: text});
          }}>
          <p class="horizontally-spacious-text"></p>
        </hg-editable-text>`}
      </div>
    `;
  }
}
customElements.define('hg-banner', HgBanner);
