import {LitElement, html, css} from 'lit';
import '@polymer/app-route/app-location.js';
import {getEventUid, isEventPath, staticPathToPageUid} from '../utils/urlStructure.js';
import './elements/hg-header.js';
import './elements/hg-page.js';
import {sleep} from './utils.js';
import {authDeferred, createDbPath, getFromDb} from './utils/database.js';
import {getPromotedEventData} from '../utils/events.js';

// For index.html !
authDeferred.then(({auth, onAuthStateChanged}) => {
  onAuthStateChanged(auth, (user) => {
    window.loggedIn = Boolean(user);
    hideOrShowWidget();
  });
});

export const ContentType = {
  PAGE: 'page',
  EVENT: 'event',
};

export class HgApp extends LitElement {
  static properties = {
    _path: String,
    _initialPage: Boolean,
    _contentType: String, // ContentType
    _pageUid: String, // PageUid | EventUid (depending on content type)
    _eventsList: Object, // EventsList | undefined
    _eventData: Object, // EventData | undefined
    _eventDataReady: Boolean,
    _noBannerImage: Boolean,
    _promotedEventData: Object, // EventData | undefined
    _promotedEventLoaded: Boolean,
    _enableDrawer: Boolean,
  };
  static styles = css`
  `;
  constructor() {
    super();
    this._initialPage = true;

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
  _getDataPromises(initialPage, initialData) {
    if (initialPage) {
      return {
        eventsList: initialData.eventsList,
        promotedEventUid: initialData.promotedEventUid,
      };
    } else {
      return {
        eventsList: getFromDb(createDbPath('events/events')),
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
    const pageUid = staticPathToPageUid[path] || '404';
    return {
      pageUid,
      noBannerImage: ['contact', 'gallery', '404'].includes(pageUid),
    };
  }
  async _getEventData(eventUid, dataPromises) {
    const eventsList = await this._getEventsList(dataPromises);
    const event = eventsList[eventUid];
    return {
      eventData: {
        uid: eventUid,
        event,
      },
      eventsList,
      noBannerImage: !event,
    };
  }
  willUpdate(changedProperties) {
    if (changedProperties.has('_path') && changedProperties.get('_path') !== undefined) {
      this._initialPage = false;
    }
    if (changedProperties.has('_path')) {
      this._contentType = isEventPath(this._path) ? ContentType.EVENT : ContentType.PAGE;
      const initialPage = this._initialPage && window.environment === 'production';
      const dataPromises = this._getDataPromises(initialPage, window.initialData);

      (async () => {
        this._promotedEventData = await this._getPromotedEventData(dataPromises);
        this._promotedEventLoaded = true;
      })();

      if (this._contentType === ContentType.PAGE) {
        const {pageUid, noBannerImage} = this._getPageData(this._path);
        this._pageUid = pageUid;
        this._eventsList = undefined;
        this._eventData = undefined;
        this._eventDataReady = undefined;
        this._noBannerImage = noBannerImage;
      } else {
        const eventUid = getEventUid(this._path);
        this._pageUid = undefined;
        this._eventDataReady = false;
        (async () => {
          const {eventData, eventsList, noBannerImage} = await this._getEventData(eventUid, dataPromises);
          this._eventsList = eventsList;
          this._eventData = eventData;
          this._eventDataReady = true;
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
        .contentType=${this._contentType}
        .pageUid=${this._pageUid}
        .eventData=${this._eventData}
        .eventsList=${this._eventsList}
        .eventDataReady=${this._eventDataReady}
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
