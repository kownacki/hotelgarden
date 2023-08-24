import {LitElement, html, css} from 'lit';
import {
  createDynamicPath,
  DYNAMIC_PATH_PAGES_ROOT_PATH,
  isDynamicPath,
  mainNavigation,
  pagesStaticData, staticPathToPageUid,
} from '../../../utils/urlStructure.js';
import sharedStyles from '../../styles/shared-styles.js';
import {getNavigationSubitems} from '../../utils/navigation.js';
import './hg-header-item.js';

export class HgHeaderItems extends LitElement {
  static properties = {
    path: String,
    promotedDynamicPathPage: Object, // DynamicPathPageEventWithUid | DynamicPathPageNewsWithUid | undefined
    isLoggedIn: Boolean,
  };
  static styles = [sharedStyles, css`
    ul {
      margin: 0 0 0 10px;
      padding: 0;
      display: flex;
      align-items: center;
    }
    li {
      list-style-type: none;
      margin-right: 10px;
      margin-top: 10px;
    }
    @media all and (max-width: 1279px) {
      li {
        margin-right: 5px;
      }
    }
    @media all and (max-width: 1099px) {
      ul {
        display: none;
      }
    }
  `];
  render() {
    const currentPageUid = staticPathToPageUid[this.path];

    return html`
      <ul>
        ${!this.promotedDynamicPathPage ? '' : html`
          <li class="promoted">
            <hg-header-item
              .path=${createDynamicPath(this.promotedDynamicPathPage.permalink)}
              .name=${this.promotedDynamicPathPage.title}
            >
            </hg-header-item>
          </li>
        `}
        ${mainNavigation.map((navigationItem) => {
          const { pageUid, name, subpages } = navigationItem;
          const { path } = pagesStaticData[pageUid];

          const isSelected = pageUid === currentPageUid
            || (pageUid === 'dynamic-path-pages' && (this.path === DYNAMIC_PATH_PAGES_ROOT_PATH || isDynamicPath(this.path)))
            || subpages?.includes(currentPageUid);

          const subitems = subpages && getNavigationSubitems(subpages, this.isLoggedIn);

          const selectedSubitemIndex = (subitems || []).findIndex((subitem) => {
            return subitem.path === this.path;
          });

          return html`
            <li>
              <hg-header-item
                .path=${path}
                .name=${name}
                .isSelected=${isSelected}
                .subitems=${subitems}
                .selectedSubitemIndex=${selectedSubitemIndex}
              >
              </hg-header-item>
            </li>
          `;
        })}
      </ul>
    `;
  }
}
customElements.define('hg-header-items', HgHeaderItems);
