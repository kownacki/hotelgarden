import { LitElement, html, css } from 'https://unpkg.com/lit-element@^2.2.1/lit-element.js?module';
import 'https://unpkg.com/@material/mwc-button@^0.9.1/mwc-button.js?module';
import 'https://unpkg.com/@polymer/app-route@^3.0.2/app-location.js?module';
import 'https://unpkg.com/@polymer/app-route@^3.0.2/app-route.js?module';
import 'https://unpkg.com/@polymer/app-layout@^3.1.0/app-layout.js?module';
import './hg-menu/hg-menu.js';

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
        /*position: absolute;*/
        /*top: 0;*/
        /*right: 0;*/
        /*bottom: 0;*/
        /*left: 0;*/
      }
      app-header {
        background: white;
      }
    `;
  }
  render(){
    return html`
      <app-header-layout>
        <app-header slot="header" reveals>
          <div>App name</div>
        </app-header>
        <div>
          <app-location @route-changed=${(event) => this._page = event.detail.value.path}></app-location>
          <a class="tenses" href="/">landing</a>
          <a class="tenses" href="/kupa">kupa</a>
          ${this._page === '/'
            ? html`<div name="landing"><hg-menu></hg-menu></div>`
            : html`<div name="kupa">Page 1</div>`}
        </div>
      </app-header-layout>

    `;
  }
}
customElements.define('hg-app', HgApp);
