import {LitElement, html, css} from 'lit';
import '@polymer/app-route/app-location.js';
import {getEventPermalink, isEventPath, staticPathToPageUid} from '../utils/urlStructure.js';
import './elements/hg-header.js';
import './elements/hg-page.js';
import {sleep, isProductionEnvironment, getAllDynamicPathPages} from './utils.js';
import {authDeferred, createDbPath, getFromDb} from './utils/database.js';
import {convertDynamicPathPagesToEventsList, getPromotedEventData} from '../utils/events.js';

// For index.html !
authDeferred.then(({auth, onAuthStateChanged}) => {
  onAuthStateChanged(auth, (user) => {
    window.loggedIn = Boolean(user);
    hideOrShowWidget();
  });
});

export const PageType = {
  STATIC_PATH: 'static',
  DYNAMIC_PATH: 'dynamic',
};

export class HgApp extends LitElement {
  _drawer;
  static properties = {
    _path: String,
    _initialPage: Boolean,
    _pageType: String, // PageType
    _pageUid: String, // PageUid
    _dynamicPathPage: Object, // DynamicPathPageEventWithUid | DynamicPathPageNewsWithUid | undefined
    _dynamicPathPageReady: Boolean,
    _noBannerImage: Boolean,
    _promotedEventData: Object, // EventData | undefined
    _promotedEventLoaded: Boolean,
    _enableDrawer: Boolean,
  };
  static styles = css`
  `;
  constructor() {
    super();
    // In development there is no upfront data from server, so disable this option.
    this._initialPage = isProductionEnvironment();

    const pathString = window.location.pathname;
    this._path = (pathString.slice(-1) === '/' && pathString.length !== 1) ? pathString.slice(0, -1) : pathString;
    this._enableDrawer = (window.innerWidth < 1100);
  }
  firstUpdated() {
    window.addEventListener('resize', _.throttle(100, () => {
      if (window.innerWidth < 1100) {
        this._enableDrawer = true;
      } else {
        this.shadowRoot.getElementById('drawer')?.drawer?.close();
      }
    }));
  }
  _getPageUid(path) {
    return staticPathToPageUid[path] || '404';
  }
  _getDataPromises(initialPage, initialData) {
    if (initialPage) {
      return {
        eventsList: initialData.eventsList,
        promotedEventUid: initialData.promotedEventUid,
      };
    } else {
      return {
        eventsList: getAllDynamicPathPages().then((dynamicPathPages) => convertDynamicPathPagesToEventsList(dynamicPathPages)),
        promotedEventUid: getFromDb(createDbPath('events/promoted', 'uid')),
      };
    }
  }
  async _getPromotedEventData(dataPromises) {
    const promotedEventUid = await dataPromises.promotedEventUid;
    const eventsList =  await dataPromises.eventsList;
    return getPromotedEventData(promotedEventUid, eventsList);
  }
  async _getEventsList(dataPromises) {
    return await dataPromises.eventsList;
  }
  _getPageData(path) {
    const pageUid = this._getPageUid(path);
    return {
      pageUid,
      noBannerImage: ['contact', 'gallery', '404'].includes(pageUid),
    };
  }
  async _getDynamicPathPage(dynamicPathPagePermalink, dataPromises) {
    const eventsList = await this._getEventsList(dataPromises);
    const dynamicPathPage = eventsList[dynamicPathPagePermalink];
    return {
      dynamicPathPage,
      noBannerImage: !dynamicPathPage,
    };
  }
  willUpdate(changedProperties) {
    if (changedProperties.has('_path') && changedProperties.get('_path') !== undefined) {
      this._initialPage = false;
    }
    if (changedProperties.has('_path')) {
      this._pageType = isEventPath(this._path) ? PageType.DYNAMIC_PATH : PageType.STATIC_PATH;
      const dataPromises = this._getDataPromises(this._initialPage, window.initialData);

      (async () => {
        this._promotedEventData = await this._getPromotedEventData(dataPromises);
        this._promotedEventLoaded = true;
      })();

      if (this._pageType === PageType.STATIC_PATH) {
        const {pageUid, noBannerImage} = this._getPageData(this._path);
        this._pageUid = pageUid;
        this._dynamicPathPage = undefined;
        this._dynamicPathPageReady = undefined;
        this._noBannerImage = noBannerImage;
      } else {
        const dynamicPathPagePermalink = getEventPermalink(this._path);
        this._pageUid = undefined;
        this._dynamicPathPageReady = false;
        (async () => {
          const {dynamicPathPage, noBannerImage} = await this._getDynamicPathPage(dynamicPathPagePermalink, dataPromises);
          this._dynamicPathPage = dynamicPathPage;
          this._dynamicPathPageReady = true;
          this._noBannerImage = noBannerImage;
        })();
      }
    }
  }
  updated(changedProperties) {
    if (changedProperties.has('_path')) {
      if (window.location.hostname === 'www.hotelgarden.pl') {
        ga('set', 'page', this._path);
        ga('send', 'pageview');
      }
    }
  }
  render() {
    return html`
      <app-location @route-changed=${(event) => {
        this._path = event.detail.value.path;
        window.scrollTo(0, 0);
      }}></app-location>
      <hg-header
        id="header"
        .noBannerImage=${this._noBannerImage}
        .selected=${this._path}
        .promotedEventData=${this._promotedEventData}
        .promotedEventLoaded=${this._promotedEventLoaded}
        @open-drawer=${async () => {
          if (!this._drawer) {
            await import('./elements/hg-drawer.js');
            await sleep();
            this._drawer = this.shadowRoot.getElementById('drawer').drawer;
          }
          this._drawer.open();
        }}>
      </hg-header>
      <hg-page
        .path=${this._path}
        .pageType=${this._pageType}
        .pageUid=${this._pageUid}
        .dynamicPathPage=${this._dynamicPathPage}
        .dynamicPathPageReady=${this._dynamicPathPageReady}
        .promotedEventData=${this._promotedEventData}
        .promotedEventLoaded=${this._promotedEventLoaded}
        .noBannerImage=${this._noBannerImage}
        .initialPage=${this._initialPage}>
      </hg-page>
      <!--todo somehow prevent scrolling parent when on android -->
      ${!this._promotedEventLoaded || !this._enableDrawer ? '' : html`
        <hg-drawer
          id="drawer"
          .selected=${this._path}
          .promotedEventData=${this._promotedEventData}>
        </hg-drawer>
      `}
    `;
  }
}
customElements.define('hg-app', HgApp);
