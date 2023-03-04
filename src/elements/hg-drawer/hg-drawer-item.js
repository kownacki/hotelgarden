import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';
import {isDynamicPath} from '../../../utils/urlStructure.js';
import './hg-drawer-item-subitems.js';

export class HgDrawerItem extends LitElement {
  static properties = {
    link: Object,
    opened: {type: Boolean, reflect: true},
    selected: String,
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
    const isSelected = (this.link.path === this.selected && !this.link.sublinks)
      || (this.link.path === '/wydarzenia' && (this.selected === '/wydarzenia' || isDynamicPath(this.selected)));
    return html`
      <div class="item" ?selected=${isSelected}>
        ${this.link.sublinks
          ? html`<div
              @click=${() => this.opened = !this.opened}>
              ${this.link.name}
            </div>`
          : html`
            <a
              href="${this.link.path}"
              @click=${() => {
                this.dispatchEvent(new CustomEvent('close-drawer', {composed: true}));
              }}
            >
              ${this.link.name}
            </a>
          `}
      </div>
      ${when(
        this.link.sublinks && this.opened,
        () => html`
          <hg-drawer-item-subitems 
            .links=${this.link.sublinks}
            .selectedPath=${this.selected}
          ></hg-drawer-item-subitems>
        `,
      )}
    `;
  }
}
customElements.define('hg-drawer-item', HgDrawerItem);
