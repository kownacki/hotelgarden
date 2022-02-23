import {LitElement, html, css} from 'lit';

export class HgLogin extends LitElement {
  static properties = {
    _loggedIn: String,
  };
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
    auth.onAuthStateChanged((user) => this._loggedIn = Boolean(user));
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
