import {LitElement, html, css} from 'lit-element';
import {db, updateImage} from "./utils";
import './edit/hg-editable-text.js';

customElements.define('hg-banner', class extends LitElement {
  static get properties() {
    return {
      uid: String,
      heading: String,
      subheading: String,
      image: String,
      _banner: Object,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      if (!this.heading) {
        this._banner = (await db.doc('banners/' + this.uid).get()).data() || {};
      }
    })();
  }
  static get styles() {
    return css`
      :host {
        box-shadow: inset 0 50px 50px rgba(80, 80, 80, 0.50);
        height: 100vh;
        display: flex;
      }
      hg-editable-image {
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
      }
      .heading {
        background: rgba(var(--secondary-color-rgb), 0.30);
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
        .src=${_.get('image.url', this._banner)}
        .sizing=${'cover'}
        @save=${async (event) => {
          this._banner.image = await updateImage('banners/' + this.uid, 'image', event.detail, (_.get('image.name', this._banner)));
        }}>
      </hg-editable-image>
      <div class="heading">
        ${this.heading 
          ? html`<h1>${this.heading}</h1>`
          : html`<hg-editable-text
            .text=${_.get('heading', this._banner)}
            @save=${(event) => db.doc('banners/' + this.uid).set({heading: event.detail}, {merge: true})}>
            <h1></h1>
          </hg-editable-text>
        `}
        ${this.heading 
          ? (this.subheading ? html`<p>${this.subheading}</p>` : '')
          : html`<hg-editable-text
            .text=${_.get('subheading', this._banner)}
            @save=${(event) => db.doc('banners/' + this.uid).set({subheading: event.detail}, {merge: true})}>
            <p></p>
          </hg-editable-text>
        `}
      </div>
    `;
  }
});
