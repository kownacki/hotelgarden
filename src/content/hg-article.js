import {LitElement, html, css} from 'lit-element';
import {db} from '../utils.js';
import '../edit/hg-editable-text.js';
import '../elements/hg-content-label.js';
import sharedStyles from "../sharedStyles";

export default class HgArticle extends LitElement {
  static get properties() {
    return {
      uid: Number,
      rich: Boolean,
      _text: String,
      _dataReady: Boolean,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._text = _.get('text', (await db.doc('articles/' + this.uid).get()).data());
      this._dataReady = true;
    })();
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        position: relative;
        display: block;
        margin: 40px auto;
        max-width: 700px;
        padding: 0 20px;
      }
      :host(:hover) hg-content-label {
        left: 20px;
        display: block;
      }
    `];
  }
  render() {
    return html`
      <hg-editable-text
        .ready=${this._dataReady}
        .rich=${this.rich}
        multiline
        .text=${this._text}
        @save=${(event) => {
          this._text = event.detail;
          db.doc('articles/' + this.uid).set({text: event.detail}, {merge: true})}
        }>
        <p></p>
      </hg-editable-text>
      <hg-content-label .name=${'Pole tekstowe'}></hg-content-label>
    `;
  }
}
customElements.define('hg-article', HgArticle);
