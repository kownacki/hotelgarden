import {LitElement, html, css} from 'lit';
import {sleep} from '../../utils.js';
import sharedStyles from '../../styles/shared-styles.js';
import downloadLunches from './downloadLunches.js';
import '../../elements/hg-action-button.js'

export class HgLunchGenerate extends LitElement {
  static properties = {
    lunches: Object,
    dateString: Object,
    config: Object,
    weekLength: Number,
    _loading: Boolean,
    _error: Boolean,
    _decreasingFont: Number,
    _result: Object,
  };
  static styles = [sharedStyles, css`
    .result {
      margin-top: 20px;
      text-align: center;
    }
    .error {
      color: var(--error-color);
    }
    a {
      text-decoration: none;
      font-weight: 700;
      color: var(--secondary-color);
    }
  `];
  render() {
    return html`
      <hg-action-button .disabled=${this._loading} @click=${async () => {
        this._loading = true;
        this._error = false;
        this._result = null;
        await sleep(100); // break synchronicity, allow _loading to propagate
        const minWaitingTime = sleep(1000);
        let result;
        try {
          result = await downloadLunches(this.lunches, this.weekLength, this.config, this, this.dateString);
        } catch(error) {
          await minWaitingTime;
          this._error = true;
          throw error;
        } finally {
          await minWaitingTime;
          this._result = result;
          this._loading = false;
          this._decreasingFont = null;
        }
      }}>Generuj PDF</hg-action-button>

      <div class="result">
        ${!this._loading ? '' : html`<div>Generuję. To może zająć kilka sekund...</div>`}
        ${!this._decreasingFont ? '' : html`<div>Zmniejszanie czcionki o ${Math.round(this._decreasingFont * 100)}%...</div>`}
        ${!this._result ? '' : html`<div>
          Generowanie PDF ukończone.
          ${this._result.pageCount > 1
            ? 'Nie udało się zmieścić zawartości na jednej stronie. Wielkość czcionki osiągnęła minimum.'
            : (this._result.decrementFontSize
              ? html`Zmniejszono wielkość czcionki o ${Math.round(this._result.decrementFontSize * 100)}%, 
                żeby zmieścić zawartość na jednej stronie.`
              : '')
          }
          <br>
          <a href="#" @click=${(event) => {event.preventDefault(); this._result.downloadAgain()}}>pobierz ponownie</a>
        </div>`}
        <div class="error">${this._error ? 'Generowanie pliku nie powiodło się.' : ''}</div>
      </div>
    `;
  }
}
customElements.define('hg-lunch-generate', HgLunchGenerate);
