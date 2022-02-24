import {LitElement, html, css} from 'lit';
import sharedStyles from "../styles/shared-styles";
import '../edit/hg-editable-text.js';

export class HgQuote extends LitElement {
  static properties = {
    uid: Number,
    _quote: Object,
    _dataReady: Boolean,
  };
  static styles = [sharedStyles, css`
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
  async firstUpdated() {
    this._quote = (await db.doc('quotes/' + this.uid).get()).data();
    this._dataReady = true;
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
}
customElements.define('hg-quote', HgQuote);
