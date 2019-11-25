import {LitElement, html, css} from 'lit-element';
import {db} from "../utils.js";
import './hg-icons-add.js';
import './hg-icons-item.js';

customElements.define('hg-icons', class extends LitElement {
  static get properties() {
    return {
      uid: Number,
      _icons: Array,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._icons = _.toArray((await db.collection("iconBlocks").doc(this.uid).get()).data());
    })();
  }
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    `;
  }
  render() {
    return html`
      ${_.map((icon) => html`
        <hg-icons-item .icon=${icon}></hg-icons-item>
      `, this._icons)}
      <hg-icons-add .icons=${this._icons} .uid=${this.uid} @icon-added=${() => {
        this.requestUpdate();
      }}></hg-icons-add>
    `;
  }
});
