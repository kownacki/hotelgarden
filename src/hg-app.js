import {LitElement, html, css} from 'lit';
import {onAuthStateChanged} from 'firebase/auth';
import {auth, createDbPath, getFromDb} from './utils/database.js';
import {pathToUid} from './utils.js';
import './hg-iconset.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-route/app-location.js';
import '@polymer/iron-icon';
import '@polymer/iron-image';
import '@polymer/paper-button';
import '@polymer/paper-icon-button';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-dialog';
import '@polymer/paper-styles/color.js';

import './elements/hg-header.js';
import './elements/hg-page.js';
import './elements/hg-drawer.js';

// For index.html !
onAuthStateChanged(auth, (user) => {
  window.loggedIn = Boolean(user);
  hideOrShowWidget();
})

export class HgApp extends LitElement {
  static properties = {
    _route: Object,
    _tail: Object,
    _path: String,
    _event: String,
    _uid: String,
    _noBannerImage: Boolean,
    _promotedEvent: Object,
    _promotedEventLoaded: Boolean,
    _enableDrawer: Boolean,
    _drawerOnceOpened: Boolean,
  };
  static styles = css`
    app-drawer {
      z-index: var(--layer-header-1);
    }
    hg-drawer {
      background: white;
    }
  `;
  constructor() {
    super();

    const pathString = window.location.pathname;
    this._path = (pathString.slice(-1) === '/' && pathString.length !== 1) ? pathString.slice(0, -1) : pathString;
    this._enableDrawer = (window.innerWidth < 1100);

    (async () => {
      const promotedEventUid = await getFromDb(createDbPath('events/promoted', 'uid'));
      if (promotedEventUid) {
        const events = await getFromDb(createDbPath('events/events'));
        this._promotedEvent = {
          uid: promotedEventUid,
          title: _.get(promotedEventUid + '.title', events),
          date: _.get(promotedEventUid + '.date', events),
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
        this.shadowRoot.getElementById('drawer')?.close();
      }
    }));
  }
  async updated(changedProperties) {
    if (changedProperties.has('_path')) {
      if (window.location.hostname === 'www.hotelgarden.pl') {
        ga('set', 'page', this._path);
        ga('send', 'pageview');
      }
      if (/^\/wydarzenia\/[^\/]+$/.test(this._path)) {
        this._event = true;
        this._uid =_.replace('/wydarzenia/', '', this._path);
        this._noBannerImage = false;
      } else {
        this._event = false;
        this._uid = pathToUid[this._path] || '404';
        this._noBannerImage = _.includes(this._uid, ['contact', 'gallery', '404']);
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
        @open-drawer=${() => this.shadowRoot.getElementById('drawer').open()}>
      </hg-header>
      <hg-page 
        .event=${this._event}
        .path=${this._path}
        .uid=${this._uid}
        .noBannerImage=${this._noBannerImage}
        @event-not-found=${() => this._noBannerImage = true}>
      </hg-page>
      <!--todo somehow prevent scrolling parent when on android -->
      ${!this._promotedEventLoaded || !this._enableDrawer ? ''
        : html`<app-drawer id="drawer" .swipeOpen=${true} @opened-changed=${(event) => event.detail.value ? this._drawerOnceOpened = true : ''}>
          ${!this._drawerOnceOpened ? ''
            : html`<hg-drawer
            .selected=${this._path}
            .promotedEvent=${this._promotedEvent}
            @close-drawer=${() => this.shadowRoot.getElementById('drawer').close()}>
          </hg-drawer>`}
        </app-drawer>`}
    `;
  }
}
customElements.define('hg-app', HgApp);
