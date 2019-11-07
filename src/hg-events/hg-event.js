import {LitElement, html, css} from 'lit-element';
import firebase from "firebase";
import '../hg-banner.js';
import './hg-events-sidebar.js';

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
      .container {
        display: flex;
        max-width: 1300px;
        margin: auto;
        padding: 20px;
      }
      .content {
        flex: 1;
      }
      hg-events-sidebar {
      }
    `;
  }
  async updated(changedProperties) {
    if (changedProperties.has('uid')) {
      firebase.firestore().collection('events').doc(this.uid).get()
        .then((snapshot) => this._event = {...snapshot.data(), address: snapshot.id});
      this._content = (await firebase.firestore().collection('eventsContents').doc(this.uid).get()).get('content');
    }
  }
  render() {
    return html`
      <hg-banner
        .src=${this._event.image}
        .heading=${this._event.title}>
      </hg-banner>
      <div class="container">
        <div class="content">${this._content}</div>
        <hg-events-sidebar .selected=${this._event.address}></hg-events-sidebar>
      </div>
    `;
  }
});
