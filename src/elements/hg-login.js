import {LitElement, html, css} from 'lit';
import {until} from 'lit/directives/until.js';
import {authDeferred} from '../utils/database.js';
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
      ${until(authDeferred.then(({auth, signOut, signInWithPopup, GoogleAuthProvider}) => html`
        <a @click=${() => {
          if (auth.currentUser) {
            signOut(auth);
          } else {
            signInWithPopup(auth, new GoogleAuthProvider());
          }
        }}>${this._loggedIn ? 'Wyloguj się' : 'Zaloguj się'}</a>
      `))}
    `;
  }
}
customElements.define('hg-login', HgLogin);
