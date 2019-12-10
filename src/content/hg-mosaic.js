import {LitElement, html, css} from 'lit-element';
import {db, updateData, updateImage} from "../utils.js";
import '../hg-heading.js';
import '../edit/hg-editable-image.js';
import '../edit/hg-editable-text.js';
import '../hg-action-buttons.js';

customElements.define('hg-mosaic', class extends LitElement {
  static get properties() {
    return {
      uid: Number,
      buttons: Object,
      _mosaic: Object,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._mosaic = (await db.doc('mosaics/' + this.uid).get()).data() || {};
    })();
  }
  static get styles() {
    return css`
      :host {
        max-width: 1250px;
        margin: 60px auto;
        padding: 0 25px;
        display: block;
        overflow: auto;
      }
      .left {
        width: calc(40% - 1px);
        margin-right: 1px;
        float: left;
      }
      .right {
        width: 60%;
        float: right;
      }
      .content {
        margin: 40px;
      }
      hg-heading:focus {
        text-transform: initial;
      }
      p {
        font-size: 20px;
      }
      hg-action-buttons {
        margin-top: 40px;
      }
      @media all and (max-width: 900px) {
        .left, .right {
          float: none;
          width: 100%;
        }
      }
    `;
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
      <div class="right">
        <div class="content">
          <hg-editable-text
            .text=${_.get('primary.heading', this._mosaic)}
            @save=${(event) => this.updateData('primary.heading', event.detail)}>
            <hg-heading></hg-heading>
          </hg-editable-text>
          <hg-editable-text
            multiline
            .text=${_.get('primary.text', this._mosaic)}
            @save=${(event) => this.updateData('primary.text', event.detail)}>
            <p></p>
          </hg-editable-text>
          ${!_.get('primary', this.buttons) ? '' : html`<hg-action-buttons .buttons=${this.buttons.primary}></hg-action-buttons>`}
        </div>
      </div>
      <div class="left">
        <hg-editable-image
          presize
          .src=${_.get('primary.image.url', this._mosaic)}
          @save=${(event) => this.updateImage('primary.image', event.detail)}>
        </hg-editable-image>
        <div class="content">
           <hg-editable-text
            .text=${_.get('secondary.heading', this._mosaic)}
            @save=${(event) => this.updateData('secondary.heading', event.detail)}>
            <hg-heading></hg-heading>
          </hg-editable-text>
          <hg-editable-text
            multiline
            .text=${_.get('secondary.text', this._mosaic)}
            @save=${(event) => this.updateData('primary.text', event.detail)}>
            <p></p>
          </hg-editable-text>
          ${!_.get('secondary', this.buttons) ? '' : html`<hg-action-buttons .buttons=${this.buttons.secondary}></hg-action-buttons>`}
        </div>
      </div>
      <div class="right">
        <hg-editable-image
          presize
          .src=${_.get('secondary.image.url', this._mosaic)}
          @save=${(event) => this.updateImage('secondary.image', event.detail)}>
        </hg-editable-image>
      </div>
    `;
  }
});
