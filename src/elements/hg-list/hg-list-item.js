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
        top: 15px;
        right: 15px;
        display: none;
      }
      .controls > * {
        margin: 1px;
      }
      paper-icon-button {
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
        <hg-delete-item
          .disable=${this.disableEdit} 
          .name=${this.getItemName(this.item)} 
          @opened-changed=${(event) => this._deleteOpened = event.target.opened}>
        </hg-delete-item>
      </div>
      ${this.noSwap ? '' :
        [(this.first ? '' : html`<paper-icon-button
          class="swap-left"
          icon="swap-horiz"
          ?disabled=${this.disableEdit}
          @click=${() => this.dispatchEvent(new CustomEvent('swap', {detail: -1}))}>
        </paper-icon-button>`),
        (this.last ? '' : html`<paper-icon-button
          class="swap-right"
          icon="swap-horiz"
          ?disabled=${this.disableEdit}
          @click=${() => this.dispatchEvent(new CustomEvent('swap', {detail: +1}))}>
        </paper-icon-button>`)]
      }
    `;
  }
});
