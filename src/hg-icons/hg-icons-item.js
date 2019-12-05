import {LitElement, html, css} from 'lit-element';
import '../edit/hg-delete-item.js';
import '../edit/hg-editable-text.js';

customElements.define('hg-icons-item', class extends LitElement {
  static get properties() {
    return {
      icon: Object,
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
        width: 128px;
        padding: 10px;
        position: relative;
      }
      iron-icon {
        display: block;
        margin: auto;
        width: 60px;
        height: 60px;
        filter: var(--primary-color-filter)
      }
      p {
        text-align: center;
      }
      :host(:hover) hg-delete-item, :host([opened]) hg-delete-item, :host(:hover) paper-icon-button {
        display: block;
      }
      hg-delete-item  {
        position: absolute;
        right: 15px;
        top: 10px;
        display: none;
        flex-direction: column;
      }
      paper-icon-button {
        display: none;
        position: absolute;
        top: 28px;
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
      <iron-icon .src="${this.icon.url}"></iron-icon>
      <hg-editable-text
         id="editable"
        .disabled=${this.disableEdit && !this.shadowRoot.getElementById('editable').showControls}
        .text=${this.icon.text}
        @save=${(event) => this.dispatchEvent(new CustomEvent('request-edit', {detail: event.detail}))}>
        <p class="text"></p>
      </hg-editable-text>
      <hg-delete-item 
        .disable=${this.disableEdit} 
        .name=${"ikona"} 
        @opened-changed=${(event) => this._deleteOpened = event.target.opened}>
      </hg-delete-item>
      ${this.first ? '' : html`<paper-icon-button
        class="swap-left"
        icon="swap-horiz"
        ?disabled=${this.disableEdit}
        @click=${() => this.dispatchEvent(new CustomEvent('request-swap', {detail: -1}))}>
      </paper-icon-button>`}
      ${this.last ? '' : html`<paper-icon-button
        class="swap-right"
        icon="swap-horiz"
        ?disabled=${this.disableEdit}
        @click=${() => this.dispatchEvent(new CustomEvent('request-swap', {detail: +1}))}>
      </paper-icon-button>`}
    `;
  }
});
