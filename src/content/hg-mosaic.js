import {LitElement, html, css, unsafeCSS} from 'lit';
import {DbSyncController} from 'mkwc/DbSyncController.js';
import '../edit/hg-editable-text.js';
import '../elements/mkwc/hg-image.js';
import '../elements/hg-action-buttons.js';
import ckContent from '../styles/ck-content.js'
import sharedStyles from '../styles/shared-styles';
import {firebaseUtils as fb} from '../utils/firebase.js';
import {updateData} from '../utils.js';

const maxImageWidth = 750;

export class HgMosaic extends LitElement {
  _dbSync;
  static properties = {
    uid: Number,
    buttons: Object,
    _path: fb.Path,
    _mosaic: Object,
    _ready: Boolean,
  };
  static styles = [sharedStyles, ckContent, css`
    :host {
      ${unsafeCSS(`
        --max-image-width: ${maxImageWidth}px;
      `)}
      max-width: 1240px;
      margin: 60px auto;
      padding: 0 20px;
      display: block;
      overflow: auto;
    }
    .left {
      width: calc(45% - 1px);
      margin-right: 1px;
      float: left;
    }
    .right {
      width: 55%;
      float: right;
    }
    .content {
      margin: 0 40px 40px;
    }
    hg-action-buttons {
      margin-top: 30px;
    }
    @media all and (max-width: 959px) {
      :host {
        max-width: var(--max-image-width);
      }
      .left, .right {
        float: none;
        width: 100%;
      }
      .content {
        margin: 20px 0 40px;
      }
    }
    @media all and (max-width: 599px) {
      :host {
        margin: 40px auto;
      }
    }
  `];
  constructor() {
    super();
    this._dbSync = new DbSyncController(
      this,
      async (path) => await fb.get(path) || {},
      undefined,
      (ready) => this._ready = ready,
      (mosaic) => this._mosaic = mosaic,
    );
  }
  async willUpdate(changedProperties) {
    if (changedProperties.has('uid')) {
      this._path = fb.path(`mosaics/${this.uid}`);
      this._dbSync.setPath(this._path);
    }
  }
  async updateData(path, data) {
    updateData('mosaics/' + this.uid, path, data);
  }
  render() {
    return html`
      <div class="left">
        <hg-image
          .path=${this._path.extend('primary.image')}
          .noGet=${true}
          .image=${this._mosaic?.primary?.image}
          .ready=${this._ready}
          .maxWidth=${maxImageWidth}
          .presize=${true}>
        </hg-image>
      </div>
      <div class="right">
        <div class="content">
          <hg-editable-text
            .ready=${this._ready}
            .text=${_.get('primary.heading', this._mosaic)}
            @save=${(event) => this.updateData('primary.heading', event.detail)}>
            <h2></h2>
          </hg-editable-text>
          <hg-editable-text
            .ready=${this._ready}
            multiline
            .rich=${true}
            .richConfig=${'mosaic'}
            .text=${_.get('primary.text', this._mosaic)}
            @save=${(event) => this.updateData('primary.text', event.detail)}>
            <div class="ck-content"></div>
          </hg-editable-text>
          ${!_.get('primary', this.buttons) ? '' : html`<hg-action-buttons .buttons=${this.buttons.primary}></hg-action-buttons>`}
        </div>
        <hg-image
          .path=${this._path.extend('secondary.image')}
          .noGet=${true}
          .image=${this._mosaic?.secondary?.image}
          .ready=${this._ready}
          .maxWidth=${maxImageWidth}
          .presize=${true}>
        </hg-image>
      </div>
      <div class="left">
        <div class="content">
           <hg-editable-text
            .ready=${this._ready}
            .text=${_.get('secondary.heading', this._mosaic)}
            @save=${(event) => this.updateData('secondary.heading', event.detail)}>
            <h2></h2>
          </hg-editable-text>
          <hg-editable-text
            .ready=${this._ready}
            multiline
            .rich=${true}
            .richConfig=${'mosaic'}
            .text=${_.get('secondary.text', this._mosaic)}
            @save=${(event) => this.updateData('secondary.text', event.detail)}>
            <div class="ck-content"></div>
          </hg-editable-text>
          ${!_.get('secondary', this.buttons) ? '' : html`<hg-action-buttons .buttons=${this.buttons.secondary}></hg-action-buttons>`}
        </div>
      </div>
    `;
  }
}
customElements.define('hg-mosaic', HgMosaic);
