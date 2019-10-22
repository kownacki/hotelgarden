import { LitElement, html, css } from 'https://unpkg.com/lit-element@^2.2.1/lit-element.js?module';
import 'https://unpkg.com/@material/mwc-button@^0.9.1/mwc-button.js?module';
import 'https://unpkg.com/@polymer/app-route@^3.0.2/app-location.js?module';
import 'https://unpkg.com/@polymer/app-route@^3.0.2/app-route.js?module';

class HgApp extends LitElement {
  static get properties() {
    return {
      _route: Object,
      _tail: Object,
    };
  }
  static get styles() {
    return css`
      :host {
      }
    `;
  }
  render(){
    return html`
      <a class="tenses" href="/tenses">Tenses</a>
      <a class="tenses" href="/tenses2">Tenses2</a>
      <a class="tenses" href="/">index</a>
      <app-location @route-changed=${(event) => this._route = event.detail.value}></app-location>
      <app-route
        .route=${this._route}
        pattern="/:page"
        @tail-changed=${(event) => this._tail = event.detail.value}>
      </app-route>
<!--      <app-route-->
<!--          route="{{subroute}}"-->
<!--          pattern="/:id"-->
<!--          data="{{subrouteData}}">-->
<!--      </app-route>-->
    `;
  }
}
customElements.define('hg-app', HgApp);
