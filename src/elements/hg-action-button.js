import {LitElement, html, css} from 'lit-element';

customElements.define('hg-action-button', class extends LitElement {
  static get properties() {
    return {
      url: String,
      click: Function,
    };
  }
  updated(changedProperties) {
    if (changedProperties.has('url')) {
      this.shadowRoot.querySelector('a').href = this.url;
    }
  }
  static get styles() {
    return css`
      :host {
        display: inline-block;
        text-decoration: none;
        color: white;
        background: var(--accent-color);
        font-size: 16px;
        transition: background 0.2s ease;
        border: solid 1px rgba(255, 255, 255, 0.25);
        --action-button-padding: 10px 20px;
      }
      a {
        display: block;
        color: inherit;
        text-decoration: none;
        padding: var(--action-button-padding);
      }
      :host(:hover) {
        background: var(--accent-color-dark);
        cursor: pointer;
      }
    `;
  }
  render() {
    return html`
      <a @click=${this.click ? (event) => {event.preventDefault(); return this.click(event)} : null}>
        <slot></slot>
      </a>
    `;
  }
});
