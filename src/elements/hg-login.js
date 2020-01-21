import {LitElement, html, css} from 'lit-element';
import firebase from 'firebase/app';

customElements.define('hg-login', class extends LitElement {
  static get properties() {
    return {
      _loggedIn: String,
    };
  }
  static get styles() {
    return css`
      a {
        color: var(--secondary-color);
        filter: brightness(120%); 
      }
      a:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    `;
  }
  constructor() {
    super();
    firebase.auth().onAuthStateChanged((user) => this._loggedIn = Boolean(user));
  }
  render() {
    return html`
      <a @click=${() => {
        if (firebase.auth().currentUser) {
          firebase.auth().signOut();
        } else {
          firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
        }
      }}>${this._loggedIn ? 'Wyloguj się' : 'Zaloguj się'}</a>
    `;
  }
});
