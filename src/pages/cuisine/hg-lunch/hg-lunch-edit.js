import {LitElement, html, css} from 'lit-element';
import {sleep} from '../../../utils.js';
import downloadLunches from './downloadLunches.js';
import sharedStyles from '../../../styles/shared-styles.js';
import './hg-lunch-edit-dialog.js';

customElements.define('hg-lunch-edit', class extends LitElement {
  static get properties() {
    return {
      lunches: Object,
      config: Object,
      doc: String,
      _loading: Boolean,
      _error: Boolean,
      _decreasingFont: Number,
      _result: String,
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
      .error {
        color: var(--error-color);
      }
    `];
  }
  render() {
    return html`
      <div>Aktualny lunch 2-6.03.2020</div>
      <mwc-button raised label="Edytuj"
        @click=${() => this.shadowRoot.getElementById('dialog').dialog.open()}>
      </mwc-button>
      <mwc-button raised label="Generuj pdf" .disabled=${this._loading} @click=${async () => {
        this._loading = true;
        this._error = false;
        this._result = '';
        const minWaitingTime = sleep(1000);
        try {
          await downloadLunches(this.lunches, this.config, this);
        } catch(error) {
          await minWaitingTime;
          this._error = true;
          throw error;
        } finally {
          await minWaitingTime;
          this._loading = false;
          this._decreasingFont = null;
        }
      }}></mwc-button>
      ${!this._loading ? '' : 'Generuję... '}
      ${!this._decreasingFont ? '' : `Zmniejszanie czcionki o ${Math.round(this._decreasingFont * 100)}%...`}
      <div class="result">${!this._result ? '' : this._result}</div>
      <div class="error">${this._error ? 'Generowanie pliku nie powiodło się.' : ''}</div>
      <hg-lunch-edit-dialog id="dialog" .lunches=${this.lunches} .doc=${this.doc}></hg-lunch-edit-dialog>
    `;
  }
});
