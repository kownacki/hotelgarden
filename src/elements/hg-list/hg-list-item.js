import {LitElement, html, css} from 'lit';
import sharedStyles from '../../styles/shared-styles.js'

export default class HgListItem extends LitElement {
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
customElements.define('hg-list-item', HgListItem);
