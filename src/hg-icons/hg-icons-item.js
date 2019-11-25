import {LitElement, html, css} from 'lit-element';

customElements.define('hg-icons-item', class extends LitElement {
  static get properties() {
    return {
      icon: Object,
    };
  }
  static get styles() {
    return css`
      .block {
        width: 130px;
        margin: 10px;
      }
      iron-icon {
        display: block;
        margin: auto;
        width: 60px;
        height: 60px;
        filter: var(--primary-color-filter)
      }
      p {
        text-align: center;
      }
    `;
  }
  render() {
    return html`
      <div class="block">
        <iron-icon .src="${this.icon.url}"></iron-icon>
        <p>${this.icon.text}</p>
      </div>
    `;
  }
});
