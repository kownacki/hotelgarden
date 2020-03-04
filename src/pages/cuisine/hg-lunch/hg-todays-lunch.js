import {LitElement, html, css} from 'lit-element';
import sharedStyles from '../../../styles/shared-styles.js';
import './hg-lunch-item.js';
import './hg-lunch-set.js';

customElements.define('hg-todays-lunch', class extends LitElement {
  static get properties() {
    return {
      lunches: Object,
      prices: Object,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
        max-width: 700px;
        margin: auto;
      }
    `];
  }
  render() {
    return html`
      <hg-lunch-item .lunch=${_.get('1', this.lunches)} .prices=${this.prices}></hg-lunch-item>
      <hg-lunch-set .price=${_.get('set', this.prices)}></hg-lunch-set>
    `;
  }
});
