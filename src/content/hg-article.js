import {LitElement, html, css} from 'lit-element';
import {db} from '../utils.js';
import '../edit/hg-editable-text.js';

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
      this._text = (await db.doc('articles/' + this.uid).get()).data().text;
    })();
  }
  static get styles() {
    return css`
      :host {
        display: block;
        margin: 80px auto;
        max-width: 700px;
        padding: 0 20px;
      }
    `;
  }
  render() {
    return html`
      <hg-editable-text
        .text=${this._text}
        .css=${html`
          <style>
            #text {
              font-size: 20px;
              line-height: 1.5em;
            }
            #text:not(:focus):first-letter {
              font-size: 3em;
              float: left;
              margin: 0.25em 0.15em 0.15em 0;
            }
          </style>
        `}
        @save=${(event) => db.doc('articles/' + this.uid).update({text: event.detail})}>
      </hg-editable-text>
    `;
  }
});
