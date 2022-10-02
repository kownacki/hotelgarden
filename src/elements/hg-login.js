import {LitElement, html, css} from 'lit';
import {until} from 'lit/directives/until.js';
import {when} from 'lit/directives/when.js';
import {authDeferred} from '../utils/database.js';
import {FirebaseAuthController} from '../utils/FirebaseAuthController.js';
import './hg-login/hg-login-logged-in.js';

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
        ${until(authDeferred.then(({auth, signInWithPopup, GoogleAuthProvider}) => html`
        ${when(
          this._loggedIn,
          () => html`<hg-login-logged-in></hg-login-logged-in>`,
          () => html`
            <a @click=${() => {
              signInWithPopup(auth, new GoogleAuthProvider());
            }}>
              Zaloguj się
            </a>
          `,
        )}
      `))}
    `;
  }
}
customElements.define('hg-login', HgLogin);
