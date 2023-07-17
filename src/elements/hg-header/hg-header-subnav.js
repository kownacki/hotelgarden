import {LitElement, html, css} from 'lit';
import {FirebaseAuthController} from '../../utils/FirebaseAuthController.js';
import {pagesStaticData} from '../../../utils/urlStructure.js';

export class HgHeaderSubnav extends LitElement {
  _firebaseAuth;
  static properties = {
    links: Array,
    selected: String,
    _loggedIn: Boolean,
  };
  static styles = css`
    :host {
      --background-color: rgba(var(--surface-color-rgb), 92.5%);
      display: block;
      width: 200px;
      background: var(--background-color);
    }
    :host::before {
      border-right: 7px solid transparent;
      border-bottom: 7px solid var(--background-color);
      border-left: 7px solid transparent;
      content: '';
      top: -7px;
      left: 25px;
      width: 0;
      height: 0;
      margin: 0 auto;
      position: absolute;
    }
    ul {
      padding: 10px 0;
      margin: 0;
    }
    li {
      list-style-type: none;
    }
    a {
      display: block;
      padding: 8px 16px;
      color: var(--on-surface-color);
      text-decoration: none;
    }
    a:hover, a[selected] {
      background: rgba(var(--primary-color-rgb), 90%);
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
        return link !== 'pizza-truck' && link !== 'outdoor-parties' && link !== 'careers';
      })
      .map((link) => pagesStaticData[link]);
    return html`
      <ul>
        ${links.map((link) => html`
          <li>
            <a href="${link.path}" ?selected=${link.path === this.selected}>
              ${link.name}
            </a>
          </li>
        `)}
      </ul>
    `;
  }
}
customElements.define('hg-header-subnav', HgHeaderSubnav);
