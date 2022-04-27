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
  async _getPromotedEvent(eventsListPromise) {
    const promotedEventUid = await getFromDb(createDbPath('events/promoted', 'uid'));
    const eventsList = await eventsListPromise;
    this._promotedEventData = getPromotedEventData(promotedEventUid, eventsList);
    this._promotedEventLoaded = true;
  }
  async _getEventData(eventsListPromise) {
    this._eventDataReady = false;
    const uid = getEventUid(this._path);
    this._eventsList = await eventsListPromise;
    const event = this._eventsList[uid];
    this._eventData = {
      uid,
      event,
    };
    this._eventDataReady = true;
    this._noBannerImage = !event;
  }
  _getPageData() {
    this._pageUid = staticPathToPageUid[this._path] || '404';
    this._noBannerImage = ['contact', 'gallery', '404'].includes(this._pageUid);
  }
  willUpdate(changedProperties) {
    if (changedProperties.has('_path')) {
      const eventsListPromise = getFromDb(createDbPath('events/events'));
      this._getPromotedEvent(eventsListPromise);

      if (isEventPath(this._path)) {
        this._contentType = ContentType.EVENT;
        this._getEventData(eventsListPromise);
      } else {
        this._contentType = ContentType.PAGE;
        this._eventData = undefined;
        this._getPageData();
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
        .noBannerImage=${this._noBannerImage}>
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
