import {LitElement, html, css} from 'lit';
import 'mkwc/mkwc-loading-dots.js';

export class HgPageLoading extends LitElement {
  static properties = {
  };
  static styles = css`
    :host {
      display: block;
      height: 500px;
    }
    mkwc-loading-dots {
      height: 100%;
    }
  `;
  render() {
    return html`
      <mkwc-loading-dots></mkwc-loading-dots>
    `;
  }
}
customElements.define('hg-page-loading', HgPageLoading);
