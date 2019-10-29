import { LitElement, html, css } from 'https://unpkg.com/lit-element@^2.2.1/lit-element.js?module';
import 'https://unpkg.com/@material/mwc-button@^0.9.1/mwc-button.js?module';
import 'https://unpkg.com/@polymer/app-route@^3.0.2/app-location.js?module';
import 'https://unpkg.com/@polymer/app-route@^3.0.2/app-route.js?module';
import 'https://unpkg.com/@polymer/app-layout@^3.1.0/app-layout.js?module';
import './hg-header.js';
import './hg-menu/hg-menu.js';
import './hg-gallery/hg-gallery.js';

class HgApp extends LitElement {
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
      iron-image {
        display: block;
        height: 100vh;
        position: static;
      }
      .content {
        margin: auto;
        max-width: 1300px;
      }
    `;
  }
  render(){
    return html`
      <iron-image src="https://picsum.photos/id/174/1920/980" sizing="cover"></iron-image>
      <app-header-layout>
        <app-header id="header" slot="header" fixed>
          <hg-header></hg-header>
        </app-header>
        <div>
          <app-location @route-changed=${(event) => this._page = event.detail.value.path}></app-location>

          ${this._page === '/'
            ? html`<div name="landing" class="content"><hg-menu></hg-menu></div>`
            : this._page === '/galeria'
            ? html`<hg-gallery @hide-header=${() => this.shadowRoot.getElementById('header').style.display = 'none'}></hg-gallery>`
            : html`<div name="kupa">Page 1</div>`}
        </div>
      </app-header-layout>
    `;
  }
}
customElements.define('hg-app', HgApp);
