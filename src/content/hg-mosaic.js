import {LitElement, html, css} from 'lit';
import {updateData, updateImage} from "../utils.js";
import sharedStyles from "../styles/shared-styles";
import ckContent from '../styles/ck-content.js'
import '../edit/hg-editable-image.js';
import '../edit/hg-editable-text.js';
import '../elements/hg-action-buttons.js';

export class HgMosaic extends LitElement {
  static get properties() {
    return {
      uid: Number,
      buttons: Object,
      _mosaic: Object,
      _dataReady: Boolean,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._mosaic = (await db.doc('mosaics/' + this.uid).get()).data() || {};
      this._dataReady = true;
    })();
  }
  static get styles() {
    return [sharedStyles, ckContent, css`
      :host {
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
          max-width: 750px;
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
  }
  async updateData(path, data) {
    updateData('mosaics/' + this.uid, path, data);
  }
  async updateImage(path, file) {
    this._mosaic = _.set(
      path,
      await updateImage('mosaics/' + this.uid, path, file, (_.get(`${path}.name`, this._mosaic))),
      this._mosaic,
    );
  }
  render() {
    return html`
      <div class="left">
        <hg-editable-image
          presize
          .src=${_.get('primary.image.url', this._mosaic)}
          @save=${(event) => this.updateImage('primary.image', event.detail)}>
        </hg-editable-image>
      </div>
      <div class="right">
        <div class="content">
          <hg-editable-text
            .ready=${this._dataReady}
            .text=${_.get('primary.heading', this._mosaic)}
            @save=${(event) => this.updateData('primary.heading', event.detail)}>
            <h2></h2>
          </hg-editable-text>
          <hg-editable-text
            .ready=${this._dataReady}
            multiline
            .rich=${true}
            .richConfig=${'mosaic'}
            .text=${_.get('primary.text', this._mosaic)}
            @save=${(event) => this.updateData('primary.text', event.detail)}>
            <div class="ck-content"></div>
          </hg-editable-text>
          ${!_.get('primary', this.buttons) ? '' : html`<hg-action-buttons .buttons=${this.buttons.primary}></hg-action-buttons>`}
        </div>
        <hg-editable-image
          presize
          .src=${_.get('secondary.image.url', this._mosaic)}
          @save=${(event) => this.updateImage('secondary.image', event.detail)}>
        </hg-editable-image>
      </div>
      <div class="left">
        <div class="content">
           <hg-editable-text
            .ready=${this._dataReady}
            .text=${_.get('secondary.heading', this._mosaic)}
            @save=${(event) => this.updateData('secondary.heading', event.detail)}>
            <h2></h2>
          </hg-editable-text>
          <hg-editable-text
            .ready=${this._dataReady}
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
