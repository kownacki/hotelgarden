import {LitElement, html, css} from 'lit-element';
import {db} from "./utils.js";

customElements.define('hg-text-image', class extends LitElement {
  static get properties() {
    return {
      uid: Number,
      _textImage: Object,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._textImage = (await db.collection("textImage").doc(this.uid).get()).data();
    })();
  }
  static get styles() {
    return css`
      :host {
        font-size: 20px;
        max-width: 1250px;
        margin: 30px auto 0;
        padding: 25px;
        display: flex;
      }
      h2 {
        margin-top: 0;
        font-weight: 300;
        font-size: 40px;
        text-transform: uppercase;
      }
      iron-image {
        width: 50%;
        height: 400px;
      }
      .content {
        width: 50%;
        padding: 30px;
      }
      .buttons {
        margin-top: 40px;
        display: flex;
      }
      a {
        text-decoration: none;
        color: white;
        background: var(--accent-color);
        padding: 10px 20px;
        margin-right: 30px;
      }
    `;
  }
  render() {
    return html`
      <iron-image .src=${_.get('image', this._textImage)} .sizing=${'cover'}></iron-image>
      <div class="content">
        <h2>${_.get('heading', this._textImage)}</h2>
        <p>${_.get('text', this._textImage)}</p>   
        <div class="buttons">
          <a href="#">Pulvinar</a>
          <a href="#">Ante ipsum</a>
        </div>       
      </div>
    `;
  }
});
