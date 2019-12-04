import {LitElement, html, css} from 'lit-element';
import {db} from '../utils.js';
import '../edit/hg-editable-text.js';

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
      this._quote = (await db.doc('quotes/' + this.uid).get()).data();
    })();
  }
  static get styles() {
    return css`
      :host {
        display: block;
        margin: 80px auto;
        max-width: 500px;
        padding: 0 100px;
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
      .author {
        font-size: 20px;
        line-height: 1.5em;
        text-align: right;
        font-family: 'Yellowtail', cursive;
        margin-right: 20px;
      }
    `;
  }
  render() {
    return html`
      <hg-editable-text
        .text=${_.get('text', this._quote)}
        .css=${html`
          <style>
            #text {
              font-size: 20px;
              line-height: 1.5em;
              font-style: italic;
            }
          </style>
        `}
        @save=${(event) => db.doc('quotes/' + this.uid).update({text: event.detail})}>
      </hg-editable-text>
      <div class="author">
        ${_.get('author', this._quote)}
      </div>
    `;
  }
});
