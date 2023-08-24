import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';
import './hg-drawer-item-subitems.js';

export class HgDrawerItem extends LitElement {
  static properties = {
    path: String,
    name: String,
    isSelected: Boolean,
    isOpened: {type: Boolean, reflect: true},
    subitems: Array, // { name: string, path: string }[]
    selectedSubitemIndex: Number,
  };
  static styles = css`
    /* todo arrow to bottom to show that this menu is dropdown */
    :host {
      display: block;
      font-weight: 700;
      font-size: 16px;
    }
    a {
      color: inherit;
      display: block;
      text-decoration: none;
    }
    .item > * {
      color: var(--primary-color);
      padding: 15px 10px;
    }
    .item:hover {
      cursor: pointer;
    }
    .item[selected] > * {
      background: var(--primary-color);
      color: white;
    }
  `;
  render() {
    return html`
      <div class="item" ?selected=${this.isSelected}>
        ${this.subitems
          ? html`<div
              @click=${() => this.isOpened = !this.isOpened}>
              ${this.name}
            </div>`
          : html`
            <a
              href="${this.path}"
              @click=${() => {
                this.dispatchEvent(new CustomEvent('close-drawer', {composed: true}));
              }}
            >
              ${this.name}
            </a>
          `}
      </div>
      ${when(
        this.subitems && this.isOpened,
        () => html`
          <hg-drawer-item-subitems .subitems=${this.subitems} .selectedSubitemIndex=${this.selectedSubitemIndex}>
          </hg-drawer-item-subitems>
        `,
      )}
    `;
  }
}
customElements.define('hg-drawer-item', HgDrawerItem);
