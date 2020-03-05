import {LitElement, html, css} from 'lit-element';
import sharedStyles from '../../../styles/shared-styles.js';
import './hg-lunch-edit-dialog.js';
import downloadLunches from './downloadLunches.js';

customElements.define('hg-lunch-edit', class extends LitElement {
  static get properties() {
    return {
      lunches: Object,
      config: Object,
      doc: String,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
        max-width: 700px;
        padding: 60px 20px;
        margin: auto;
      }
    `];
  }
  render() {
    return html`
      <div>Aktualny lunch 2-6.03.2020</div>
      <mwc-button raised label="Edytuj"
        @click=${() => this.shadowRoot.getElementById('dialog').dialog.open()}>
      </mwc-button>
      <mwc-button raised label="Pobierz" @click=${() => downloadLunches(this.lunches, this.config)}></mwc-button>
      <hg-lunch-edit-dialog id="dialog" .lunches=${this.lunches} .doc=${this.doc}></hg-lunch-edit-dialog>
    `;
  }
});
