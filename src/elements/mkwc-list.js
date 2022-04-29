import {LitElement, html, css} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import {until} from 'lit/directives/until.js';
import {when} from 'lit/directives/when.js';
import sharedStyles from '../styles/shared-styles.js'
import './mkwc-list/mkwc-list-item.js';

/*
  interface ControlOptions {
    getTemplate: () => unknown,
  }
  interface AddControlOptions extends ControlOptions {
    createNewItem: () => unknown,
  }
 */

export default class MkwcList extends LitElement { // <ItemDataType>
  static properties = {
    // required params
    items: Array, // {uid: string, data: ItemDataType}[]
    ready: Boolean,
    getItemTemplate: Function, // (itemData: ItemDataType, index: number) => unknown
    // optional
    editingEnabled: Boolean,
    controls: Object, // {add?: AddControlOptions, delete?: ControlOptions, swap?: ControlOptions, configure?: ControlOptions}
    // observables
    processing: Boolean,
    // private
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
  render() {
    return html`
      ${when(
        this.ready,
        () => repeat(
          this.items,
          (item) => item.uid,
          (item, index) => html`
            <mkwc-list-item
              .item=${item}
              .editingEnabled=${this.editingEnabled}>
              ${this.getItemTemplate(item.data, index)}
            </mkwc-list-item>
          `,
        ),
      )}
      ${when(
        this.editingEnabled && this.controls.add,
        () => until(import('./mkwc-list/mkwc-list-add.js').then(() => {
          return html`
            <div class="add-container">
              <mkwc-list-add
                @click=${async () => {
                  this.processing = true;
                  const newItem = await this.controls.add.createNewItem();
                  const newItems = [...this.items, newItem];
                  this.dispatchEvent(new CustomEvent('request-items-change', {detail: newItems}));
                  this.processing = false;
                }}>
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
