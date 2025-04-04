import {LitElement, html, css, unsafeCSS} from 'lit';
import '../edit/hg-editable-text.js';
import '../elements/mkwc/hg-editable-image.js';
import '../elements/hg-action-buttons.js';
import '../elements/hg-content-label.js';
import '../elements/hg-image-slider.js';
import '../elements/hg-icon-info.js';
import ckContent from '../styles/ck-content.js'
import sharedStyles from '../styles/shared-styles';
import {createDbPath, DbPath, getFromDb, updateDataOrImageInObjectInDb} from '../utils/database.js';
import {ObjectDbSyncController} from '../utils/ObjectDbSyncController.js';

const maxImageWidth = 750;
const maxImageHeight = 400;

export class HgTextImage extends LitElement {
  _objectDbSync;
  static properties = {
    uid: String,
    buttons: Array,
    h3: {type: Boolean},
    noHeading: Boolean,
    swap: {type: Boolean, reflect: true},
    iconFields: Array,
    iconSrcs: Array,
    iconsAtEnd: {type: Boolean, reflect: true, attribute: 'icons-at-end'},
    slider: Boolean,
    _path: DbPath,
    _textImage: Object,
    _ready: Boolean,
  };
  static styles = [sharedStyles, ckContent, css`
    :host {
      ${unsafeCSS(`
        --max-image-width: ${maxImageWidth}px;
        --max-image-height: ${maxImageHeight}px;
      `)}
      max-width: 1240px;
      margin: 80px auto;
      padding: 0 20px;
      display: flex;
      position: relative;
    }
    :host([swap]) {
      flex-direction: row-reverse;
    }
    :host(:hover) hg-content-label {
      left: 20px;
      display: block;
    }
    hg-editable-image, hg-image-slider {
      width: 50%;
      height: var(--max-image-height);
    }
    .content {
      width: 50%;
      margin: 40px;
    }
    h2, h3 {
      margin-top: 0;
    }
    hg-icon-info {
      margin: 20px 0;
    }
    :host([icons-at-end]) hg-icon-info[] {
      margin-bottom: 0;
    }
    hg-action-buttons {
      margin-top: 30px;
    }
    @media all and (max-width: 959px) {
      :host, :host([swap]) {
        max-width: var(--max-image-width);
        flex-direction: column;
      }
      hg-editable-image, hg-image-slider {
        width: 100%;
        margin: auto;
      }
      .content {
        width: auto;
        margin: 30px 0 0;
      }
    }
    @media all and (max-width: 599px) {
      :host {
        margin: 60px auto;
      }
      hg-editable-image, hg-image-slider {
        height: 280px;
      }
    }
    @media all and (max-width: 479px) {
      hg-editable-image, hg-image-slider {
        height: 200px;
      }
    }
  `];
  constructor() {
    super();
    this._objectDbSync = new ObjectDbSyncController(
      this,
      {
        getObject: async (path) => await getFromDb(path) || {},
        updateField: async (objectPath, dataPath, {type, data}, oldData, object) => {
          return updateDataOrImageInObjectInDb(type, objectPath, dataPath, data, object);
        },
        onDataReadyChange: (ready) => this._ready = ready,
        onDataChange: (textImage) => this._textImage = textImage,
      },
    );
  }
  async willUpdate(changedProperties) {
    if (changedProperties.has('uid')) {
      this._path = createDbPath(`textImage/${this.uid}`);
      this._objectDbSync.setPath(this._path);
    }
  }
  render() {
    return html`
      ${this.slider
        ? html`<hg-image-slider
          .path=${this._path.extend('images')}
          .images=${this._textImage?.images}
          .ready=${this._ready}
          .noGetImages=${true}>
        </hg-image-slider>`
        : html`<hg-editable-image
          .src=${this._textImage?.images?.[0]?.url}
          .ready=${this._ready}
          .fit=${'cover'}
          .maxWidth=${maxImageWidth}
          .maxHeight=${maxImageHeight}
          @image-uploaded=${({detail: blob}) => {
            this._objectDbSync.requestFieldUpdate('images.0', {type: 'image', data: blob});
          }}>
        </hg-editable-image>`}
      <div class="content">
        ${this.noHeading ? '' : html`<hg-editable-text
          .ready=${this._ready}
          .text=${this._textImage?.heading}
          @save=${({detail: text}) => {
            this._objectDbSync.requestFieldUpdate('heading', {type: 'data', data: text});
          }}>
          ${!this.h3 ? html`<h2></h2>` : html`<h3></h3>`}
        </hg-editable-text>`}
        ${(this.iconsAtEnd ? _.reverse : _.identity)([
          _.isEmpty(this.iconFields) ? '' : html`<hg-icon-info
            .editable=${true}
            .dataReady=${this._ready}
            .items=${_.zipWith((text, src) => ({text, src}), _.map(_.get(_, this._textImage), this.iconFields), this.iconSrcs)}
            @save=${({detail: {index, text}}) => {
              this._objectDbSync.requestFieldUpdate(`${this.iconFields[index]}`, {type: 'data', data: text});
            }}>
          </hg-icon-info>`,
          html`<hg-editable-text
            .ready=${this._ready}
            .rich=${true}
            .richConfig=${'mosaic'}
            multiline
            .text=${this._textImage?.text}
            @save=${({detail: text}) => {
              this._objectDbSync.requestFieldUpdate('text', {type: 'data', data: text});
            }}>
            <div class="text ck-content"></div>
          </hg-editable-text>`,
        ])}
        ${_.isEmpty(this.buttons) ? '' : html`<hg-action-buttons .buttons=${this.buttons}></hg-action-buttons>`}
      </div>
      <hg-content-label .name=${'Obraz i tekst'}></hg-content-label>
    `;
  }
}
customElements.define('hg-text-image', HgTextImage);
