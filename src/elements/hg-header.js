import {LitElement, html, css} from 'lit';
import {staticPathToPageUid, pagesStaticData} from '../../utils/urlStructure.js';
import {FirebaseAuthController} from '../utils/FirebaseAuthController.js';
import './ui/hg-icon-button.js';
import './hg-header/hg-header-items.js';
import './hg-header/hg-header-logo.js';
import './hg-book/hg-book-order-button.js';

export class HgHeader extends LitElement {
  _firebaseAuth;
  static properties = {
    noBannerImage: {type: Boolean, reflect: true, attribute: 'no-banner-image'},
    path: String,
    promotedDynamicPathPage: Object, // DynamicPathPageEventWithUid | DynamicPathPageNewsWithUid | undefined
    promotedDynamicPathPageLoaded: Boolean,
    _loggedIn: Boolean,
    _scrolledDown: {type: Boolean, reflect: true, attribute: 'scrolled-down'},
  };
  static styles = css`
    :host {
      --hg-header-font-color: white;
      font-size: 16px;
      display: block;
      top: 0;
      position: fixed;
      width: 100%;
      z-index: var(--layer-header);
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }
    :host([scrolled-down]) {
      background: white;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
    }
    :host([scrolled-down]), :host([no-banner-image]) {
      --hg-header-font-color: var(--primary-color);
    }
    header {
      display: flex;
    }
    nav {
      min-height: var(--header-height);
      align-self: flex-start;
      display: flex;
      flex: 1;
    }
    hg-icon-button {
      display: none;
      margin: 8px;
      color: var(--hg-header-font-color);
      position: absolute;
    }
    hg-header-logo {
      align-self: center;
      margin: 0 20px;
    }
    hg-book-order-button {
      align-self: center;
      margin: 0 15px 0 auto;
    }
    @media all and (max-width: 1279px) {
      hg-book-order-button {
        margin: 0  7px 0 auto;
      }
      hg-header-logo {
        margin: 0 10px;
      }
    }
    @media all and (max-width: 1099px) {
      nav {
        flex: none;
        margin-left: auto;
      }
      hg-icon-button {
        display: block;
      }
      hg-header-logo {
        position: absolute;
        top: 0;
        left: calc(50% - 60px);
        margin: 0;
      }
      hg-book-order-button {
        margin: 0 15px;
      }
    }
    @media all and (max-width: 479px) {
      hg-book-order-button {
        margin: 0 5px;
      }
    }
  `;
  constructor() {
    super();
    this._firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this._loggedIn = loggedIn;
    });
    window.addEventListener('scroll', _.throttle(100, () => this._scrolledDown = window.pageYOffset > 0));
  }
  render() {
    return html`
      <header>
        ${!this.promotedDynamicPathPageLoaded ? ''
          : html`
            <hg-icon-button
              .size=${'normal'}
              .icon=${'menu'}
              @click=${() => this.dispatchEvent(new CustomEvent('open-drawer'))}>
            </hg-icon-button>
          `}
        <hg-header-logo .scrolledDown=${this._scrolledDown} .noBannerImage=${this.noBannerImage}></hg-header-logo>
        <nav>
          ${!this.promotedDynamicPathPageLoaded ? '' : html`
            <hg-header-items
              .path=${this.path}
              .promotedDynamicPathPage=${this.promotedDynamicPathPage}
              .isLoggedIn=${this._loggedIn}
            >
            </hg-header-items>
          `}
          <hg-book-order-button
            .order=${(staticPathToPageUid[this.path] && (pagesStaticData[staticPathToPageUid[this.path]].parentPageUid === 'restaurant'))
              ? 'restaurant'
              : null}>
          </hg-book-order-button>
        </nav>
      </header>
    `;
  }
}
customElements.define('hg-header', HgHeader);
