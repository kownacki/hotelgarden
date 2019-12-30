import {LitElement, html, css} from 'lit-element';
import '../edit/hg-editable-text.js';

customElements.define('hg-icon-info', class extends LitElement {
  static get properties() {
    return {
      items: Array,
    };
  }
  static get styles() {
    return css`
      :host {
        display: flex;
      }
      :host > * {
        display: flex;
        align-items: center;
      }
      iron-icon {
        min-width: 36px;
        height: 36px;
        filter: var(--primary-color-filter)
      }
      .text {
        font-size: 20px;
        min-width: 20px;
      }
      hg-editable-text {
        margin: 0 20px 0 10px;
      }
      :host > :last-child hg-editable-text {
        margin-right: 0;
      }
    `;
  }
  render() {
    return html`
      ${_.map.convert({cap: false})((item, index) => html`
        <div>
          <iron-icon .src=${item.src}></iron-icon>
          <hg-editable-text
            float
            .text=${item.text}
            @save=${(event) => this.dispatchEvent(new CustomEvent('save', {detail: {index, text: event.detail}}))}>
            <div class="text"></div>
          </hg-editable-text> 
        </div>
      `, this.items)}
    `;
  }
});
