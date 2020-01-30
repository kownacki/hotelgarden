import {LitElement, html, css} from 'lit-element';

customElements.define('hg-menu-nav-item', class extends LitElement {
  static get properties() {
    return {
      category: Object,
      selected: {type: Boolean, reflect: true}
    };
  }
  static get styles() {
    return css`
      :host {
        display: flex;
        margin: 1px 0;
        align-items: center;
        transition: background-color 0.3s ease, color 0.2s ease;
      }
      iron-image {
        width: 40%;
        height: 80px;
        background: var(--placeholder-color);
      }
      .name {
        font-size: 18px;
        font-weight: 400;
        padding: 10px;
        flex: 1;
      }
      :host([selected]), :host(:hover) {
        background: var(--primary-color);
        color: white;
        cursor: pointer;
      }
    `;
  }
  render() {
    return html`
      <iron-image .sizing=${'cover'} .src=${_.get('url', this.category.image)}></iron-image>
      <div class="name">${this.category.name}</div>
    `;
  }
});
