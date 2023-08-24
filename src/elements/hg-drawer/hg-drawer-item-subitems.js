import {LitElement, html, css} from 'lit';

export class HgDrawerItemSubItems extends LitElement {
  static properties = {
    subitems: Array, // { name: string, path: string }[]
    selectedSubitemIndex: Number,
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
    return html`
      <ul>
        ${this.subitems.map((subitem, index) => {
          const { path, name } = subitem;

          return html`
            <li>
              <a
                href="${path}"
                ?selected=${index === this.selectedSubitemIndex}
                @click=${() => this.dispatchEvent(new CustomEvent('close-drawer', {composed: true}))}
              >
                ${name}
              </a>
            </li>
          `;
        })}
      </ul>
    `;
  }
}
customElements.define('hg-drawer-item-subitems', HgDrawerItemSubItems);
