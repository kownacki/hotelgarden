import {LitElement, html, css} from 'lit-element';

customElements.define('hg-content-label', class extends LitElement {
  static get properties() {
    return {
      name: String,
    };
  }
  static get styles() {
    return css`
      :host {
        display: none;
        position: absolute;
        bottom: 100%;
        left: 0;
      }
    `;
  }
  render() {
    return html`
      ${this.name}
    `;
  }
});
