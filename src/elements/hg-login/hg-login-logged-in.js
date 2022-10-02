import {LitElement, html, css} from 'lit';
import {until} from 'lit/directives/until.js';
import {authDeferred} from '../../utils/database.js';

export class HgLoginLoggedIn extends LitElement {
  static properties = {
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
  render() {
    return html`
      ${until(authDeferred.then(({auth, signOut}) => html`
        <a @click=${() => {signOut(auth)}}>
          Wyloguj się
        </a>
      `))}
    `;
  }
}
customElements.define('hg-login-logged-in', HgLoginLoggedIn);
