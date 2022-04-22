import {LitElement, html, css} from 'lit';
import {until} from 'lit/directives/until.js';

export class HgListItem extends LitElement {
  static properties = {
    item: Object,
    getItemName: Function,
    first: Boolean,
    last: Boolean,
    noSwap: Boolean,
    noDelete: Boolean,
    vertical: {type: Boolean, reflect: true},
    disableEdit: Boolean,
    opened: {type: Boolean, reflect: true},
    configure: Object,
    _deleteOpened: Boolean,
    _configureOpened: Boolean,
  };
  static styles = css`
    :host {
      display: block;
      position: relative;
    }
    .controls {
      display: none;
    }
    :host(:hover) .controls, :host([opened]) .controls {
      display: block;
    }
    .controls-top {
      display: flex;
      position: absolute;
      top: 3px;
      right: 10px;
    }
    .controls-top > * {
      margin: 1px;
    }
    hg-list-item-swap {
      z-index: 1;
      position: absolute;
      top: calc(50% - 12px);
    }
    .swap-left {
      left: -12px;
    }
    .swap-right {
      right: -12px;
    }
    :host([vertical]) hg-list-item-swap {
      top: auto;
      left: calc(50% - 12px);
    }
    :host([vertical]) .swap-left {
      top: -12px;
    }
    :host([vertical]) .swap-right {
      right: auto;
      bottom: -12px;
    }
  `;
  updated(changedProperties) {
    if (changedProperties.has('_deleteOpened') || changedProperties.has('_configureOpened')) {
      this.opened = this._deleteOpened || this._configureOpened;
    }
    // todo make wrapper element for slot allowing passing properties instead of this workaround
    // if (changedProperties.has('disableEdit')) {
    //   let slotted = this.querySelector('*');
    //   if (slotted) {
    //     while (slotted.tagName === 'SLOT') {
    //       slotted = slotted.assignedElements()[0];
    //     }
    //     slotted.disableEdit = this.disableEdit;
    //   }
    // }
  }
  render() {
    return html`
      <slot></slot>
      <div class="controls">
        <div class="controls-top">
          ${!this.configure ? '' : until(import('./hg-list-item-configure.js').then(() => {
            return html`
              <hg-list-item-configure
                .configure=${this.configure}
                .item=${this.item}
                .disabled=${this.disableEdit}
                @opened-changed=${(event) => this._configureOpened = event.target.opened}>
              </hg-list-item-configure>
            `;
          }))}
          ${this.noDelete ? '' : until(import('../../edit/hg-delete-item.js').then(() => {
            return html`
              <hg-delete-item
                .disabled=${this.disableEdit}
                .name=${this.getItemName(this.item)}
                @opened-changed=${(event) => this._deleteOpened = event.target.opened}>
              </hg-delete-item>
            `;
          }))}
        </div>
        ${this.noSwap ? '' : until(import('./hg-list-item-swap.js').then(() => {
          return [
            (this.first ? '' : html`
              <hg-list-item-swap
                class="swap-left"
                .disabled=${this.disableEdit}
                .vertical=${this.vertical}
                @click=${() => this.dispatchEvent(new CustomEvent('swap', {detail: -1}))}>
              </hg-list-item-swap>
            `),
            (this.last ? '' : html`
              <hg-list-item-swap
                class="swap-right"
                .disabled=${this.disableEdit}
                .vertical=${this.vertical}
                @click=${() => this.dispatchEvent(new CustomEvent('swap', {detail: +1}))}>
              </hg-list-item-swap>
            `)
          ];
        }))}
      </div>
    `;
  }
}
customElements.define('hg-list-item', HgListItem);
