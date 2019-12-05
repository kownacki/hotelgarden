import {LitElement, html, css} from 'lit-element';
import {linksMap} from '../utils.js';
import '../hg-heading.js';

customElements.define('hg-links', class extends LitElement {
  static get properties() {
    return {
      path: String,
      superpath: String,
      _links: Object,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._links = _.filter((sublink) => sublink.path !== this.path, linksMap[this.superpath].sublinks);
    })();
  }
  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 1202px;
        margin: 80px auto;
      }
      .links {
        display: flex;
      }
      a {
        background: rgba(var(--secondary-color-rgb), 0.075);
        flex: 1;
        margin: 1px;
        text-decoration: none;
        color: inherit;
      }
      a:hover {
        background: rgba(var(--primary-color-rgb), 0.25);
      }
      iron-image {
        width: 100%;
        height: 350px;
      }
      .name {
        text-align: center;
        padding: 20px;
        font-size: 20px;
        text-transform: uppercase;
      }
    `;
  }
  render() {
    return html`
      <hg-heading center>${'Zobacz także'}</hg-heading>
      <div class="links">
        ${_.map((link) => html`
          <a href="${link.path}">
            <iron-image .src=${link.image} .sizing=${'cover'}></iron-image>
            <div class="name">${link.name}</div>
          </a>
        `, this._links)}
      </div>
    `;
  }
});
