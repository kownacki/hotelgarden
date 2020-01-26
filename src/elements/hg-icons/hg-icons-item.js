import {LitElement, html, css} from 'lit-element';
import sharedStyles from '../../styles/shared-styles.js';
import '../hg-list/hg-list-editable-text.js';

customElements.define('hg-icons-item', class extends LitElement {
  static get properties() {
    return {
      icon: Object,
      disableEdit: Boolean,
      small: {type: Boolean, reflect: true},
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host(:not([small])) {
        display: block;
        width: 140px;
        padding: 10px;
        position: relative;
      }
      :host([small]) {
        width: 230px;
        display: flex;
        min-height: 60px;
        margin: 5px 40px 5px 15px;
      }
      iron-icon {
        filter: var(--primary-color-filter)
      }
      :host(:not([small])) iron-icon {
        display: block;
        margin: auto;
        width: 60px;
        height: 60px;
      }
      :host([small]) iron-icon {
        min-width: 40px;
        height: 40px;
        margin-right: 10px
      }
      hg-list-editable-text {
        margin: 8px 0;
      }
      :host(:not([small])) .text {
        text-align: center;
      }
      @media all and (max-width: 959px) {
        :host([small]) {
          width: auto;
        }
      }
      @media all and (max-width: 599px) {
        :host(:not([small])) {
          width: 120px;
        }
        :host([small]) {
          min-height: auto;
        }
      }
    `];
  }
  render() {
    return html`
      <iron-icon .src="${this.icon.url}"></iron-icon>
      <hg-list-editable-text
        id="editable"
        .float=${true}
        .item=${this.icon} 
        .disabled=${this.disableEdit && !this.shadowRoot.getElementById('editable').showControls}
        .field=${'text'}>
        <div class="text smaller-text"></div>
      </hg-list-editable-text>
    `;
  }
});
