import {LitElement, html, css} from 'lit';

export class HgActionButton extends LitElement {
  static properties = {
    url: String,
    newTab: Boolean,
    lowEmphasis: {type: Boolean, reflect: true, attribute: 'low-emphasis'},
    disabled: {type: Boolean, reflect: true},
  };
  static styles = css`
    :host {
      display: inline-block;
      font-size: 16px;
      transition: background 0.2s ease;
      border: solid 1px transparent;
      text-align: center;
      --action-button-padding: 10px 20px;
    }
    :host(:not([low-emphasis])) {
      background: var(--accent-color);
      border-color: rgba(255, 255, 255, 0.25);
      color: white;
    }
    :host([low-emphasis]) {
      color: var(--accent-color);
    }
    :host([disabled]) {
      background: var(--divider-color);
      pointer-events: none;
      color: white;
    }
    :host(:not([disabled]):hover) {
      background: var(--accent-color-dark);
      cursor: pointer;
      /* remember to remove it when disabled */
    }
    :host([low-emphasis]:hover) {
      background: var(--divider-color);
    }
    a, button {
      display: block;
      color: inherit;
      padding: var(--action-button-padding);
    }
    a {
      text-decoration: none;
    }
    button {
      font: inherit;
      border: none;
      background: transparent;
    }
    button:hover {
      cursor: pointer;
    }
  `;
  render() {
    return html`
      ${this.url
        ? html`
          <a href="${this.url}" target="${this.newTab ? '_blank' : '_self'}">
            <slot></slot>
          </a>
        `
        : html`
          <button>
            <slot></slot>
          </button>
        `
      }
      
    `;
  }
}
customElements.define('hg-action-button', HgActionButton);
