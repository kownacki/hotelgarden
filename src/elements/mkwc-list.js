import {LitElement, html, css} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import {until} from 'lit/directives/until.js';
import {when} from 'lit/directives/when.js';
import sharedStyles from '../styles/shared-styles.js'
import {generateUid} from '../utils.js';
import './mkwc-list/mkwc-list-item.js';

/*
  interface ControlOptions {
    getTemplate: () => unknown,
  }
 */

export default class MkwcList extends LitElement { // <ItemType>
  static properties = {
    // required params
    items: Array, // ItemType[]
    ready: Boolean,
    getItemTemplate: Function, // (item: ItemType, index: number) => unknown
    // optional
    editingEnabled: Boolean,
    controls: Object, // {add?: ControlOptions, delete?: ControlOptions, swap?: ControlOptions, configure?: ControlOptions}
    // private
    _transformedItems: Array, // {uid: string, originalItem: ItemType}[]
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }
    /* Prevent bugs. Iphone adds style tag as host's last child. */
    :host > :not(style) {
      width: calc(100% / var(--mkwc-list-items-columns));
    }
    .add-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `];
  constructor() {
    super();
    this.controls = {};
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
            <mkwc-list-item
              .transformedItem=${transformedItem}
              .editingEnabled=${this.editingEnabled}>
              ${this.getItemTemplate(transformedItem.originalItem, index)}
            </mkwc-list-item>
          `,
        ),
      )}
      ${when(
        this.editingEnabled && this.controls.add,
        () => until(import('./mkwc-list/mkwc-list-add.js').then(() => {
          return html`
            <div class="add-container">
              <mkwc-list-add>
                ${this.controls.add.getTemplate()}
              </mkwc-list-add>
            </div>
          `;
        })),
      )}
    `;
  }
}
customElements.define('mkwc-list', MkwcList);
