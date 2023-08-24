import {LitElement, html, css} from 'lit';
import {FirebaseAuthController} from '../../utils/FirebaseAuthController.js';

export class HgHeaderSubnav extends LitElement {
  _firebaseAuth;
  static properties = {
    subitems: Array, // { name: string, path: string }[]
    selectedSubitemIndex: Number,
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
    return html`
      <ul>
        ${this.subitems.map((subitem, index) => {
          const { path, name } = subitem;

          return html`
            <li>
              <a href="${path}" ?selected=${index === this.selectedSubitemIndex}>
                 ${name}
              </a>
            </li>
          `;
        })}
      </ul>
    `;
  }
}
customElements.define('hg-header-subnav', HgHeaderSubnav);
