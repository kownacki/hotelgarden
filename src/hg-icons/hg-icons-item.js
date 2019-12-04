import {LitElement, html, css} from 'lit-element';
import '../edit/hg-delete-item.js';
import './hg-icons-edit.js';

customElements.define('hg-icons-item', class extends LitElement {
  static get properties() {
    return {
      icon: Object,
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
        width: 130px;
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
      .edit {
        position: absolute;
        right: 0;
        top: 10px;
        display: none;
        flex-direction: column;
      }
      :host(:hover) .edit, :host([opened]) .edit {
        display: flex;
      } 
      paper-icon-button {
        width: 24px;
        height: 24px;
        padding: 0;
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
      <p>${this.icon.text}</p>
      <div class="edit">
        <hg-delete-item 
          .disable=${this.disableEdit} 
          .name=${"ikona"} 
          @opened-changed=${(event) => this._deleteOpened = event.target.opened}>
        </hg-delete-item>
        <hg-icons-edit 
          .disable=${this.disableEdit} 
          .text=${this.icon.text} 
          @opened-changed=${(event) => this._editOpened = event.target.opened}>
        </hg-icons-edit>
        ${this.last ? '' : html`<paper-icon-button
          icon="swap-horiz"
          ?disabled=${this.disableEdit}
          @click=${() => this.dispatchEvent(new CustomEvent('request-swap'))}>
        </paper-icon-button>`}
      </div>
    `;
  }
});
