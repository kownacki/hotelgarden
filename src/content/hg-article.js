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
      this._text = _.get('text', (await db.doc('articles/' + this.uid).get()).data());
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
      .text {
        font-size: 20px;
        line-height: 1.5em;
      }
      /* remove it when edited */
      .text:not(:focus):first-letter {
        font-size: 3em;
        float: left;
        margin: 0.25em 0.15em 0.15em 0;
      }
    `;
  }
  render() {
    return html`
      <hg-editable-text
        multiline
        .text=${this._text}
        @save=${(event) => db.doc('articles/' + this.uid).set({text: event.detail}, {merge: true})}>
        <div class="text"></div>
      </hg-editable-text>
    `;
  }
});
