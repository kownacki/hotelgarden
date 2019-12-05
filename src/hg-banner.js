import {LitElement, html, css} from 'lit-element';
import {db} from "./utils";
import './edit/hg-editable-text.js';

customElements.define('hg-banner', class extends LitElement {
  static get properties() {
    return {
      uid: String,
      src: String,
      heading: String,
      subheading: String,
      _banner: String,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      if (!this.heading) {
        this._banner = (await db.doc('banners/' + this.uid).get()).data();
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
      iron-image {
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: -1;
      }
      .heading {
        background: rgba(var(--secondary-color-rgb), 0.30);
        padding: 20px;
        width: 1000px;
        max-width: 100%;
        margin: auto auto 0;
        text-align: center;
        text-transform: uppercase;
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
      <iron-image .src=${this.src} .sizing=${'cover'}></iron-image>
      <div class="heading">
        ${this.heading ? html`<h1>${this.heading}</h1>`
          : html`<hg-editable-text
            .text=${_.get('heading', this._banner)}
            @save=${(event) => db.doc('banners/' + this.uid).update({heading: event.detail})}>
            <h1></h1>
          </hg-editable-text>
        `}
        ${this.heading 
          ? (this.subheading ? html`<p>${this.subheading}</p>` : '')
          : html`<hg-editable-text
            .text=${_.get('subheading', this._banner)}
            @save=${(event) => db.doc('banners/' + this.uid).update({subheading: event.detail})}>
            <p></p>
          </hg-editable-text>
        `}
      </div>
    `;
  }
});
