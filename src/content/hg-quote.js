import {LitElement, html, css} from 'lit';
import sharedStyles from "../styles/shared-styles";
import '../edit/hg-editable-text.js';

customElements.define('hg-quote', class extends LitElement {
  static get properties() {
    return {
      uid: Number,
      _quote: Object,
      _dataReady: Boolean,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._quote = (await db.doc('quotes/' + this.uid).get()).data();
      this._dataReady = true;
    })();
  }
  static get styles() {
    return [sharedStyles, css`
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
        top: -35px; 
        left: 35px;
        width: 90px;
        height: 90px;
        background: url("/resources/images/quote.png") no-repeat 0 0;
        background-size: 90px 90px;
        filter: opacity(6%);
      }
      p {
        font-style: italic;
      }
      .author {
        font-size: 20px;
        text-align: right;
        font-family: 'Yellowtail', cursive;
        margin-right: 20px;
      }
      @media all and (max-width: 599px) {
        :host {
          padding: 0 40px;
        }
        :host:before {
          left: 10px;
        }
      }
    `];
  }
  render() {
    return html`
      <hg-editable-text
        .ready=${this._dataReady}
        .text=${_.get('text', this._quote)}
        @save=${(event) => db.doc('quotes/' + this.uid).set({text: event.detail}, {merge: true})}>
        <p></p>
      </hg-editable-text>
      <hg-editable-text
        .ready=${this._dataReady}
        .text=${_.get('author', this._quote)}
        @save=${(event) => db.doc('quotes/' + this.uid).set({author: event.detail}, {merge: true})}>
        <div class="author"></div>
      </hg-editable-text>
    `;
  }
});
