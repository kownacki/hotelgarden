import {LitElement, html, css} from 'lit';
import sharedStyles from '../../../../styles/shared-styles.js';

export class HgDynamicPathPagesAddTip extends LitElement {
  static properties = {
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
      background: rgba(var(--secondary-color-rgb), 20%);
      padding: 2px 20px;
    }
  `];
  render() {
    return html`
      <div class="smaller-text">
        <slot></slot>
      </div>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-tip', HgDynamicPathPagesAddTip);
