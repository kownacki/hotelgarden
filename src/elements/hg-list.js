import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';
import {repeat} from 'lit/directives/repeat.js';
import sharedStyles from '../styles/shared-styles.js'
import {generateUid} from '../utils.js';
import './hg-list/hg-list-item.js';

export default class HgList extends LitElement {
  static properties = {
    // required params
    items: Array, // ItemType[]
    ready: Boolean,
    getItemTemplate: Function, // (item: ItemType, index: number) => unknown
    // optional
    controls: Object, // {add: boolean, delete: boolean, swap: boolean, configure: boolean}
    // private
    _transformedItems: Array, // {uid: string, originalItem: ItemType}[]
  };
  static styles = [sharedStyles, css`
  `];
  constructor() {
    super();
  }
  willUpdate(changedProperties) {
    if (changedProperties.has('items')) {
      this._transformedItems = this.items.map((item) => {
        return {
          uid: generateUid(),
          originalItem: item,
        };
      });
    }
  }
  render() {
    return html`
      ${when(
        this.ready,
        () => repeat(
          this._transformedItems,
          (transformedItem) => transformedItem.uid,
          (transformedItem, index) => html`
            <hg-list-item
              .transformedItem=${transformedItem}>
              ${this.getItemTemplate(transformedItem.originalItem, index)}
            </hg-list-item>
          `,
        ),
      )}
    `;
  }
}
customElements.define('hg-list', HgList);
