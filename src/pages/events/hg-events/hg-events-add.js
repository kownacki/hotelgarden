import {LitElement, html, css} from 'lit';
import '@material/mwc-button';
import '@polymer/paper-dialog';
import {EVENTS_ROOT_PATH} from '../../../../utils/urlStructure.js';
import '../../../edit/hg-cms-buttons-container.js';
import '../../../edit/hg-date-picker.js';
import sharedStyles from '../../../styles/shared-styles.js';
import {addDynamicPathPageEvent, hyphenate, isDynamicPathAvailable} from '../../../utils.js';
import './hg-events-add/hg-events-add-name.js';

export class HgEventsAdd extends LitElement {
  static properties = {
    _title: String,
    _address: String,
    _addressTaken: Boolean,
    _date: String,
    _dateCorrect: Boolean,
    _typing: Boolean,
    _loading: Boolean,
  };
  static styles = [sharedStyles, css`
    .tip {
      background: rgba(var(--secondary-color-rgb), 20%);
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .date-info {
      color: var(--error-color);
    }
    .address {
      overflow-wrap: anywhere;
    }
    .address-info {
      min-height: 1.5em;
    }
    .address-url {
      font-family: monospace;
    }
    hg-events-add-name {
      margin: 20px 0 ;
    }
  `];
  constructor() {
    super();
    this._checkIfAddressTaken = _.debounce(500, async () => {
      this._typing = false;
      if (this._address) {
        this._loading = true;
        const title = this._title;
        const addressTaken = !(await isDynamicPathAvailable(this._address));
        // Avoid race condition. Title could change while db query was going. Only use result if it's still relevant.
        if (title === this._title) {
          this._addressTaken = addressTaken;
          this._loading = false;
        }
      }
    });
  }
  async addEvent() {
    const title = this._title;
    const date = this._date;
    const address = this._address;
    if (!address || !(await isDynamicPathAvailable(address))) {
      alert(`Operacja nie powiodła się. Adres "${address}" jest zajęty lub nieprawidłowy.`);
      this._checkIfAddressTaken();
    } else {
      // todo transaction to avoid race condition
      await addDynamicPathPageEvent(title, date, address);
      window.history.pushState(null, null, `${EVENTS_ROOT_PATH}${address}`);
      this.dispatchEvent(new CustomEvent('location-changed', {composed: true, bubbles: true}));
    }
  };
  updated(changedProperties) {
    this.shadowRoot.getElementById('dialog').notifyResize();
  }
  render() {
    return html`
      <div class="cms">
        <mwc-button
          .raised=${true}
          .icon=${'add'}
          .label=${'Nowe wydarzenie'}
          @click=${() => this.shadowRoot.getElementById('dialog').open()}>
        </mwc-button>
        <paper-dialog id="dialog">
          <div>Dodaj wydarzenie</div>
          <p class="tip">
            <span style="color: var(--primary-color)">Podpowiedź:</span> 
            Gdy dodajesz cykliczne wydarzenie, umieść w nazwie rok lub edycję wydarzenia. Np "Sylwester 2020", 
            "Open Mic vol. V". Dzięki temu unikniesz konfliktu nazw, a twoje wydarzenie będzie łatwiej znaleźć.<br><br>
             <span style="color: var(--error-color)">Uwaga:</span> Zmiana nazwy wydarzenia po utworzeniu NIE będzie skutkować zmianą adresu URL.
          </p>
          <div class="smaller-text">
            Wybierz datę
          </div>
          <hg-date-picker
            id="picker"
            @date-changed=${({detail: date}) => {
              this._date = date;
              this._dateCorrect = this._date && this._date >= moment().format('YYYY-MM-DD');
            }}>
          </hg-date-picker>
          <div class="date-info smaller-text">
            ${this._date && !this._dateCorrect ? 'Data nie może być miniona' : ''}
            ${!this._date ? 'Data jest wymagana' : ''}
          </div>
          <hg-events-add-name
            @name-change=${({detail: name}) => {
              this._typing = true;
              this._title = name;
              this._address = hyphenate(this._title);
              this._checkIfAddressTaken();
            }}>
          </hg-events-add-name>
          <div class="smaller-text">
            <p class="address">
              Adres: <span class="address-url">hotelgarden.pl${EVENTS_ROOT_PATH}${this._address || '...'}</span>
            </p>
            <p class="address-info">
              ${this._loading ? 'Ładowanie...' : ''}
              ${!this._address || this._typing || this._loading 
                ? ''
                : this._addressTaken
                ? html`Adres wydarzenia <span style="color: red">zajęty</span>`
                : html`Adres wydarzenia <span style="color: green">dostępny</span>`
              }
            </p>
          </div>
          <div class="buttons">
            <hg-cms-buttons-container>
              <mwc-button
                .label=${'Anuluj'}
                @click=${() => this.shadowRoot.getElementById('dialog').close()}>
              </mwc-button>
              <mwc-button
                .raised=${true}
                .label=${'Dodaj'}
                .disabled=${!this._address || !this._dateCorrect || this._addressTaken || this._typing || this._loading}
                @click=${this.addEvent}>
              </mwc-button>
            </hg-cms-buttons-container>
          </div>
        </paper-dialog>
      </div>
    `;
  }
}
customElements.define('hg-events-add', HgEventsAdd);
