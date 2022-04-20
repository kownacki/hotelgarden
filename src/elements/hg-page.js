import {LitElement, html, css} from 'lit';
import {html as staticHtml, unsafeStatic} from 'lit/static-html.js';
import {getDefaultTitle, appendSuffixToTitle} from '../../utils/seo.js';
import {createDbPath, getFromDb} from '../utils/database.js';
import {setDocumentTitle, setMetaDescription, setStructuredData, headerHeight, sleep} from '../utils.js';

import '../elements/hg-banner.js';
import '../elements/hg-footer.js';

// todo put hg-event in elements
import '../pages/events/hg-event.js';
import '../pages/hotel/hg-landing.js';
import '../pages/hotel/hg-villa-garden.js';
import '../pages/hotel/hg-cuisine.js';
import '../pages/hotel/hg-surroundings.js';
import '../pages/hotel/hg-reviews.js';
import '../pages/rooms/hg-rooms.js';
import '../pages/restaurant/hg-restaurant.js';
import '../pages/restaurant/hg-lunch.js';
import '../pages/conferences/hg-conferences.js';
import '../pages/conferences/hg-conference-halls.js';
import '../pages/celebrations/hg-weddings.js';
import '../pages/celebrations/hg-family-parties.js';
import '../pages/celebrations/hg-banquet-halls.js';
import '../pages/gallery/hg-gallery.js';
import '../pages/events/hg-events.js';
import '../pages/contact/hg-contact.js';
import '../pages/404/hg-404.js';

let seconds = 0;
setInterval(() => ++seconds, 1000);

const getContentElement = (pageUid, config, handleSetMetaDescription, handleSetJsonLd) => {
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
    event: Boolean,
    path: String,
    uid: String,
    noBannerImage: {type: Boolean, reflect: true, attribute: 'no-banner-image'},
    eventTitle: String,
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
  willUpdate(changedProperties) {
    if (changedProperties.has('uid') && changedProperties.get('uid') !== undefined) {
      this._initialPage = false;
    }
    if (changedProperties.has('uid') && !this.event) {
      this._defaultTitle = getDefaultTitle(this.uid);
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
          element.scrollIntoView();
          window.scrollBy(0, -headerHeight);
        }
      }}></app-location>
      ${this.event
        ? html`<hg-event 
          .uid=${this.uid}
          class="page"
          @title-loaded=${({detail: title}) => {
            this._defaultTitle = title || 'Wydarzenie bez tytułu';
          }}
          @set-meta-description=${({detail: text}) => {
            this._handleSetMetaDescription(text);
          }}
          @set-json-ld=${({detail: jsonLd}) => {
            this._handleSetJsonLd(jsonLd);
          }}>
        </hg-event>`
        : html`
          <hg-banner .noImage=${this.noBannerImage} .uid=${this.uid}></hg-banner>
          ${this.uid ? getContentElement(
            this.uid,
            this._config,
            (text) => this._handleSetMetaDescription(text),
            (jsonLd) => this._handleSetJsonLd(jsonLd),
          ) : ''}
        `}
      <hg-footer></hg-footer>
    `;
  }
}
customElements.define('hg-page', HgPage);
