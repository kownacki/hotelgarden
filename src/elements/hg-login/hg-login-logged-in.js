import {LitElement, html, css} from 'lit';
import {until} from 'lit/directives/until.js';
import sharedStyles from '../../styles/shared-styles.js';
import {authDeferred} from '../../utils/database.js';

export class HgLoginLoggedIn extends LitElement {
  static properties = {
  };
  static styles = [sharedStyles, css`
    a {
      color: var(--surface-dark-color);
      filter: brightness(120%);
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  `];
  render() {
    return html`
      ${until(authDeferred.then(({auth, signOut}) => html`
        <a href="/admin">Panel Admina</a>
        <br>
        <a @click=${() => {signOut(auth)}}>
          Wyloguj się
        </a>
      `))}
    `;
  }
}
customElements.define('hg-login-logged-in', HgLoginLoggedIn);
