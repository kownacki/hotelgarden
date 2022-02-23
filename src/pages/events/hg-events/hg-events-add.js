import {LitElement, html, css} from 'lit';
import '@material/mwc-button';
import {hyphenate, updateData} from '../../../utils.js';

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
  static get styles() {
    return css`
      paper-button {
        margin: 0;
      }
      .address {
        font-family: monospace;
      }
      .tip {
        background: rgba(var(--secondary-color-rgb), 20%);
        padding-top: 10px;
        padding-bottom: 10px;
      }
      paper-input {
        margin: 0;
      }
      #date {
        margin: 0 24px;
        padding: 0 2px;
      }
    `;
  }
  constructor() {
    super();
    this._checkIfAddressTaken = _.debounce(500, async () => {
      this._typing = false;
      if (this._address) {
        this._loading = true;
        const title = this._title;
        const dbResult = _.has(this._address, (await db.doc('events/events').get()).data());
        this._loading = false;
        // Avoid race condition. Title could change while db query was going. Only use result if it's still relevant.
        if (title === this._title) {
          this._addressTaken = dbResult;
        }
      }
    });
  }
  async addEvent() {
    const title = this._title;
    const date = this._date;
    const address = this._address;
    if (!address || _.has(address, (await db.doc('events/events').get()).data())) {
      alert(`Operacja nie powiodła się. Adres "${address}" jest zajęty lub nieprawidłowy.`);
      this._checkIfAddressTaken();
    } else {
      // todo transaction to avoid race condition
      updateData('events/events', address, {title, date});
      window.history.pushState(null, null, '/wydarzenia/' + address);
      this.dispatchEvent(new CustomEvent('location-changed', {composed: true, bubbles: true}));
    }
  };
  render() {
    return html`
      <paper-button raised @click=${() => this.shadowRoot.getElementById('dialog').open()}>
        <iron-icon .icon=${'add'} ></iron-icon>
        Nowe wydarzenie
      </paper-button>
      <paper-dialog id="dialog">
        <div>Dodaj wydarzenie</div>
        <p class="tip">
          <span style="color: var(--primary-color)">Podpowiedź:</span> 
          Gdy dodajesz cykliczne wydarzenie, umieść w nazwie rok lub edycję wydarzenia. Np "Sylwester 2020", 
          "Open Mic vol. V". Dzięki temu unikniesz konfliktu nazw, a twoje wydarzenie będzie łatwiej znaleźć.<br><br>
           <span style="color: red">Uwaga:</span> Zmiana nazwy wydarzenia po utworzeniu NIE będzie skutkować zmianą adresu URL.
        </p>
        <input 
          type="date"
          name="date" 
          id="date" 
          min="${moment().format('YYYY-MM-DD')}"
          @input=${(event) => {
            this._date = event.target.value;
            this._dateCorrect = !_.isEmpty(this._date) && this._date >= moment().format('YYYY-MM-DD');
          }}> 
        <span style="color: red">${this._date && !this._dateCorrect ? 'Data nie może być miniona' : ''}</span>
        <paper-input 
          id="name" 
          .label=${'Nazwa wydarzenia'}
          ?invalid=${this._title && !this._address}
          error-message="Tytuł wydarzenia musi zawierać litery lub cyfry"
          @value-changed=${(event) => {
            this._typing = true;
            this._title = event.detail.value;
            this._address = hyphenate(this._title);
            this._checkIfAddressTaken();
          }}>
        </paper-input>
        <p ?hidden=${!this._address} class="address">
          hotelgarden.pl/wydarzenia/${this._address}
        </p>
        <p ?hidden=${!this._loading}>Ładowanie...</p>
        <p ?hidden=${!this._address || this._typing || this._loading}>
          Adres wydarzenia 
          ${this._addressTaken
            ? html`<span style="color: red">zajęty</span>`
            : html`<span style="color: green">dostępny</span>`}<br>
        </p>
        <mwc-button raised label="Dodaj" @click=${this.addEvent} 
          ?disabled=${!this._address || !this._dateCorrect || this._addressTaken || this._typing || this._loading}>
        </mwc-button>
      </paper-dialog>
    `;
  }
}
customElements.define('hg-events-add', HgEventsAdd);
