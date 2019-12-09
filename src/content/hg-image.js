import {LitElement, html, css} from 'lit-element';
import {db, updateData, updateImage} from "../utils.js";
import '../edit/hg-editable-image.js';

customElements.define('hg-image', class extends LitElement {
  static get properties() {
    return {
      uid: Number,
      _image: Object,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._image = (await db.doc('images/' + this.uid).get()).data() || {};
    })();
  }
  static get styles() {
    return css`
      :host {
        display: block;
        width: 800px;
        margin: auto;
      }
    `;
  }
  async updateImage(file) {
    this._image = await updateImage('images/' + this.uid, null, file, (_.get('name', this._image)));
  }
  render() {
    return html`
      <hg-editable-image
        presize
        .src=${_.get('url', this._image)}
        @save=${(event) => this.updateImage(event.detail)}>
      </hg-editable-image>
    `;
  }
});
