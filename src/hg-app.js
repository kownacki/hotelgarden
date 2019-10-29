import { LitElement, html, css } from 'https://unpkg.com/lit-element@^2.2.1/lit-element.js?module';
import 'https://unpkg.com/@material/mwc-button@^0.9.1/mwc-button.js?module';
import 'https://unpkg.com/@polymer/app-route@^3.0.2/app-location.js?module';
import 'https://unpkg.com/@polymer/app-route@^3.0.2/app-route.js?module';
import './hg-header.js';
import './hg-landing.js';
import './hg-menu/hg-menu.js';
import './hg-gallery/hg-gallery.js';

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
      <hg-header></hg-header>
      <app-location @route-changed=${(event) => this._page = event.detail.value.path}></app-location>
      ${this._page === '/'
        ? html`<div class="content"><hg-landing></hg-landing></div>`
        : this._page === '/galeria'
        ? html`<hg-gallery @hide-header=${() => this.shadowRoot.getElementById('header').style.display = 'none'}></hg-gallery>`
        :  this._page === '/kuchnia'
        ? html`<div class="content"><hg-menu></hg-menu></div>`
        : html`<div>Page 1</div>`}
    `;
  }
});
