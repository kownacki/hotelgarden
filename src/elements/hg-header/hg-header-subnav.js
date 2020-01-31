import {LitElement, html, css} from 'lit-element';
import {pages} from '../../utils.js';

customElements.define('hg-header-subnav', class extends LitElement {
  static get properties() {
    return {
      links: Array,
      selected: String,
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
        width: 200px;
        background: rgba(var(--secondary-color-rgb), 90%);
      }
      :host::before {
        border-right: 7px solid transparent;
        border-bottom: 7px solid rgba(var(--secondary-color-rgb), 90%);
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
      a:hover, a[selected] {
        background: rgba(var(--primary-color-rgb), 90%);
      }
    `;
  }
  render() {
    return html`
      <ul>
        ${_.map((link) => html`
          <li><a href="${link.path}" ?selected=${link.path === this.selected}>${link.name}</a></li>
        `, _.map(_.get(_, pages), this.links))}
      </ul>
    `;
  }
});
