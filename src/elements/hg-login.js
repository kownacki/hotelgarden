import {LitElement, html, css} from 'lit';
import {FirebaseAuthController} from '../utils/FirebaseAuthController.js';

export class HgLogin extends LitElement {
  _firebaseAuth;
  static properties = {
    _loggedIn: String,
  };
  static styles = css`
    a {
      color: var(--secondary-color);
      filter: brightness(120%); 
    }
    a:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  `;
  constructor() {
    super();
    this._firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this._loggedIn = loggedIn;
    });
  }
  render() {
    return html`
      <a @click=${() => {
        if (auth.currentUser) {
          auth.signOut();
        } else {
          auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        }
      }}>${this._loggedIn ? 'Wyloguj się' : 'Zaloguj się'}</a>
    `;
  }
}
customElements.define('hg-login', HgLogin);
