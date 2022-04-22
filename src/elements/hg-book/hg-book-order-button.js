import {LitElement, html, css} from 'lit';
import sharedStyles from '../../styles/shared-styles.js';
import '../hg-action-button.js';
import {sleep} from '../../utils.js';

export class HgBookOrderButton extends LitElement {
  static properties = {
    order: String, // 'restaurant' / null
  };
  static styles = [sharedStyles, css`      
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
  render() {
    return html`
      <hg-action-button
        .url=${this.order === 'restaurant' ? 'http://www.zamow.hotelgarden.pl' : null}
        .newTab=${Boolean(this.order)}
        @click=${this.order ? null : async () => {
          await import('./hg-book-dialog.js');
          await sleep();
          this.shadowRoot.getElementById('dialog').dialog.open();
        }}>
        ${this.order ? 'Zamów online' : 'Rezerwuj online'}
      </hg-action-button>
      <hg-book-dialog id="dialog"></hg-book-dialog>
    `;
  }
}
customElements.define('hg-book-order-button', HgBookOrderButton);
