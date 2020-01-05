import {LitElement, html, css} from 'lit-element';
import sharedStyles from '../sharedStyles.js'

customElements.define('hg-heading', class extends LitElement {
  static get properties() {
    return {
      center: {type: Boolean, reflect: true},
      h3: {type: Boolean},
      h4: {type: Boolean},
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
        margin-bottom: 30px;
        text-transform: uppercase;
      }
      :host([h3]) {
        margin-bottom: 27px;
      }
      :host([h4]) {
        margin-bottom: 24px;
      }
      :host([center]) {
        text-align: center;
        margin: 60px 0;
      }
      :host([center][h3]) {
        margin: 40px 0;
      }
      h2, h3, h4 {
        margin: 0;
      }
    `];
  }
  render() {
    return html`
      ${this.h4
        ? html`<h4 id="editable"><slot></slot></h4>`
        : this.h3
        ? html`<h3 id="editable"><slot></slot></h3>`
        : html`<h2 id="editable"><slot></slot></h2>`}
    `;
  }
});
