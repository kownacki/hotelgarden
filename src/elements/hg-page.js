import {LitElement, html, css} from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import {headerHeight, pages} from '../utils.js';

import '../elements/hg-banner.js';
import '../elements/hg-footer.js';

// todo put hg-event in elements
import '../pages/events/hg-event.js';
import '../pages/hotel/hg-landing.js';
import '../pages/hotel/hg-villa-garden.js';
import '../pages/hotel/hg-surroundings.js';
import '../pages/hotel/hg-reviews.js';
import '../pages/rooms/hg-rooms.js';
import '../pages/conferences/hg-conferences.js';
import '../pages/conferences/hg-conference-halls.js';
import '../pages/cuisine/hg-cuisine.js';
import '../pages/cuisine/hg-restaurant.js';
import '../pages/cuisine/hg-grill-garden.js';
import '../pages/cuisine/hg-catering.js';
import '../pages/celebrations/hg-weddings.js';
import '../pages/celebrations/hg-family-parties.js';
import '../pages/celebrations/hg-chrzciny.js';
import '../pages/celebrations/hg-komunie.js';
import '../pages/celebrations/hg-banquet-halls.js';
import '../pages/gallery/hg-gallery.js';
import '../pages/events/hg-events.js';
import '../pages/contact/hg-contact.js';
import '../pages/404/hg-404.js';

let seconds = 0;
setInterval(() => ++seconds, 1000);

const setDocumentTitle = (title) => document.title = title + ' - Hotel Garden Oleśnica';

customElements.define('hg-page', class extends LitElement {
  static get properties() {
    return {
      event: Boolean,
      path: String,
      uid: String,
      noBannerImage: {type: Boolean, reflect: true, attribute: 'no-banner-image'},
      eventTitle: String,
      _config: Object,
    };
  }
  constructor() {
    super();
    (async () => {
      this._config = (await db.doc('_config/client').get()).data() || {};
    })();
  }
  updated(changedProperties) {
    if (changedProperties.has('uid') || changedProperties.has('_config')) {
      if (this.uid && this._config && !this.event) {
        setDocumentTitle(_.get(`seo.${this.path}.title`, this._config) || pages[this.uid].name)
      }
    }
  }
  static get styles() {
    return css`
      :host([no-banner-image]) {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        padding-top: 150px;
        box-sizing: border-box;
      }
      :host([no-banner-image]) .page {
        flex: 1;
      }
    `
  }
  render() {
    return html`
      <app-location use-hash-as-path @route-changed=${async (event) => {
        await new Promise((resolve) => setTimeout(resolve, seconds === 0 ? 1000 : 500));
        const hash = event.detail.value.path;
        if (hash && hash !== 'slider' && hash !== 'dialog') {
          const element = this.shadowRoot.getElementById('page').shadowRoot.getElementById(hash);
          window.scrollTo({
            top: element.offsetTop - headerHeight - 10,
          });
        }
      }}></app-location>
      ${this.event
        ? html`<hg-event .uid=${this.uid} class="page" @title-loaded=${(event) => setDocumentTitle(event.detail)}></hg-event>`
        : html`
          <hg-banner .noImage=${this.noBannerImage} .uid=${this.uid}></hg-banner>
          ${!this.uid ? '' : unsafeHTML(`
            <hg-${this.uid} id="page" class="page"></hg-${this.uid}>
          `)}
        `}
      <hg-footer></hg-footer>
    `;
  }
});
