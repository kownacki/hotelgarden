import {LitElement, html, css} from 'lit';
import {until} from 'lit/directives/until.js';
import {when} from 'lit/directives/when.js';
import {html as staticHtml, unsafeStatic} from 'lit/static-html.js';
import {getDefaultTitle, appendSuffixToTitle, getEventTitle} from '../../utils/seo.js';
import '../content/hg-article/hg-intro-article.js';
import {createDbPath, getFromDb} from '../utils/database.js';
import {setDocumentTitle, setMetaDescription, setStructuredData, scrollIntoView, sleep} from '../utils.js';
import '../elements/hg-footer.js';
import {PageType} from '../hg-app.js';
import sharedStyles from '../styles/shared-styles.js';
import './hg-page/hg-page-banner.js';
import './hg-page/hg-page-loading.js';

// Use static strings as identifiers to correctly trigger rollup code-splitting
const pagesModulesImports = {
  '404': () => import('../pages/hg-404.js'),
  'admin': () => import('../pages/hg-admin.js'),
  'banquet-halls': () => import('../pages/hg-banquet-halls.js'),
  'conference-halls': () => import('../pages/hg-conference-halls.js'),
  'conferences': () => import('../pages/hg-conferences.js'),
  'contact': () => import('../pages/hg-contact.js'),
  'cuisine': () => import('../pages/hg-cuisine.js'),
  'dynamic-path-pages': () => import('../pages/hg-dynamic-path-pages.js'),
  'family-parties': () => import('../pages/hg-family-parties.js'),
  'food-truck': () => import('../pages/hg-food-truck.js'),
  'gallery': () => import('../pages/hg-gallery.js'),
  'landing': () => import('../pages/hg-landing.js'),
  'lunch': () => import('../pages/hg-lunch.js'),
  'restaurant': () => import('../pages/hg-restaurant.js'),
  'reviews': () => import('../pages/hg-reviews.js'),
  'rooms': () => import('../pages/hg-rooms.js'),
  'summer-bar': () => import('../pages/hg-summer-bar.js'),
  'surroundings': () => import('../pages/hg-surroundings.js'),
  'villa-garden': () => import('../pages/hg-villa-garden.js'),
  'weddings': () => import('../pages/hg-weddings.js'),
};

const importPageModule = (pageUid) => {
  return pagesModulesImports[pageUid]();
}

let seconds = 0;
setInterval(() => ++seconds, 1000);

const getContentElement = async (pageUid, config, isInitialPage, handleSetMetaDescription, handleSetJsonLd) => {
  await importPageModule(pageUid);
  handleSetJsonLd(''); //todo refactor when setting structured data for pages
  return staticHtml`
    <hg-${unsafeStatic(pageUid)}
      id="page"
      .config=${config}
      .isInitialPage=${isInitialPage}
      @set-meta-description=${({detail: text}) => handleSetMetaDescription(text)}>
    </hg-${unsafeStatic(pageUid)}>
  `;
};

export class HgPage extends LitElement {
  static properties = {
    path: String,
    pageType: String, // PageType
    pageUid: String, // PageUid
    dynamicPathPage: Object, // DynamicPathPageEventWithUid | DynamicPathPageNewsWithUid | undefined
    dynamicPathPageReady: Boolean,
    promotedDynamicPathPage: Object, // DynamicPathPageEventWithUid | DynamicPathPageNewsWithUid | undefined
    promotedDynamicPathPageLoaded: Boolean,
    noBannerImage: {type: Boolean, reflect: true, attribute: 'no-banner-image'},
    isIntroArticleRemoved: Boolean,
    isIntroArticleHidden: Boolean,
    isInitialPage: Boolean,
    _defaultTitle: String,
    _config: Object,
  };
  static styles = [sharedStyles, css`
    :host([no-banner-image]) {
      display: flex;
      flex-direction: column;
      min-height: 100%;
      padding-top: 150px;
      box-sizing: border-box;
    }
    :host([no-banner-image]) .page {
      flex: 1;
    }
  `];
  constructor() {
    super();
    (async () => {
      this._config = await getFromDb(createDbPath('_config/client')) || {};
    })();
  }
  _getDynamicPathPageTitle(dynamicPathPage) {
    return dynamicPathPage
      ? getEventTitle(dynamicPathPage)
      : 'Nie znaleziono wydarzenia';
  }
  willUpdate(changedProperties) {
    if (changedProperties.has('path')) {
      if (this.pageType === PageType.STATIC_PATH) {
        this._defaultTitle = getDefaultTitle(this.pageUid);
      }
    }
    if (changedProperties.has('path') || changedProperties.has('dynamicPathPageReady')) {
      // Check if it's still on dynamic path page
      if (this.pageType === PageType.DYNAMIC_PATH && this.dynamicPathPageReady) {
        this._defaultTitle = this._getDynamicPathPageTitle(this.dynamicPathPage);
      }
    }
    if (changedProperties.has('_defaultTitle') || changedProperties.has('_config')) {
      //todo maybe add reloading config?
      if (!this.isInitialPage && this._defaultTitle && this._config) {
        const seoPageTitle = this._config.seo.urls?.[this.path]?.title;
        const fullTitle = appendSuffixToTitle(seoPageTitle || this._defaultTitle, this._config.seo);
        setDocumentTitle(fullTitle);
      }
    }
  }
  _handleSetMetaDescription(text) {
    if (!this.isInitialPage) {
      // todo on meta description change też się nie updatuje a powinno
      setMetaDescription(text);
    }
  }
  _handleSetJsonLd(jsonLd) {
    if (!this.isInitialPage) {
      // todo on set structured data change też się nie updatuje a powinno
      setStructuredData(jsonLd);
    }
  }
  render() {
    return html`
      <app-location use-hash-as-path @route-changed=${async (event) => {
        await sleep(seconds === 0 ? 1000 : 200);
        const hash = event.detail.value.path;
        if (hash && hash !== 'slider' && hash !== 'dialog' && hash !== 'max-widget') {
          const element = this.shadowRoot.getElementById('page').shadowRoot.getElementById(hash);
          scrollIntoView(element);
        }
      }}></app-location>
      <hg-page-banner
        .path=${this.path}
        .pageType=${this.pageType}
        .pageUid=${this.pageUid}
        .dynamicPathPage=${this.dynamicPathPage}
        .dynamicPathPageReady=${this.dynamicPathPageReady}
        .defaultTitle=${this._defaultTitle}
        .noBannerImage=${this.noBannerImage}
        .isInitialPage=${this.isInitialPage}>
      </hg-page-banner>
      <div class="page">
        ${this.pageType === PageType.DYNAMIC_PATH
          ? until(import('./hg-dynamic-path-page.js').then(() => {
            return (this.dynamicPathPageReady && this.promotedDynamicPathPageLoaded) ? html`
              <hg-dynamic-path-page
                .dynamicPathPage=${this.dynamicPathPage}
                .promotedDynamicPathPage=${this.promotedDynamicPathPage}
                @set-meta-description=${({detail: text}) => {
                  this._handleSetMetaDescription(text);
                }}
                @set-json-ld=${({detail: jsonLd}) => {
                  this._handleSetJsonLd(jsonLd);
                }}>
              </hg-dynamic-path-page>
            ` : html`<hg-page-loading></hg-page-loading>`;
          }), html`<hg-page-loading></hg-page-loading>`)
          : html`
            ${when(
              this.pageUid,
              () => html`
                ${when(
                  !this.isIntroArticleRemoved,
                  () => html`
                    <hg-intro-article
                      .uid=${this.pageUid}
                      .isInitialPage=${this.isInitialPage}
                      ?hidden=${this.isIntroArticleHidden}
                    >
                    </hg-intro-article>
                  `,
                )}
                ${until(getContentElement(
                  this.pageUid,
                  this._config,
                  this.isInitialPage,
                  (text) => this._handleSetMetaDescription(text),
                  (jsonLd) => this._handleSetJsonLd(jsonLd),
                ), html`<hg-page-loading></hg-page-loading>`)}
              `,
            )}
          `}
      </div>
      <hg-footer></hg-footer>
    `;
  }
}
customElements.define('hg-page', HgPage);
