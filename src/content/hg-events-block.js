import {LitElement, html, css} from 'lit-element';
import {sleep} from '../utils.js';
import sharedStyles from '../styles/shared-styles.js';
import '../pages/events/hg-events/hg-events-list.js';
import '../elements/hg-action-button.js';

customElements.define('hg-events-block', class extends LitElement {
  static get properties() {
    return {
      _eventsNotEmpty: {type: Boolean, reflect: true, attribute: 'events-not-empty'}
    };
  }
  static get styles() {
    return [sharedStyles, css`
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
  }
  render() {
    return html`
      <h2 class="content-heading">Najbliższe wydarzenia</h2>
      <hg-events-list 
        .max=${2} 
        .noNonPublic=${true}
        @events-changed=${async (event) => {
          this._eventsNotEmpty = !_.isEmpty(event.detail);
          await sleep(); // wait for styles to apply
          this.dispatchEvent(new CustomEvent('check-visibility', {composed: true}));
        }}>
      </hg-events-list>
      <hg-action-button .url=${'/wydarzenia'}>Wszystkie wydarzenia</hg-action-button>
    `;
  }
});
