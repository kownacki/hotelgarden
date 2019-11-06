import {LitElement, html, css} from 'lit-element';
import firebase from 'firebase';
import {hyphenate} from './utils.js';

customElements.define('hg-events-add', class extends LitElement {
  static get properties() {
    return {
      _name: String,
      _hyphenatedName: String,
      _addressTaken: Boolean,
      _typing: Boolean,
      _loading: Boolean,
    };
  }
  constructor() {
    super();
    this._checkIfAddressTaken = _.debounce(500, async () => {
      this._typing = false;
      if (this._hyphenatedName) {
        this._loading = true;
        const name = this._name;
        const dbResult = (await firebase.firestore().collection('events').doc(this._hyphenatedName).get()).exists;
        this._loading = false;
        // Avoid race condition. Name could change while db query was going. Only use result if it's still relevant.
        if (name === this._name) {
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
    `;
  }
  render() {
    //todo Is it performant to place helper functions in render()?
    const addEvent = async () => {
      const name = this._name;
      const hyphenatedName = this._hyphenatedName;
      const colRef = firebase.firestore().collection('events');
      if (!hyphenatedName || (await colRef.doc(hyphenatedName).get()).exists) {
        alert(`Operacja nie powiodła się. Adres "${hyphenatedName}" jest zajęty lub nieprawidłowy.`);
        this._checkIfAddressTaken();
      } else {
        // todo transaction to avoid race condition
        colRef.doc(hyphenatedName).set({name});
        window.history.pushState(null, null, '/wydarzenia/' + hyphenatedName);
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
        <paper-input id="name" label="Nazwa" @value-changed=${(event) => {
          this._typing = true;
          this._name = event.detail.value;
          this._hyphenatedName = hyphenate(this._name);
          this._checkIfAddressTaken();
        }}>
        </paper-input>
        <p ?hidden=${!this._hyphenatedName} class="address">
          hotelgarden.pl/wydarzenia/${this._hyphenatedName}
        </p>
        <p ?hidden=${!this._name || this._hyphenatedName} style="color: red">
          Tytuł wydarzenia musi zawierać litery lub liczby
        </p>
        <p ?hidden=${!this._loading}>Ładowanie...</p>
        <p ?hidden=${!this._hyphenatedName || this._typing || this._loading}>
          Adres wydarzenia 
          ${this._addressTaken
            ? html`<span style="color: red">zajęty</span>`
            : html`<span style="color: green">dostępny</span>`}<br>
        </p>
        <mwc-button raised label="Dodaj" @click=${addEvent} 
          ?disabled=${!this._hyphenatedName || this._addressTaken || this._typing || this._loading}>
        </mwc-button>
      </paper-dialog>
    `;
  }
});
