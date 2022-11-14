import {LitElement, html, css} from 'lit';
import sharedStyles from '../styles/shared-styles.js';

export class HgAdmin extends LitElement {
  static styles = [sharedStyles, css`
    :host {
      max-width: 1000px;
      display: block;
      margin: 40px auto;
      padding: 0 20px;
    }
  `];
  render() {
    return html`
      test
    `;
  }
}
customElements.define('hg-admin', HgAdmin);
