import {LitElement, html, css} from 'lit-element';
import {db} from "./utils.js";

customElements.define('hg-quote', class extends LitElement {
  static get properties() {
    return {
      uid: Number,
      _quote: Object,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._quote = (await db.collection("quotes").doc(this.uid).get()).data();
    })();
  }
  static get styles() {
    return css`
      :host {
        display: block;
        margin: 80px auto;
        max-width: 500px;
        padding: 0 100px;
        font-size: 20px;
        line-height: 1.5em;
        position: relative;
      }
      :host::before {
        z-index: -1;
        content: "";
        position: absolute;
        top: -35px; left: 35px;
        width: 90px;
        height: 90px;
        background: url("/resources/images/quote.png") no-repeat 0 0;
        background-size: 90px 90px;
        filter: opacity(6%);
      }
      .text {
        font-style: italic;
      }
      .author {
        text-align: right;
        font-family: 'Yellowtail', cursive;
        margin-right: 20px;
      }
    `;
  }
  render() {
    return html`
      <div class="text">
        ${_.get('text', this._quote)}
      </div>
      <div class="author">
        ${_.get('author', this._quote)}
      </div>
    `;
  }
});
