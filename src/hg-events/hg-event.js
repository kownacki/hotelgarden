import {LitElement, html, css} from 'lit-element';
import '../hg-banner.js';
import firebase from "firebase";

customElements.define('hg-event', class extends LitElement {
  static get properties() {
    return {
      uid: String,
      _event: Object,
      _content: String,
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
      firebase.firestore().collection('events').doc(this.uid).get().then((snapshot) => this._event = snapshot.data());
      this._content = (await firebase.firestore().collection('eventsContents').doc(this.uid).get()).get('content');
    }
  }
  render() {
    return html`
      <hg-banner
        .src=${this._event.image}
        .heading=${this._event.title}>
      </hg-banner>
      ${this._content}
    `;
  }
});
