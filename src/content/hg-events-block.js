import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';
import '../elements/hg-action-button.js';
import '../elements/hg-page/hg-page-loading.js';
import '../pages/hg-dynamic-path-pages/hg-dynamic-path-pages-list.js';
import sharedStyles from '../styles/shared-styles.js';
import {getAllDynamicPathPages, sleep} from '../utils.js';

export class HgEventsBlock extends LitElement {
  static properties = {
    _allDynamicPathPages: Array, // DynamicPathPage[]
    _allDynamicPathPagesReady: Boolean,
    _eventsNotEmpty: {type: Boolean, reflect: true, attribute: 'events-not-empty'},
  };
  static styles = [sharedStyles, css`
    :host {
      display: none;
    }
    :host([events-not-empty]) {
      max-width: 1000px;
      display: block;
      margin: 60px auto;
      padding: 0 20px;
    }
    h2 {
      margin: 60px 0;
    }
    hg-action-button {
      margin: 20px 0;
    }
  `];
  constructor() {
    super();
    (async () => {
      this._allDynamicPathPages = await getAllDynamicPathPages();
      this._allDynamicPathPagesReady = true;
    })();
  }
  render() {
    return html`
      <h2 class="content-heading">Nadchodzące wydarzenia i aktualności</h2>
      ${when(
        this._allDynamicPathPagesReady,
        () => html`
          <hg-dynamic-path-pages-list
            .dynamicPathPages=${this._allDynamicPathPages}
            .showHidden=${false}
            .showControls=${false}
            .max=${2}
            @events-changed=${async (event) => {
              this._eventsNotEmpty = !_.isEmpty(event.detail);
              await sleep(); // wait for styles to apply
              this.dispatchEvent(new CustomEvent('check-visibility', {composed: true}));
            }}>
          </hg-dynamic-path-pages-list>
        `,
        () => html`<hg-page-loading></hg-page-loading>`,
      )}
      <hg-action-button .url=${'/wydarzenia'}>Wszystkie wydarzenia i aktualności</hg-action-button>
    `;
  }
}
customElements.define('hg-events-block', HgEventsBlock);
