import {LitElement, html, css} from 'lit';
import {pagesStaticData} from '../../../utils/urlStructure.js';

export class HgDrawerItemSubItems extends LitElement {
  static properties = {
    links: Array,
    selectedPath: String,
  };
  static styles = css`
    :host {
      display: block;
      font-weight: 700;
      font-size: 16px;
    }
    ul {
      margin: 0 0 10px;
      padding: 0;
    }
    a {
      color: inherit;
      display: block;
      text-decoration: none;
      padding: 10px 10px 10px 20px;
      transition: background-color 0.3s ease, color 0.2s ease;
    }
    a[selected] {
      background: var(--primary-color);
      color: white;
    }
  `;
  render() {
    const links = this.links
      .map((link) => pagesStaticData[link]);

    return html`
      <ul>
        ${links.map((link) => html`
          <li>
            <a
              href="${link.path}" 
              ?selected=${link.path === this.selectedPath}
              @click=${() => this.dispatchEvent(new CustomEvent('close-drawer', {composed: true}))}
            >
              ${link.name}
            </a>
          </li>
          `)}
      </ul>
    `;
  }
}
customElements.define('hg-drawer-item-subitems', HgDrawerItemSubItems);
