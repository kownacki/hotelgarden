import {LitElement, html, css} from 'lit-element';
import sharedStyles from "../../styles/shared-styles.js";
import '../hg-action-button.js';
import './hg-book-dialog';

customElements.define('hg-book-order-button', class extends LitElement {
  static get properties() {
    return {
      order: String, // 'restaurant' / 'grill-garden'
    };
  }
  static get styles() {
    return [sharedStyles, css`      
      hg-action-button {
        display: block;
      }
      @media all and (max-width: 599px) {
        hg-action-button {
          --action-button-padding: 10px;
        }
      }
      @media all and (max-width: 479px) {
        hg-action-button {
          font-size: 14px;
          width: 80px;
          --action-button-padding: 5px 10px;
        }
      }
    `];
  }
  render() {
    return html`
      <hg-action-button
        .url=${this.order === 'restaurant' ? 'http://www.zamow.hotelgarden.pl'
          : this.order === 'grill-garden' ? 'http://www.zamow.hotelgarden.pl'
          : null}
        .newTab=${Boolean(this.order)}
        @click=${this.order ? null : () => {
          this.shadowRoot.getElementById('dialog').dialog.open();
        }}>
        ${this.order ? 'Zamów online' : 'Rezerwuj online'}
      </hg-action-button>
      <hg-book-dialog id="dialog"></hg-book-dialog>
    `;
  }
});
