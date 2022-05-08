import {LitElement, html, css} from 'lit';
import sharedStyles from '../../../../styles/shared-styles.js';

export class HgDynamicPathPagesAddHeading extends LitElement {
  static properties = {
  };
  static styles = [sharedStyles, css`
  `];
  render() {
    return html`
      <p class="dialog-subheading">
        <slot></slot>
      </p>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-heading', HgDynamicPathPagesAddHeading);
