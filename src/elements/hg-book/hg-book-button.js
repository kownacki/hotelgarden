import {LitElement, html, css} from 'lit-element';
import sharedStyles from "../../styles/shared-styles.js";
import '../hg-heading.js'
import '../hg-action-button.js';
import './hg-book-dialog';

customElements.define('hg-book-button', class extends LitElement {
  static get properties() {
    return {
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
    `];
  }
  render() {
    return html`
      <hg-action-button 
        .click=${() => {
          this.shadowRoot.getElementById('dialog').dialog.open();
        }}>
        Rezerwuj
      </hg-action-button>
      <hg-book-dialog id="dialog"></hg-book-dialog>
    `;
  }
});
