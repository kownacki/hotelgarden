import {LitElement, html, css} from 'lit';
import sharedStyles from '../styles/shared-styles.js';

export class HgContentLabel extends LitElement {
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
    this._unsubscribeLoggedInListener = auth.onAuthStateChanged((user) => this._loggedIn = Boolean(user));
    this.classList.add('smaller-text');
  }
  disconnectedCallback() {
    this._unsubscribeLoggedInListener();
    return super.disconnectedCallback();
  }
  render() {
    return html`
      ${this._loggedIn ? this.name : ''}
    `;
  }
}
customElements.define('hg-content-label', HgContentLabel);
