import {LitElement, html, css} from 'lit-element';
import {db} from "./utils.js";

customElements.define('hg-article', class extends LitElement {
  static get properties() {
    return {
      uid: Number,
      _text: String,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._text = (await db.collection("articles").doc(this.uid).get()).data().text;
    })();
  }
  static get styles() {
    return css`
      article {
        margin: 80px auto;
        max-width: 700px;
        font-size: 20px;
        line-height: 1.5em;
      }
      article:first-letter {
        font-size: 3em;
        float: left;
        margin: 0.25em 0.15em 0.15em 0;
      }
    `;
  }
  render() {
    return html`
      <article>${this._text}</article>
    `;
  }
});
