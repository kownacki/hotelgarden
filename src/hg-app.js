import {LitElement, html, css} from 'lit-element';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import moment from 'moment';
import 'moment/src/locale/pl';
moment.locale('pl');

import '@polymer/app-route/app-location';
import '@polymer/iron-icons';
import '@polymer/iron-icon';
import '@polymer/iron-image';
import '@polymer/paper-icon-button';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-dialog';
import '@material/mwc-button';
import '@material/mwc-textfield';
import '@polymer/paper-styles/color';

import './hg-banner.js';
import './hg-header/hg-header.js';
import './hg-landing.js';
import './hg-menu/hg-menu.js';
import './hg-gallery/hg-gallery.js';
import './hg-events/hg-events.js';
import './hg-events/hg-event.js';

firebase.initializeApp({
  apiKey: "AIzaSyDvamIugzBC3k3WA52KpHeINrfDHfkvnSs",
  authDomain: "pl-hotelgarden.firebaseapp.com",
  databaseURL: "https://pl-hotelgarden.firebaseio.com",
  projectId: "pl-hotelgarden",
  storageBucket: "pl-hotelgarden.appspot.com",
  messagingSenderId: "439170507609",
  appId: "1:439170507609:web:d50495f3bf9c9613702248",
  measurementId: "G-T7DQCNYLP2"
});

customElements.define('hg-app', class extends LitElement {
  static get properties() {
    return {
      _route: Object,
      _tail: Object,
      _page: String,
    };
  }
  constructor() {
    super();
    this._page = window.location.pathname;
  }
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .content {
        margin: auto;
        max-width: 1300px;
      }
    `;
  }
  render(){
    return html`
      <app-location @route-changed=${(event) => this._page = event.detail.value.path}></app-location>
      <hg-header id="header" .selected=${this._page}></hg-header>
      ${this._page === '/hotel' || this._page === '/'
        ? html`<hg-landing
          @hide-header=${() => this.shadowRoot.getElementById('header').style.display = 'none'}
          @show-header=${() => this.shadowRoot.getElementById('header').style.display = 'block'}>
        </hg-landing>`
        : this._page === '/pokoje'
        ? html`<hg-banner 
          .src=${'https://picsum.photos/id/514/1920/980'}
          .heading=${'Pokoje'}
          .subheading=${'Lorem ipsum dolor sit amet consectetur adipiscing elit'}>
        </hg-banner>`
        : this._page === '/konferencje' 
        ? html`<hg-banner 
          .src=${'https://picsum.photos/id/3/1920/980'}
          .heading=${'Konferencje'}
          .subheading=${'Lorem ipsum dolor sit amet consectetur adipiscing elit'}>
        </hg-banner>`
        : this._page === '/kuchnia'
        ? html`<hg-menu></hg-menu>`
        : this._page === '/galeria'
        ? html`<hg-banner 
          .src=${'https://picsum.photos/id/802/1920/980'}
          .heading=${'Galeria'}
          .subheading=${'Lorem ipsum dolor sit amet consectetur adipiscing elit'}>
        </hg-banner><hg-gallery 
          @hide-header=${() => this.shadowRoot.getElementById('header').style.display = 'none'}
          @show-header=${() => this.shadowRoot.getElementById('header').style.display = 'block'}>
        </hg-gallery>`
        : this._page === '/wydarzenia'
        ? html`<hg-banner 
          .src=${'https://picsum.photos/id/590/1920/980'}
          .heading=${'Wydarzenia'}
          .subheading=${'Lorem ipsum dolor sit amet consectetur adipiscing elit'}>
        </hg-banner><hg-events></hg-events>`
        : _.startsWith('/wydarzenia/', this._page)
        ? html`<hg-event .uid=${_.replace('/wydarzenia/', '', this._page)}></hg-event>`
        : html`<div>brak strony</div>`}
    `;
  }
});
