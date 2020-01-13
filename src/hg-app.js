import {LitElement, html, css} from 'lit-element';
import {pathToUid} from './utils.js';
import moment from 'moment';
import 'moment/src/locale/pl';
moment.locale('pl');

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
import '@material/mwc-button';
import '@material/mwc-textfield';
import '@polymer/paper-styles/color';

import './elements/hg-header.js';
import './elements/hg-page.js';

customElements.define('hg-app', class extends LitElement {
  static get properties() {
    return {
      _route: Object,
      _tail: Object,
      _path: String,
    };
  }
  constructor() {
    super();
    this._path = window.location.pathname;
  }
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }
  render(){
    return html`
      <app-location @route-changed=${(event) => {
        this._path = event.detail.value.path;
        window.scrollTo(0, 0);
      }}></app-location>
      <hg-header id="header" .noBanner=${pathToUid[this._path] === 'contact'} .selected=${this._path}></hg-header>
      <hg-page 
        .path=${this._path}
        @hide-header=${() => this.shadowRoot.getElementById('header').style.display = 'none'}
        @show-header=${() => this.shadowRoot.getElementById('header').style.display = 'block'}>
      </hg-page>
    `;
  }
});
