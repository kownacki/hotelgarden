import {LitElement, html, css} from 'lit-element';
import {db, updateImage} from "../utils";
import '../edit/hg-editable-text.js';

customElements.define('hg-banner', class extends LitElement {
  static get properties() {
    return {
      uid: String,
      doc: String,
      useTitleAsHeading: String,
      noSubheading: Boolean,
      _banner: Object,
    };
  }
  constructor() {
    super();
  }
  async updated(changedProperties) {
    if (changedProperties.has('uid')) {
      this.doc = 'banners/' + this.uid;
    }
    if (changedProperties.has('doc')) {
      this._banner = (await db.doc(this.doc).get()).data() || {};
    }
  }
  static get styles() {
    return css`
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
        box-shadow: inset 0 150px 150px rgba(0, 0, 0, 0.5);
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
        font-weight: 300;
        font-size: 50px;
        margin: 10px;
        color: white;
      }
      p {
        font-weight: 300;
        font-size: 18px;
        margin: 10px;
        color: white;
      }
    `;
  }
  render() {
    return html`
      <hg-editable-image
        lower-image
        .src=${_.get('image.url', this._banner)}
        .sizing=${'cover'}
        @save=${async (event) => {
          this._banner.image = await updateImage(this.doc, 'image', event.detail, (_.get('image.name', this._banner)));
        }}>
      </hg-editable-image>
      <div class="heading">
        <hg-editable-text
          .text=${_.get(this.useTitleAsHeading ? 'title' : 'heading', this._banner) || ''}
          @save=${(event) => db.doc(this.doc).set({[this.useTitleAsHeading ? 'title' : 'heading']: event.detail}, {merge: true})}>
          <h1></h1>
        </hg-editable-text>
        ${this.noSubheading ? '' : html`<hg-editable-text
          .text=${_.get('subheading', this._banner) || ''}
          @save=${(event) => db.doc(this.doc).set({subheading: event.detail}, {merge: true})}>
          <p></p>
        </hg-editable-text>`}
      </div>
    `;
  }
});
