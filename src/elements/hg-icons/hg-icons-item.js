import {LitElement, html, css} from 'lit';
import sharedStyles from '../../styles/shared-styles.js';
import '../hg-list-old/hg-list-old-editable-text.js';

export class HgIconsItem extends LitElement {
  static properties = {
    icon: Object,
    disableEdit: Boolean,
    small: {type: Boolean, reflect: true},
  };
  static styles = [sharedStyles, css`
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
    img {
      filter: var(--primary-color-filter)
    }
    :host(:not([small])) img {
      display: block;
      margin: auto;
      width: 60px;
      height: 60px;
    }
    :host([small]) img {
      min-width: 40px;
      height: 40px;
      margin-right: 10px
    }
    .text {
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
      :host(:not([small])) img {
        width: 50px;
        height: 50px;
      }
      :host([small]) img {
        min-width: 32px;
        height: 32px;
        margin-right: 8px
      }
    }
  `];
  render() {
    return html`
      <img src=${this.icon.url}/>
      <hg-list-old-editable-text
        id="editable"
        .float=${true}
        .item=${this.icon} 
        .disabled=${this.disableEdit && !this.shadowRoot.getElementById('editable').showControls}
        .field=${'text'}>
        <div class="text smaller-text"></div>
      </hg-list-old-editable-text>
    `;
  }
}
customElements.define('hg-icons-item', HgIconsItem);
