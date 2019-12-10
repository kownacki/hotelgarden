import {LitElement, html, css} from 'lit-element';
import {db} from './utils.js';
import './edit/hg-editable-text.js';
import './hg-content-label.js';

customElements.define('hg-text', class extends LitElement {
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
      this._text = _.get('text', (await db.doc('texts/' + this.uid).get()).data());
    })();
  }
  static get styles() {
    return css`      
    `;
  }
  render() {
    return html`
      <hg-editable-text
        .text=${this._text}
        @save=${(event) => db.doc('texts/' + this.uid).set({text: event.detail})}>
        <slot></slot>
      </hg-editable-text>
    `;
  }
});
