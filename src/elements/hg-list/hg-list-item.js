import {LitElement, html, css} from 'lit-element';
import '../../edit/hg-delete-item.js';

customElements.define('hg-list-item', class extends LitElement {
  static get properties() {
    return {
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
        top: 10px;
        display: none;
        flex-direction: column;
      }
      :host(:hover) hg-delete-item, :host([opened]) hg-delete-item{
        display: block;
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
    `;
  }
});
