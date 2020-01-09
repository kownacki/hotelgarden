import {LitElement, html, css} from 'lit-element';
import {db, updateImage, updateData} from "../utils";
import '../edit/hg-editable-text.js';
import sharedStyles from '../sharedStyles';

customElements.define('hg-banner', class extends LitElement {
  static get properties() {
    return {
      uid: String,
      path: Object,
      useTitleAsHeading: String,
      noImage: {type: Boolean, reflect: true, attribute: 'no-image'},
      noSubheading: Boolean,
      _banner: Object,
    };
  }
  constructor() {
    super();
  }
  async updated(changedProperties) {
    if (changedProperties.has('uid')) {
      this.path = {doc: 'banners/' + this.uid};
    }
    if (changedProperties.has('path')) {
      const doc = (await db.doc(this.path.doc).get()).data();
      this._banner = (this.path.field ? _.get(this.path.field, doc) : doc) || {};
    }
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        height: 100vh;
        display: flex;
      }
      hg-editable-image {
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
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
    `];
  }
  updateImage(path, data, oldImageName) {
    return updateImage(this.path.doc, `${this.path.hasOwnProperty('field') ? `${this.path.field}.` : ''}${path}`, data, oldImageName)
  }
  updateData(path, data) {
    updateData(this.path.doc, `${this.path.hasOwnProperty('field') ? `${this.path.field}.` : ''}${path}`, data)
  }
  render() {
    return html`
      ${this.noImage ? '' : html`<hg-editable-image
        lower-image
        .src=${_.get('image.url', this._banner)}
        .sizing=${'cover'}
        @save=${async (event) => {
          this._banner.image = await this.updateImage('image', event.detail, (_.get('image.name', this._banner)));
        }}>
      </hg-editable-image>`}
      <div class="heading">
        <hg-editable-text
          .text=${_.get(this.useTitleAsHeading ? 'title' : 'heading', this._banner) || ''}
          @save=${(event) => this.updateData(this.useTitleAsHeading ? 'title' : 'heading', event.detail)}>
          <h1></h1>
        </hg-editable-text>
        ${this.noSubheading ? '' : html`<hg-editable-text
          .text=${_.get('subheading', this._banner) || ''}
          @save=${(event) => this.updateData('subheading', event.detail)}>
          <p></p>
        </hg-editable-text>`}
      </div>
    `;
  }
});
