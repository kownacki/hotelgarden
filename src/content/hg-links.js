import {LitElement, html, css} from 'lit';
import {mainNavigationByParentPageUid, pagesStaticData} from '../../utils/urlStructure.js';
import '../elements/mkwc/hg-image.js';
import sharedStyles from '../styles/shared-styles.js';
import {createDbPath, getFromDb} from '../utils/database.js';
import {FirebaseAuthController} from '../utils/FirebaseAuthController.js';
import {omitForbiddenPages} from '../utils/navigation.js';

export class HgLinks extends LitElement {
  _firebaseAuth;
  static properties = {
    pageUid: String,
    excludedPages: Array,
    isParentPageIncluded: Boolean,
    _pages: Array,
    _bannersMap: Object,
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
      const parentPageUid = pagesStaticData[this.pageUid].parentPageUid;
      const parentPageSubpages = mainNavigationByParentPageUid[parentPageUid].subpages;

      const pages = omitForbiddenPages(parentPageSubpages, this._loggedIn)
        .filter((subpageUid) => {
          return !(this.excludedPages?.includes(subpageUid));
        })
        .filter((subpageUid) => {
          if (subpageUid === parentPageUid) {
            return this.isParentPageIncluded;
          }
          return true;
        })
        .filter((subpageUid) => {
          return subpageUid !== this.pageUid;
        });

      const banners = await Promise.all(
        pages.map((pageUid) => {
          return getFromDb(createDbPath(`banners/${pageUid}`, 'image.url')).then((img) => ({
            pageUid,
            img,
          }));
        }),
      );

      this._pages = pages;
      this._bannersMap = banners.reduce((bannersMap, { pageUid, img}) => {
        return {
          ...bannersMap,
          [pageUid]: img,
        };
      }, {});
    }
  }
  render() {
    return html`
      <h2 class="content-heading">Zobacz także</h2>
      <div class="links">
        ${this._pages?.map((pageUid) => {
          const { path, name } = pagesStaticData[pageUid];
          const bannerImg = this._bannersMap[pageUid];
          
          return html`
            <a href="${path}">
              <hg-image
                .src=${bannerImg}
                .ready=${true}
                .fit=${'cover'}>
              </hg-image>
              <div class="name">${name}</div>
            </a>
          `;
        })}
      </div>
    `;
  }
}
customElements.define('hg-links', HgLinks);
