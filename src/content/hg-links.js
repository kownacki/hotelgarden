import {LitElement, html, css} from 'lit-element';
import {db, pathToUid, linksMap} from '../utils.js';
import '../elements/hg-heading.js';

customElements.define('hg-links', class extends LitElement {
  static get properties() {
    return {
      path: String,
      superpath: String,
      _links: Array,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      const links = _.filter((link) => link.path !== this.path && link.path !== this.superpath, linksMap[this.superpath].sublinks);
      const banners = await Promise.all(_.map((link) => db.doc('banners/' + pathToUid[link.path]).get(), links));
      this._links = _.map(([link, banner]) => ({...link, image: _.get('image.url', banner.data())}), _.zip(links, banners));
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
