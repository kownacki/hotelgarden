import {LitElement, html, css} from 'lit-element';

customElements.define('hg-header-subnav', class extends LitElement {
  static get properties() {
    return {
      links: Array,
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
        width: 200px;
        background: var(--secondary-color);
      }
      :host::before {
        border-right: 7px solid transparent;
        border-bottom: 7px solid var(--secondary-color);
        border-left: 7px solid transparent;
        content: '';
        top: -7px;
        left: 25px;
        width: 0;
        height: 0;
        margin: 0 auto;
        position: absolute;
      }
      ul {
        padding: 10px 0;
        margin: 0;
      }
      li {
        list-style-type: none;
      }
      a {
        display: block;
        padding: 8px 16px;
        color: white;
        text-decoration: none;
        transition: background-color 0.3s ease;
      }
      a:hover {
        background: rgba(var(--primary-color-rgb), 85%);
      }
    `;
  }
  render() {
    return html`
      <ul>
        ${_.map((link) => html`
          <li><a href="${link.path}">${link.name}</a></li>
        `, this.links)}
      </ul>
    `;
  }
});
