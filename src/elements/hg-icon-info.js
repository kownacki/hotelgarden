import {LitElement, html, css} from 'lit';
import '../edit/hg-editable-text.js';

export class HgIconInfo extends LitElement {
  static properties = {
    editable: Boolean,
    items: Array,
    dataReady: Boolean,
  };
  static styles = css`
    :host {
      display: flex;
      flex-wrap: wrap;
    }
    /* Prevent bugs. Iphone adds style tag as host's last child. */
    :host > :not(style) {
      margin-bottom: 5px;
      display: flex;
      align-items: center;
    }
    img {
      min-width: 40px;
      height: 40px;
      filter: var(--primary-color-filter);
    }
    .text {
      min-width: 20px;
      margin: 0 20px 0 10px;
    }
    /* Prevent bugs. Iphone adds style tag as host's last child. */
    :host > div:last-of-type .text {
      margin-right: 0;
    }
    @media all and (max-width: 599px) {
      img {
        min-width: 32px;
        height: 32px;
      }
    }
  `;
  render() {
    return html`
      ${_.map.convert({cap: false})((item, index) => html`
        <div>
          <img src=${item.src}/>
          ${this.editable 
            ? html`<hg-editable-text
              .ready=${this.dataReady}
              .float=${true}
              .text=${item.text}
              @save=${({detail: text}) => {
                this.dispatchEvent(new CustomEvent('save', {detail: {index, text}}));
              }}>
              <div class="text"></div>
            </hg-editable-text>`
            : html`<div class="text">${item.text}</div>`
          }
        </div>
      `, this.items)}
    `;
  }
}
customElements.define('hg-icon-info', HgIconInfo);
