import {LitElement, html, css} from 'lit';
import sharedStyles from '../styles/shared-styles.js';
import '../elements/hg-icons.js'
import '../elements/hg-content-label.js';

export class HgContentIcons extends LitElement {
  static properties = {
    uid: String,
    small: {type: Boolean, reflect: true},
  };
  static get styles() {
    return [sharedStyles, css`
      :host {
        position: relative;
        display: block;
        margin: 60px auto;
        padding: 0 10px;
        max-width: 1240px;
      }
      :host([small]) {
        padding: 0 20px;
        margin: 40px auto;
      }
      :host(:hover) hg-content-label {
        display: block;
      }
      @media (max-width: 959px) {
        :host {
          max-width: 750px;
        }
      }
    `];
  }
  render() {
    return html`
      <hg-icons .small=${this.small} .uid=${this.uid}></hg-icons>
      <hg-content-label .name=${'Ikony'}></hg-content-label>
    `;
  }
}
customElements.define('hg-content-icons', HgContentIcons);
