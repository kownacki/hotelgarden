import {LitElement, html, css} from 'lit-element';
import './hg-banner.js';
import firebase from "firebase";

customElements.define('hg-event', class extends LitElement {
  static get properties() {
    return {
      uid: String,
      _event: Object,
    };
  }
  constructor() {
    super();
    this._event = {};
  }
  static get styles() {
    return css`      
    `;
  }
  async updated(changedProperties) {
    if (changedProperties.has('uid')) {
      this._event = (await firebase.firestore().collection("events").doc(this.uid).get()).data();
    }
  }
  render() {
    return html`
      <hg-banner
        .src=${this._event.image}
        .heading=${this._event.title}>
      </hg-banner>
      ${this._event.content}
    `;
  }
});
