import {LitElement, html, css} from 'lit-element';
import '../../edit/hg-delete-item.js';
import './hg-list-item-configure.js';

customElements.define('hg-list-item', class extends LitElement {
  static get properties() {
    return {
      item: Object,
      getItemName: Object,
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
  }
  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
      }
      :host(:hover) .controls, :host([opened]) .controls {
        display: flex;
      }
      :host(:hover) paper-icon-button {
        display: block;
      }
      .controls {
        position: absolute;
        top: 3px;
        right: 10px;
        display: none;
      }
      .controls > * {
        margin: 1px;
      }
      paper-icon-button {
        z-index: 1;
        background: white;
        display: none;
        position: absolute;
        top: calc(50% - 12px);
        width: 24px;
        height: 24px;
        padding: 0;
      }
      .swap-left {
        left: -12px;
      }
      .swap-right {
        right: -12px;
      }
      :host([vertical]) paper-icon-button {
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
  }
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
        ${!this.configure ? '' : html`<hg-list-item-configure 
          .configure=${this.configure}
          .item=${this.item}
          .disable=${this.disableEdit}
          @opened-changed=${(event) => this._configureOpened = event.target.opened}>
        </hg-list-item-configure>`}
        ${this.noDelete ? '' : html`<hg-delete-item
          .disable=${this.disableEdit} 
          .name=${this.getItemName(this.item)} 
          @opened-changed=${(event) => this._deleteOpened = event.target.opened}>
        </hg-delete-item>`}
      </div>
      ${this.noSwap ? '' :
        [(this.first ? '' : html`<paper-icon-button
          class="swap-left"
          .icon=${this.vertical ? 'swap-vert' : 'swap-horiz'}
          ?disabled=${this.disableEdit}
          @click=${() => this.dispatchEvent(new CustomEvent('swap', {detail: -1}))}>
        </paper-icon-button>`),
        (this.last ? '' : html`<paper-icon-button
          class="swap-right"
          .icon=${this.vertical ? 'swap-vert' : 'swap-horiz'}
          ?disabled=${this.disableEdit}
          @click=${() => this.dispatchEvent(new CustomEvent('swap', {detail: +1}))}>
        </paper-icon-button>`)]
      }
    `;
  }
});
