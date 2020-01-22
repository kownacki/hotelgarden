import {LitElement, html, css} from 'lit-element';
import '../../elements/hg-list/hg-list-editable-text.js';

customElements.define('hg-icons-item', class extends LitElement {
  static get properties() {
    return {
      icon: Object,
      disableEdit: Boolean,
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
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
        font-size: 18px;
        text-align: center;
      }
      @media all and (max-width: 599px) {
        p {
          font-size: 16px;
        }
      }
    `;
  }
  render() {
    return html`
      <iron-icon .src="${this.icon.url}"></iron-icon>
      <hg-list-editable-text
        id="editable"
        .item=${this.icon} 
        .disabled=${this.disableEdit && !this.shadowRoot.getElementById('editable').showControls}
        .field=${'text'}>
        <p class="text"></p>
      </hg-list-editable-text>
    `;
  }
});
