import {LitElement, html, css} from 'lit';
import sharedStyles from '../../../../styles/shared-styles.js';

export class HgDynamicPathPagesAddHeading extends LitElement {
  static properties = {
  };
  static styles = [sharedStyles, css`
    :host {
      font-weight: 700;
    }
  `];
  render() {
    return html`
      <p class="smaller-text">
        <slot></slot>
      </p>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-heading', HgDynamicPathPagesAddHeading);
