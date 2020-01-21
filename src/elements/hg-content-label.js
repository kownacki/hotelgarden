import {LitElement, html, css} from 'lit-element';
import firebase from "firebase";

customElements.define('hg-content-label', class extends LitElement {
  static get properties() {
    return {
      name: String,
      _loggedIn: Boolean,
    };
  }
  static get styles() {
    return css`
      :host {
        display: none;
        position: absolute;
        bottom: 100%;
        left: 0;
      }
    `;
  }
  constructor() {
    super();
    this._unsubscribeLoggedInListener = firebase.auth().onAuthStateChanged((user) => this._loggedIn = Boolean(user));
  }
  disconnectedCallback() {
    this._unsubscribeLoggedInListener();
    return super.disconnectedCallback();
  }
  render() {
    return html`
      ${this._loggedIn ? this.name : ''}
    `;
  }
});
