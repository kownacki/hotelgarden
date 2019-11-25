import {LitElement, html, css} from 'lit-element';
import firebase from 'firebase/app';
import './hg-icons-add.js';

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
      this._icons = _.toArray((await firebase.firestore().collection("iconBlocks").doc(this.uid).get()).data());
    })();
  }
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
      .block {
        width: 130px;
        margin: 10px;
      }
      iron-icon {
        display: block;
        margin: auto;
        width: 60px;
        height: 60px;
        filter: var(--primary-color-filter)
      }
      p {
        text-align: center;
      }
    `;
  }
  render() {
    return html`
      ${_.map((icon) => html`
        <div class="block">
          <iron-icon .src="${icon.url}"></iron-icon>
          <p>${icon.text}</p>
        </div>
      `, this._icons)}
      <hg-icons-add .icons=${this._icons} .uid=${this.uid} @icon-added=${() => {
        this.requestUpdate();
      }}></hg-icons-add>
    `;
  }
});
