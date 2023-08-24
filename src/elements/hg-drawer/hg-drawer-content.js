import {LitElement, html, css} from 'lit';
import {FirebaseAuthController} from '../../utils/FirebaseAuthController.js';
import {
  createDynamicPath,
  DYNAMIC_PATH_PAGES_ROOT_PATH,
  HIDDEN_PAGES,
  isDynamicPath,
  mainNavigation,
  pagesStaticData,
  staticPathToPageUid,
} from '../../../utils/urlStructure.js';
import './hg-drawer-close.js';
import './hg-drawer-item.js';

export class HgDrawerContent extends LitElement {
  _firebaseAuth;
  static properties = {
    path: String,
    promotedDynamicPathPage: Object, // DynamicPathPageEventWithUid | DynamicPathPageNewsWithUid | undefined
    _loggedIn: Boolean,
  };
  static styles = css`
    :host {
      background: white;
    }
    .header {
      position: fixed;
      width: 100%;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    hg-drawer-close {
      display: block;
      margin: calc((var(--header-height) - 44px) / 2);
    }
    nav {
      display: block;
      height: calc(100% - var(--header-height));
      margin-top: var(--header-height);
      overflow: auto;
    }
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    li {
      border-bottom: solid 1px var(--placeholder-color);
    }
    li:last-child {
      border-bottom: none;
    }
  `;
  constructor() {
    super();
    this._firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this._loggedIn = loggedIn;
    });
  }
  render() {
    const currentPageUid = staticPathToPageUid[this.path];

    return html`
      <div class="header">
        <hg-drawer-close
          @click=${() => this.dispatchEvent(new CustomEvent('close-drawer'))}>
        </hg-drawer-close>
      </div>
      <nav>
        <ul>
          ${!this.promotedDynamicPathPage
            ? ''
            : html`<li class="promoted">
              <hg-drawer-item
                .path=${createDynamicPath(this.promotedDynamicPathPage.permalink)}
                .name=${this.promotedDynamicPathPage.title}
              >
              </hg-drawer-item>
            </li>`
          }
          ${mainNavigation.map((navigationItem) => {
            const { pageUid, name, subpages } = navigationItem;
            const { path } = pagesStaticData[pageUid];

            const isSelected = (pageUid === currentPageUid && !subpages)
              || (pageUid === 'dynamic-path-pages' && (this.path === DYNAMIC_PATH_PAGES_ROOT_PATH || isDynamicPath(this.path)));

            // todo remove loggedIn check
            const subitems = subpages && subpages
              .filter((subpageUid) => {
                return !HIDDEN_PAGES.includes(subpageUid) || this._loggedIn;
              })
              .map((subpageUid) => {
                const { name, path } = pagesStaticData[subpageUid];
                return { name, path };
              });

            const selectedSubitemIndex = (subitems || []).findIndex((subitem) => {
              return subitem.path === this.path;
            });
            const isAnySubitemSelected = selectedSubitemIndex !== -1;

            return html`
              <li>
                <hg-drawer-item
                  .path=${path}
                  .name=${name}
                  .isSelected=${isSelected}
                  .isOpened=${isAnySubitemSelected}
                  .subitems=${subitems}
                  .selectedSubitemIndex=${selectedSubitemIndex}>
                </hg-drawer-item>        
              </li>
          `;
          })}
        </ul>
      </nav>
    `;
  }
}
customElements.define('hg-drawer-content', HgDrawerContent);
