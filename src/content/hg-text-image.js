import {LitElement, html, css} from 'lit-element';
import {db, updateData, updateImage} from "../utils.js";
import '../elements/hg-heading.js';
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
      swap: {type: Boolean},
      iconFields: Array,
      iconSrcs: Array,
      _textImage: Object,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._textImage = (await db.doc('textImage/' + this.uid).get()).data() || {};
    })();
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        max-width: 1250px;
        margin: 60px auto;
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
        margin-top: 40px;
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
          .text=${_.get('heading', this._textImage)}
          @save=${(event) => this.updateData('heading', event.detail)}>
          <hg-heading ?h3=${this.h3}></hg-heading>
        </hg-editable-text>
        ${_.isEmpty(this.iconFields) ? '' : html`<hg-icon-info
          .items=${_.zipWith((text, src) => ({text, src}), _.map(_.get(_, this._textImage), this.iconFields), this.iconSrcs)}
          @save=${(event) => this.updateData(`${this.iconFields[event.detail.index]}`, event.detail.text)}>
        </hg-icon-info>`}
        <hg-editable-text
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
