import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import {LitElement, html, css} from 'lit-element';
import {pathToUid, db} from './utils.js';

import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-route/app-location';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icons';
import '@polymer/iron-icons/image-icons.js';
import '@polymer/iron-icons/maps-icons.js';
import '@polymer/iron-icon';
import '@polymer/iron-image';
import '@polymer/paper-button';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-icon-button';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import '@polymer/paper-dialog';
import '@polymer/paper-fab';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@material/mwc-button';
import '@material/mwc-textfield';
import '@polymer/paper-styles/color';

import './elements/hg-header.js';
import './elements/hg-page.js';
import './elements/hg-drawer.js';

customElements.define('hg-app', class extends LitElement {
  static get properties() {
    return {
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
  }
  constructor() {
    super();
    (async () => {
      const promotedEventUid = _.get('uid', (await db.doc('events/promoted').get()).data());
      if (promotedEventUid) {
        this._promotedEvent = {
          uid: promotedEventUid,
          title: _.get(promotedEventUid + '.title', (await db.doc('events/events').get()).data()),
        };
      }
      this._promotedEventLoaded = true;
    })();
    const pathString = window.location.pathname;
    this._path = (pathString.slice(-1) === '/' && pathString.length !== 1) ? pathString.slice(0, -1) : pathString;
    this._enableDrawer = (window.innerWidth < 1100);
    window.addEventListener('resize', _.throttle(100, () => {
      (window.innerWidth < 1100)
        ? this._enableDrawer = true
        : (this.shadowRoot.getElementById('drawer') && this.shadowRoot.getElementById('drawer').close());
    }));
  }
  async updated(changedProperties) {
    if (changedProperties.has('_path')) {
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
  static get styles() {
    return css`
      app-drawer {
        z-index: var(--layer-header-1);
      }
      hg-drawer {
        background: white;
      }
    `;
  }
  render(){
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
});
