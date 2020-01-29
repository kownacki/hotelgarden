import {LitElement, html, css} from 'lit-element';
import {db, updateData, updateImage, staticProp} from "../utils.js";
import '../edit/hg-editable-text.js';
import '../elements/hg-image-slider.js';
import '../elements/hg-action-buttons.js';
import '../elements/hg-icon-info.js';
import '../elements/hg-icons.js';
import sharedStyles from "../styles/shared-styles";
import ckContent from '../styles/ck-content.js'

customElements.define('hg-text-image', class extends LitElement {
  static get properties() {
    return {
      uid: Number,
      buttons: Number,
      h3: {type: Boolean},
      swap: {type: Boolean, reflect: true},
      iconFields: Array,
      iconSrcs: Array,
      _textImage: Object,
      _dataReady: Boolean,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._textImage = (await db.doc('textImage/' + this.uid).get()).data() || {};
      this._dataReady = true;
    })();
  }
  static get styles() {
    return [sharedStyles, ckContent, css`
      :host {
        max-width: 1240px;
        margin: 80px auto;
        padding: 0 20px;
        display: flex;
      }
      :host([swap]) {
        flex-direction: row-reverse;
      }
      hg-image-slider {
        width: 50%;
        height: 400px;
      }
      .content {
        width: 50%;
        margin: 0 40px 40px;
      }
      hg-icon-info {
        margin-bottom: 20px;
      }
      hg-icons {
        margin: 20px -15px;
      }
      hg-action-buttons {
        margin-top: 30px;
      }
      @media all and (max-width: 959px) {
        :host, :host([swap]) {
          max-width: 750px;
          flex-direction: column;
        }
        hg-image-slider {
          width: 100%;
          margin: auto;
        }
        .content {
          width: auto;
          margin: 0;
        }
      }
      @media all and (max-width: 599px) {
        :host {
          margin: 60px auto;
        }
        hg-image-slider {
          height: 280px;
        }
      }
      @media all and (max-width: 479px) {
        hg-image-slider {
          height: 200px;
        }
      }
    `];
  }
  async updateData(path, data) {
    updateData('textImage/' + this.uid, path, data);
  }
  render() {
    return html`
      <hg-image-slider
        .path=${staticProp({doc: 'textImage/' + this.uid, field: 'images'})}
        .images=${_.get('images', this._textImage)}
        .noGetImages=${true}>
      </hg-image-slider>
      <div class="content">
        <hg-editable-text
          .ready=${this._dataReady}
          .text=${_.get('heading', this._textImage)}
          @save=${(event) => this.updateData('heading', event.detail)}>
          ${!this.h3 ? html`<h2></h2>` : html`<h3></h3>`}
        </hg-editable-text>
        ${_.isEmpty(this.iconFields) ? '' : html`<hg-icon-info
          .editable=${true}
          .dataReady=${this._dataReady}
          .items=${_.zipWith((text, src) => ({text, src}), _.map(_.get(_, this._textImage), this.iconFields), this.iconSrcs)}
          @save=${(event) => this.updateData(`${this.iconFields[event.detail.index]}`, event.detail.text)}>
        </hg-icon-info>`}
        <hg-editable-text
          .ready=${this._dataReady}
          .rich=${true}
          .richConfig=${'mosaic'}
          multiline
          .text=${_.get('text', this._textImage)}
          @save=${(event) => this.updateData('text', event.detail)}>
          <div class="text ck-content"></div>
        </hg-editable-text>
        ${_.isEmpty(this.buttons) ? '' : html`<hg-action-buttons .buttons=${this.buttons}></hg-action-buttons>`}
      </div>
    `;
  }
});
