import {LitElement, html, css} from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import {pathToUid, headerHeight} from '../utils.js';
import '../elements/hg-banner.js';
import '../pages/hg-landing.js';
import '../pages/hg-villa-garden.js';
import '../pages/hg-surroundings.js';
import '../pages/hg-rooms.js';
import '../pages/conferences/hg-conferences.js';
import '../pages/conferences/hg-halls.js';
import '../pages/cuisine/hg-cuisine.js';
import '../pages/cuisine/hg-restaurant.js';
import '../pages/cuisine/hg-grill-garden.js';
import '../pages/celebrations/hg-weddings.js';
import '../pages/celebrations/hg-chrzciny.js';
import '../pages/celebrations/hg-komunie.js';
import '../pages/hg-gallery/hg-gallery.js';
import '../pages/hg-events/hg-events.js';
import '../pages/hg-events/hg-event.js';

let seconds = 0;
setInterval(() => ++seconds, 1000);

customElements.define('hg-page', class extends LitElement {
  static get properties() {
    return {
      path: String,
      _uid: String,
    };
  }
  async updated(changedProperties) {
    if (changedProperties.has('path')) {
      this._uid = pathToUid[this.path];
    }
  }
  render() {
    return html`
      <app-location use-hash-as-path @route-changed=${async (event) => {
        await new Promise((resolve) => setTimeout(resolve, seconds === 0 ? 1000 : 500));
        if (event.detail.value.path) {
          const element = this.shadowRoot.getElementById('page').shadowRoot.getElementById(event.detail.value.path);
          window.scrollTo({
            top: element.offsetTop - headerHeight - 10,
          });
        }
      }}></app-location>
      ${_.startsWith('/wydarzenia/', this.path)
        ? html`<hg-event .uid=${_.replace('/wydarzenia/', '', this.path)}></hg-event>`
        : this._uid
          ? html`
              <hg-banner .uid=${this._uid}></hg-banner>
              ${unsafeHTML(`
                <hg-${this._uid} id="page"></hg-${this._uid}>
              `)}
            `
          : html`<div>brak strony</div>`}
    `;
  }
});
