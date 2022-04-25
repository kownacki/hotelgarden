import {LitElement, html, css} from 'lit';
import {until} from 'lit/directives/until.js';
import {html as staticHtml, unsafeStatic} from 'lit/static-html.js';
import {getDefaultTitle, appendSuffixToTitle, getEventTitle} from '../../utils/seo.js';
import {createDbPath, getFromDb} from '../utils/database.js';
import {setDocumentTitle, setMetaDescription, setStructuredData, scrollIntoView, sleep} from '../utils.js';
import '../elements/hg-footer.js';
import {ContentType} from '../hg-app.js';
import './hg-page/hg-page-banner.js';
import './hg-page/hg-page-loading.js';

// todo put hg-event in elements

// Use static strings as identifiers to correctly trigger rollup code-splitting
const pagesModulesImports = {
  'landing': () => import('../pages/hotel/hg-landing.js'),
  'villa-garden': () => import('../pages/hotel/hg-villa-garden.js'),
  'cuisine': () => import('../pages/hotel/hg-cuisine.js'),
  'surroundings': () => import('../pages/hotel/hg-surroundings.js'),
  'reviews': () => import('../pages/hotel/hg-reviews.js'),
  'rooms': () => import('../pages/rooms/hg-rooms.js'),
  'conferences': () => import('../pages/conferences/hg-conferences.js'),
  'conference-halls': () => import('../pages/conferences/hg-conference-halls.js'),
  'restaurant': () => import('../pages/restaurant/hg-restaurant.js'),
  'lunch': () => import('../pages/restaurant/hg-lunch.js'),
  'weddings': () => import('../pages/celebrations/hg-weddings.js'),
  'family-parties': () => import('../pages/celebrations/hg-family-parties.js'),
  'banquet-halls': () => import('../pages/celebrations/hg-banquet-halls.js'),
  'gallery': () => import('../pages/gallery/hg-gallery.js'),
  'events': () => import('../pages/events/hg-events.js'),
  'contact': () => import('../pages/contact/hg-contact.js'),
  '404': () => import('../pages/404/hg-404.js'),
};

const importPageModule = (pageUid) => {
  return pagesModulesImports[pageUid]();
}

let seconds = 0;
setInterval(() => ++seconds, 1000);

const getContentElement = async (pageUid, config, handleSetMetaDescription, handleSetJsonLd) => {
  await importPageModule(pageUid);
  handleSetJsonLd(''); //todo refactor when setting structured data for pages
  return staticHtml`
    <hg-${unsafeStatic(pageUid)}
      id="page"
      class="page"
      .config=${config}
      @set-meta-description=${({detail: text}) => handleSetMetaDescription(text)}>
    </hg-${unsafeStatic(pageUid)}>
  `;
};

export class HgPage extends LitElement {
  static properties = {
    path: String,
    contentType: String, // ContentType
    pageUid: String, // PageUid
    eventData: Object, // EventData | undefined
    eventsList: Object, // EventsList | undefined
    eventDataReady: Boolean,
    promotedEventData: Object, // EventData | undefined
    promotedEventLoaded: Boolean,
    noBannerImage: {type: Boolean, reflect: true, attribute: 'no-banner-image'},
    _initialPage: Boolean,
    _defaultTitle: String,
    _config: Object,
  };
  static styles = css`
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
  `;
  constructor() {
    super();
    this._initialPage = true;
    (async () => {
      this._config = await getFromDb(createDbPath('_config/client')) || {};
    })();
  }
  _getEventTitle(eventData) {
    return eventData.event
      ? getEventTitle(eventData.event)
      : 'Nie znaleziono wydarzenia';
  }
  willUpdate(changedProperties) {
    if (changedProperties.has('path')) {
      if (this.contentType === ContentType.PAGE) {
        this._defaultTitle = getDefaultTitle(this.pageUid);
      }
    }
    if (changedProperties.has('path') || changedProperties.has('eventDataReady')) {
      // Check if it's still on an event page
      if (this.contentType === ContentType.EVENT && this.eventDataReady) {
        this._defaultTitle = this._getEventTitle(this.eventData);
      }
    }
    if (changedProperties.has('path') && changedProperties.get('path') !== undefined) {
      this._initialPage = false;
    }
    if (changedProperties.has('_defaultTitle') || changedProperties.has('_config')) {
      //todo maybe add reloading config?
      if (!this._initialPage && this._defaultTitle && this._config) {
        const seoPageTitle = this._config.seo.urls?.[this.path]?.title;
        const fullTitle = appendSuffixToTitle(seoPageTitle || this._defaultTitle, this._config.seo);
        setDocumentTitle(fullTitle);
      }
    }
  }
  _handleSetMetaDescription(text) {
    if (!this._initialPage) {
      // todo on meta description change też się nie updatuje a powinno
      setMetaDescription(text);
    }
  }
  _handleSetJsonLd(jsonLd) {
    if (!this._initialPage) {
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
        .contentType=${this.contentType}
        .pageUid=${this.pageUid}
        .eventData=${this.eventData}
        .eventDataReady=${this.eventDataReady}
        .defaultTitle=${this._defaultTitle}
        .noBannerImage=${this.noBannerImage}>
      </hg-page-banner>
      ${this.contentType === ContentType.EVENT
        ? until(import('./hg-event.js').then(() => {
          return (this.eventDataReady && this.promotedEventLoaded) ? html`
            <hg-event
              class="page"
              .eventData=${this.eventData}
              .eventsList=${this.eventsList}
              .promotedEventData=${this.promotedEventData}
              @set-meta-description=${({detail: text}) => {
                this._handleSetMetaDescription(text);
              }}
              @set-json-ld=${({detail: jsonLd}) => {
                this._handleSetJsonLd(jsonLd);
              }}>
            </hg-event>
          ` : html`<hg-page-loading></hg-page-loading>`;
        }), html`<hg-page-loading></hg-page-loading>`)
        : html`
          ${!this.pageUid ? '' : until(getContentElement(
            this.pageUid,
            this._config,
            (text) => this._handleSetMetaDescription(text),
            (jsonLd) => this._handleSetJsonLd(jsonLd),
          ), html`<hg-page-loading></hg-page-loading>`)}
        `}
      <hg-footer></hg-footer>
    `;
  }
}
customElements.define('hg-page', HgPage);
