import {LitElement, html, css} from 'lit';
import sharedStyles from '../../../../styles/shared-styles.js';

export class HgDynamicPathPagesAddDialogSubheading extends LitElement {
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
customElements.define('hg-dynamic-path-pages-add-dialog-subheading', HgDynamicPathPagesAddDialogSubheading);
