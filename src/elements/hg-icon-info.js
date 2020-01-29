import {LitElement, html, css} from 'lit-element';
import '../edit/hg-editable-text.js';

customElements.define('hg-icon-info', class extends LitElement {
  static get properties() {
    return {
      editable: Boolean,
      items: Array,
      dataReady: Boolean,
    };
  }
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-wrap: wrap;
      }
      :host > * {
        margin-bottom: 5px;
        display: flex;
        align-items: center;
      }
      iron-icon {
        min-width: 40px;
        height: 40px;
        filter: var(--primary-color-filter)
      }
      .text {
        min-width: 20px;
        margin: 0 20px 0 10px;
      }
      :host > :last-child .text {
        margin-right: 0;
      }
      @media all and (max-width: 599px) {
        iron-icon {
          min-width: 32px;
          height: 32px;
        }
      }
    `;
  }
  render() {
    return html`
      ${_.map.convert({cap: false})((item, index) => html`
        <div>
          <iron-icon .src=${item.src}></iron-icon>
          ${this.editable 
            ? html`<hg-editable-text
              .ready=${this.dataReady}
              float
              .text=${item.text}
              @save=${(event) => this.dispatchEvent(new CustomEvent('save', {detail: {index, text: event.detail}}))}>
              <div class="text"></div>
            </hg-editable-text>`
            : html`<div class="text">${item.text}</div>`
          }
        </div>
      `, this.items)}
    `;
  }
});
