import {LitElement, html, css} from 'lit';
import sharedStyles from '../../styles/shared-styles.js'

export default class MkwcListItem extends LitElement {
  static properties = {
    transformedItem: Object, // {uid: string, originalItem: ItemType}
  };
  static styles = [sharedStyles, css`
  `];
  constructor() {
    super();
  }
  render() {
    return html`
      <slot></slot>
    `;
  }
}
customElements.define('mkwc-list-item', MkwcListItem);
