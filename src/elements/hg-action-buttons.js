import {LitElement, html, css} from 'lit-element';

customElements.define('hg-action-buttons', class extends LitElement {
  static get properties() {
    return {
      buttons: Array,
    };
  }
  static get styles() {
    return css`
      :host {
        display: flex;
      }
      a {
        text-decoration: none;
        color: white;
        background: var(--accent-color);
        padding: 15px 30px;
        margin-right: 30px;
      }
      a:last-child {
        margin-right: 0;
      }
    `;
  }
  render() {
    return html`
      ${_.map((button) => html`
        <a href="${button.url}">
          ${button.text || 'Zobacz więcej'}
        </a>
      `, this.buttons)}
    `;
  }
});
