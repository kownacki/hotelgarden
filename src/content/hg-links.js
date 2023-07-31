import {LitElement, html, css} from 'lit';
import {staticPathToPageUid, linksMap, pagesStaticData} from '../../utils/urlStructure.js';
import '../elements/mkwc/hg-image.js';
import sharedStyles from '../styles/shared-styles.js';
import {createDbPath, getFromDb} from '../utils/database.js';
import {FirebaseAuthController} from '../utils/FirebaseAuthController.js';

export class HgLinks extends LitElement {
  _firebaseAuth;
  static properties = {
    path: String,
    superpath: String,
    includeSuperpath: Boolean,
    _links: Array,
    _loggedIn: Boolean,
  };
  static styles = [sharedStyles, css`
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
      background: var(--surface-light-color);
      transition: background 0.3s ease;
      flex: 1;
      margin: 1px 1px 40px;
      text-decoration: none;
      color: inherit;
    }
    a:hover {
      background: rgba(var(--primary-color-rgb), 0.25);
    }
    hg-image {
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
      hg-image{
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
  constructor() {
    super();
    this._firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this._loggedIn = loggedIn;
    });
  }
  async willUpdate(changedProperties) {
    if (changedProperties.has('_loggedIn')) {
      // todo remove loggedIn check
      const links = linksMap[this.superpath].sublinks
        .filter((subLink) => {
          if (this._loggedIn) {
            return true;
          }
          return subLink !== 'pizza-truck' && subLink !== 'outdoor-parties'
        })
        .map((subLink) => {
          return pagesStaticData[subLink];
        })
        .filter((subLinkData) => {
          return subLinkData.path !== this.path;
        })
        .filter((subLinkData) => {
          if (subLinkData.path === this.superpath) {
            return this.includeSuperpath;
          }
          return true;
        });

      const banners = await Promise.all(_.map(
        (link) => getFromDb(createDbPath(`banners/${staticPathToPageUid[link.path]}`, 'image.url')),
        links,
      ));
      this._links = _.map(([link, bannerImage]) => ({...link, image: bannerImage}), _.zip(links, banners));
    }
  }
  render() {
    return html`
      <h2 class="content-heading">Zobacz także</h2>
      <div class="links">
        ${_.map((link) => html`
          <a href="${link.path}">
            <hg-image
              .src=${link.image}
              .ready=${true}
              .fit=${'cover'}>
            </hg-image>
            <div class="name">${link.name}</div>
          </a>
        `, this._links)}
      </div>
    `;
  }
}
customElements.define('hg-links', HgLinks);
