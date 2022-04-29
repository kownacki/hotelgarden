import {LitElement, html, css} from 'lit';
import sharedStyles from '../../styles/shared-styles.js'

export default class MkwcListItem extends LitElement {
  static properties = {
    itemData: Object, // ItemDataType
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
