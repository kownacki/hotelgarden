import {LitElement, html, css} from 'lit-element';
import {db, updateData, updateImage} from "../utils.js";
import '../edit/hg-editable-image.js';
import '../edit/hg-editable-text.js';
import '../elements/hg-action-buttons.js';
import '../elements/hg-icon-info.js';
import sharedStyles from "../sharedStyles";

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
    return [sharedStyles, css`
      :host {
        max-width: 1250px;
        margin: 80px auto;
        padding: 0 25px;
        display: flex;
      }
      :host([swap]) {
        flex-direction: row-reverse;
      }
      hg-editable-image {
        width: 50%;
        height: 400px;
      }
      .content {
        width: 50%;
        padding: 30px;
      }
      hg-action-buttons {
        margin-top: 30px;
      }
      @media all and (max-width: 959px) {
        :host, :host([swap]) {
          max-width: 750px;
          flex-direction: column;
        }
        hg-editable-image {
          width: 100%;
          margin: auto;
        }
        .content {
          width: auto;
          padding: 0;
        }
      }
      @media all and (max-width: 599px) {
        :host {
          margin: 60px auto 80px;
        }
        hg-editable-image {
          height: 280px;
        }
      }
      @media all and (max-width: 479px) {
        hg-editable-image {
          height: 200px;
        }
      }
    `];
  }
  async updateData(path, data) {
    updateData('textImage/' + this.uid, path, data);
  }
  async updateImage(file) {
    this._textImage.image = await updateImage('textImage/' + this.uid, 'image', file, (_.get('image.name', this._textImage)));
  }
  render() {
    return html`
      <hg-editable-image
        presize
        .src=${_.get('image.url', this._textImage)}
        .sizing=${'cover'}
        @save=${(event) => this.updateImage(event.detail)}>
      </hg-editable-image>
      <div class="content">
        <hg-editable-text
          .ready=${this._dataReady}
          .text=${_.get('heading', this._textImage)}
          @save=${(event) => this.updateData('heading', event.detail)}>
          ${!this.h3 ? html`<h2></h2>` : html`<h3></h3>`}
        </hg-editable-text>
        ${_.isEmpty(this.iconFields) ? '' : html`<hg-icon-info
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
          <p></p>
        </hg-editable-text>
        ${_.isEmpty(this.buttons) ? '' : html`<hg-action-buttons .buttons=${this.buttons}></hg-action-buttons>`}
      </div>
    `;
  }
});
