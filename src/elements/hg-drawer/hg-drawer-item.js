import {LitElement, html, css} from 'lit';
import {pages} from '../../utils.js';

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
    .item > *, .sublink {
      transition: background-color 0.3s ease, color 0.2s ease;
    }
    .item:hover, .sublink:hover {
      cursor: pointer;
    }
    .item[selected] > *, .sublink[selected] {
      background: var(--primary-color);
      color: white;
    }
    .sublink {
      padding: 10px 10px 10px 20px;
    }
    ul {
      margin: 0 0 10px;
      padding: 0;
      display: none;
    }
    :host([opened]) ul {
      display: block;
    }
  `;
  render() {
    return html`
      <div class="item"
        ?selected=${(this.link.path === this.selected && !this.link.sublinks)
          || (this.link.path === '/wydarzenia' && _.startsWith('/wydarzenia', this.selected))}>
        ${this.link.sublinks 
          ? html`<div
              @click=${() => this.opened = !this.opened}>
              ${this.link.name}
            </div>`
          : html`
            <a href="${this.link.path}" @click=${() => this.dispatchEvent(new CustomEvent('close-drawer', {composed: true}))}>
              ${this.link.name}
            </a>
          `}
      </div>
      ${!this.link.sublinks ? '' : html`
        <ul>
          ${_.map((sublink) => html`
            <li>
              <a 
                class="sublink" 
                href="${sublink.path}" 
                ?selected=${sublink.path === this.selected}
                @click=${() => this.dispatchEvent(new CustomEvent('close-drawer', {composed: true}))}>
                ${sublink.name}
              </a>
            </li>
          `, _.map(_.get(_, pages), this.link.sublinks))}
        </ul>
      `}
    `;
  }
}
customElements.define('hg-drawer-item', HgDrawerItem);
