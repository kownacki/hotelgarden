import {LitElement, html, css} from 'lit';
import {pagesStaticData} from '../../../utils/urlStructure.js';
import {FirebaseAuthController} from '../../utils/FirebaseAuthController.js';

export class HgDrawerItemSubItems extends LitElement {
  _firebaseAuth;
  static properties = {
    links: Array,
    selectedPath: String,
    _loggedIn: Boolean,
  };
  static styles = css`
    :host {
      display: block;
      font-weight: 700;
      font-size: 16px;
    }
    ul {
      margin: 0 0 10px;
      padding: 0;
    }
    a {
      color: inherit;
      display: block;
      text-decoration: none;
      padding: 10px 10px 10px 20px;
      transition: background-color 0.3s ease, color 0.2s ease;
    }
    a[selected] {
      background: var(--primary-color);
      color: white;
    }
  `;
  constructor() {
    super();
    this._firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this._loggedIn = loggedIn;
    });
  }
  render() {
    // todo remove loggedIn check
    const links = this.links
      .filter((link) => {
        if (this._loggedIn) {
          return true;
        }
        return link !== 'summer-bar' && link !== 'pizza-truck';
      })
      .map((link) => pagesStaticData[link]);

    return html`
      <ul>
        ${links.map((link) => html`
          <li>
            <a
              href="${link.path}" 
              ?selected=${link.path === this.selectedPath}
              @click=${() => this.dispatchEvent(new CustomEvent('close-drawer', {composed: true}))}
            >
              ${link.name}
            </a>
          </li>
          `)}
      </ul>
    `;
  }
}
customElements.define('hg-drawer-item-subitems', HgDrawerItemSubItems);
