import {LitElement, html, css} from 'lit';
import {until} from 'lit/directives/until.js';

export class HgListOldItem extends LitElement {
  static properties = {
    item: Object,
    getItemName: Function,
    first: Boolean,
    last: Boolean,
    noSwap: Boolean,
    noDelete: Boolean,
    vertical: {type: Boolean, reflect: true},
    disableControls: Boolean,
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
      right: 3px;
    }
    .controls-top > * {
      margin: 1px;
    }
    hg-list-old-item-swap {
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
    :host([vertical]) hg-list-old-item-swap {
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
    @media all and (max-width: 959px) {
      .controls {
        display: block;
      }
    }
  `;
  updated(changedProperties) {
    if (changedProperties.has('_deleteOpened') || changedProperties.has('_configureOpened')) {
      this.opened = this._deleteOpened || this._configureOpened;
    }
    // todo make wrapper element for slot allowing passing properties instead of this workaround
    // if (changedProperties.has('disableControls')) {
    //   let slotted = this.querySelector('*');
    //   if (slotted) {
    //     while (slotted.tagName === 'SLOT') {
    //       slotted = slotted.assignedElements()[0];
    //     }
    //     slotted.disableControls = this.disableControls;
    //   }
    // }
  }
  render() {
    return html`
      <slot></slot>
      <div class="controls">
        <div class="controls-top">
          ${!this.configure ? '' : until(import('./hg-list-old-item-configure.js').then(() => {
            return html`
              <hg-list-old-item-configure
                .configure=${this.configure}
                .item=${this.item}
                .itemName=${this.getItemName(this.item)}
                .disabled=${this.disableControls}
                @opened-changed=${(event) => this._configureOpened = event.target.opened}>
              </hg-list-old-item-configure>
            `;
          }))}
          ${this.noDelete ? '' : until(import('../../edit/hg-delete-item.js').then(() => {
            return html`
              <hg-delete-item
                .disabled=${this.disableControls}
                .name=${this.getItemName(this.item)}
                @opened-changed=${(event) => this._deleteOpened = event.target.opened}>
              </hg-delete-item>
            `;
          }))}
        </div>
        ${this.noSwap ? '' : until(import('./hg-list-old-item-swap.js').then(() => {
          return [
            (this.first ? '' : html`
              <hg-list-old-item-swap
                class="swap-left"
                .disabled=${this.disableControls}
                .vertical=${this.vertical}
                @click=${() => this.dispatchEvent(new CustomEvent('swap', {detail: -1}))}>
              </hg-list-old-item-swap>
            `),
            (this.last ? '' : html`
              <hg-list-old-item-swap
                class="swap-right"
                .disabled=${this.disableControls}
                .vertical=${this.vertical}
                @click=${() => this.dispatchEvent(new CustomEvent('swap', {detail: +1}))}>
              </hg-list-old-item-swap>
            `)
          ];
        }))}
      </div>
    `;
  }
}
customElements.define('hg-list-old-item', HgListOldItem);
