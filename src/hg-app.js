import {LitElement, html, css} from 'lit';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-dialog';
import {getEventUid, isEventPath, staticPathToPageUid} from '../utils/urlStructure.js';
import './elements/hg-header.js';
import './elements/hg-page.js';
import './elements/hg-drawer.js';
import {authDeferred, createDbPath, getFromDb} from './utils/database.js';

// For index.html !
authDeferred.then(({auth, onAuthStateChanged}) => {
  onAuthStateChanged(auth, (user) => {
    window.loggedIn = Boolean(user);
    hideOrShowWidget();
  });
});

export class HgApp extends LitElement {
  static properties = {
    _path: String,
    _event: String,
    _uid: String,
    _noBannerImage: Boolean,
    _promotedEvent: Object,
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

    (async () => {
      const promotedEventUid = await getFromDb(createDbPath('events/promoted', 'uid'));
      if (promotedEventUid) {
        const eventsList = await getFromDb(createDbPath('events/events'));
        this._promotedEvent = {
          uid: promotedEventUid,
          title: _.get(promotedEventUid + '.title', eventsList),
          date: _.get(promotedEventUid + '.date', eventsList),
        };
      }
      this._promotedEventLoaded = true;
    })();
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
  willUpdate(changedProperties) {
    if (isEventPath(this._path)) {
      this._event = true;
      this._uid = getEventUid(this._path);
      this._noBannerImage = false;
    } else {
      this._event = false;
      this._uid = staticPathToPageUid[this._path] || '404';
      this._noBannerImage = _.includes(this._uid, ['contact', 'gallery', '404']);
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
        .promotedEvent=${this._promotedEvent}
        .promotedEventLoaded=${this._promotedEventLoaded}
        @open-drawer=${() => this.shadowRoot.getElementById('drawer')?.drawer?.open()}>
      </hg-header>
      <hg-page
        .event=${this._event}
        .path=${this._path}
        .uid=${this._uid}
        .noBannerImage=${this._noBannerImage}
        @event-not-found=${() => this._noBannerImage = true}>
      </hg-page>
      <!--todo somehow prevent scrolling parent when on android -->
      ${!this._promotedEventLoaded || !this._enableDrawer ? '' : html`
        <hg-drawer
          id="drawer"
          .selected=${this._path}
          .promotedEvent=${this._promotedEvent}>
        </hg-drawer>
      `}
    `;
  }
}
customElements.define('hg-app', HgApp);
