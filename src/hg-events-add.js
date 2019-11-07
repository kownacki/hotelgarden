import {LitElement, html, css} from 'lit-element';
import firebase from 'firebase';
import moment from 'moment';
import {hyphenate} from './utils.js';

customElements.define('hg-events-add', class extends LitElement {
  static get properties() {
    return {
      _title: String,
      _address: String,
      _addressTaken: Boolean,
      _date: String,
      _dateCorrect: Boolean,
      _typing: Boolean,
      _loading: Boolean,
    };
  }
  constructor() {
    super();
    this._checkIfAddressTaken = _.debounce(500, async () => {
      this._typing = false;
      if (this._address) {
        this._loading = true;
        const title = this._title;
        const dbResult = (await firebase.firestore().collection('events').doc(this._address).get()).exists;
        this._loading = false;
        // Avoid race condition. Title could change while db query was going. Only use result if it's still relevant.
        if (title === this._title) {
          this._addressTaken = dbResult;
        }
      }
    });
  }
  static get styles() {
    return css`
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
  render() {
    //todo Is it performant to place helper functions in render()?
    const addEvent = async () => {
      const title = this._title;
      const date = this._date;
      const address = this._address;
      const colRef = firebase.firestore().collection('events');
      if (!address || (await colRef.doc(address).get()).exists) {
        alert(`Operacja nie powiodła się. Adres "${address}" jest zajęty lub nieprawidłowy.`);
        this._checkIfAddressTaken();
      } else {
        // todo transaction to avoid race condition
        colRef.doc(address).set({title, date});
        window.history.pushState(null, null, '/wydarzenia/' + address);
        this.dispatchEvent(new CustomEvent('location-changed', {composed: true, bubbles: true}));
      }
    };
    return html`
      <paper-icon-button 
        icon="icons:add"
        @click=${() => this.shadowRoot.getElementById('dialog').open()}>
      </paper-icon-button>
      
      <paper-dialog id="dialog">
        <div>Dodaj wydarzenie</div>
        <p class="tip">
          <span style="color: var(--primary-color)">Podpowiedź:</span> 
          Gdy dodajesz cykliczne wydarzenie, umieść w nazwie rok lub edycję wydarzenia. Np "Sylwester 2020", 
          "Open Mic vol. V". Dzięki temu unikniesz konfliktu nazw, a twoje wydarzenie będzie łatwiej znaleźć.<br><br>
           <span style="color: red">Uwaga:</span> Zmiana nazwy wydarzenia po utworzeniu będzie skutkować zmianą adresu URL.
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
        <span style="color: red">${this._date && !this._dateCorrect ? 'Wybierz poprawną datę' : ''}</span>
        <paper-input 
          id="name" 
          .label=${'Nazwa'}
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
        <mwc-button raised label="Dodaj" @click=${addEvent} 
          ?disabled=${!this._address || !this._dateCorrect || this._addressTaken || this._typing || this._loading}>
        </mwc-button>
      </paper-dialog>
    `;
  }
});
