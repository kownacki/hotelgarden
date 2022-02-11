import {LitElement, html, css} from 'lit';
import sharedStyles from '../styles/shared-styles.js';
import {pathToUid, linksMap, pages} from '../utils.js';

customElements.define('hg-links', class extends LitElement {
  static get properties() {
    return {
      path: String,
      superpath: String,
      includeSuperpath: Boolean,
      _links: Array,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      const links = _.filter(
        (link) => link.path !== this.path && (this.includeSuperpath ? true : link.path !== this.superpath),
        _.map(_.get(_, pages), linksMap[this.superpath].sublinks),
      );
      const banners = await Promise.all(_.map((link) => db.doc('banners/' + pathToUid[link.path]).get(), links));
      this._links = _.map(([link, banner]) => ({...link, image: _.get('image.url', banner.data())}), _.zip(links, banners));
    })();
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
        max-width: 1202px;
        margin: 80px auto 0;
        padding: 0 20px;
      }
      .links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 60px;
      }
      a {
        max-width: 600px;
        background: rgba(var(--secondary-color-rgb), 0.075);
        flex: 1;
        margin: 1px 1px 40px;
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
      @media all and (max-width: 959px) {
        a {
          min-width: calc(50% - 2px);
          max-width: calc(50% - 2px);
        }
      }
      @media all and (max-width: 599px) {
        iron-image{
          height: 200px;
        }
      }
      @media all and (max-width: 479px) {
        a {
          min-width: calc(100% - 2px);
          max-width: calc(100% - 2px);
        }
      }
    `];
  }
  render() {
    return html`
      <h2 class="content-heading">Zobacz także</h2>
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
