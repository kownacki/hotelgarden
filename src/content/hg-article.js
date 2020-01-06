import {LitElement, html, css} from 'lit-element';
import {db} from '../utils.js';
import '../edit/hg-editable-text.js';
import '../elements/hg-content-label.js';
import sharedStyles from "../sharedStyles";

customElements.define('hg-article', class extends LitElement {
  static get properties() {
    return {
      uid: Number,
      narrow: {type: Boolean},
      _text: String,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._text = _.get('text', (await db.doc('articles/' + this.uid).get()).data());
    })();
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        position: relative;
        display: block;
        margin: 80px auto;
        max-width: 700px;
        padding: 0 20px;
      }
      :host([narrow]) {
        margin: 40px auto;
      }
      :host(:hover) hg-content-label {
        left: 20px;
        display: block;
      }
      /* remove it when edited */
      p:not(:focus):first-letter {
        font-size: 3em;
        float: left;
        margin: 0.25em 0.15em 0.15em 0;
      }
    `];
  }
  render() {
    return html`
      <hg-editable-text
        multiline
        .text=${this._text}
        @save=${(event) => db.doc('articles/' + this.uid).set({text: event.detail}, {merge: true})}>
        <p></p>
      </hg-editable-text>
      <hg-content-label .name=${'Pole tekstowe'}></hg-content-label>
    `;
  }
});
