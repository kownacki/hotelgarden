import {LitElement, html, css} from 'lit';
import sharedStyles from '../styles/shared-styles.js';
import {FirebaseAuthController} from '../utils/FirebaseAuthController.js';

export class HgContentLabel extends LitElement {
  _firebaseAuth;
  static properties = {
    name: String,
    _loggedIn: Boolean,
  };
  static styles = [sharedStyles, css`
    :host {
      display: none;
      position: absolute;
      bottom: 100%;
      left: 0;
    }
  `];
  constructor() {
    super();
    this._firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this._loggedIn = loggedIn;
    });
    this.classList.add('smaller-text');
  }
  render() {
    return html`
      ${this._loggedIn ? this.name : ''}
    `;
  }
}
customElements.define('hg-content-label', HgContentLabel);
