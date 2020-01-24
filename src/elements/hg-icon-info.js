import {LitElement, html, css} from 'lit-element';
import '../edit/hg-editable-text.js';

customElements.define('hg-icon-info', class extends LitElement {
  static get properties() {
    return {
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
        min-width: 36px;
        height: 36px;
        filter: var(--primary-color-filter)
      }
      .text {
        min-width: 20px;
      }
      hg-editable-text {
        margin: 0 20px 0 10px;
      }
      :host > :last-child hg-editable-text {
        margin-right: 0;
      }

      @media all and (max-width: 599px) {
        iron-icon {
          min-width: 24px;
          height: 24px;
        }
      }
    `;
  }
  render() {
    return html`
      ${_.map.convert({cap: false})((item, index) => html`
        <div>
          <iron-icon .src=${item.src}></iron-icon>
          <hg-editable-text
            .ready=${this.dataReady}
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
