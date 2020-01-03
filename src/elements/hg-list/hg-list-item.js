import {LitElement, html, css} from 'lit-element';
import '../../edit/hg-delete-item.js';

customElements.define('hg-list-item', class extends LitElement {
  static get properties() {
    return {
      first: Boolean,
      last: Boolean,
      disableEdit: Boolean,
      opened: {type: Boolean, reflect: true},
      _deleteOpened: Boolean,
      _editOpened: Boolean,
    };
  }
  static get styles() {
    return css`
      :host {
        position: relative;
      }
      hg-delete-item  {
        position: absolute;
        right: 15px;
        top: 15px;
        display: none;
        flex-direction: column;
      }
      :host(:hover) hg-delete-item, :host([opened]) hg-delete-item, :host(:hover) paper-icon-button {
        display: block;
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
    if (changedProperties.has('_deleteOpened') || changedProperties.has('_editOpened')) {
      this.opened = this._deleteOpened || this._editOpened;
    }
  }
  render() {
    return html`
      <slot></slot>
      <hg-delete-item
        .disable=${this.disableEdit} 
        .name=${"ikona"} 
        @opened-changed=${(event) => this._deleteOpened = event.target.opened}>
      </hg-delete-item>
      ${this.first ? '' : html`<paper-icon-button
        class="swap-left"
        icon="swap-horiz"
        ?disabled=${this.disableEdit}
        @click=${() => this.dispatchEvent(new CustomEvent('swap', {detail: -1}))}>
      </paper-icon-button>`}
      ${this.last ? '' : html`<paper-icon-button
        class="swap-right"
        icon="swap-horiz"
        ?disabled=${this.disableEdit}
        @click=${() => this.dispatchEvent(new CustomEvent('swap', {detail: +1}))}>
      </paper-icon-button>`}
    `;
  }
});
