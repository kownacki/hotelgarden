import {LitElement, html, css} from 'lit-element';
import {sleep} from '../utils.js'
import sharedStyles from "../sharedStyles";

const FIELDS = ['name', 'company', 'phone', 'email', 'text'];

customElements.define('hg-contact-form', class extends LitElement {
  static get properties() {
    return {
      subject: {type: String, reflect: true},
      sent: {type: Boolean, reflect: true},
      formHidden: {type: Boolean, reflect: true, attribute: 'form-hidden'},
      loading: {type: Boolean, reflect: true},
      error: {type: Boolean, reflect: true},
      _fieldsValues: Object,
      _selectedSubject: String,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        --height: 346px;
        --width: 900px;
        font-size: 18px;
        display: block;
        width: var(--width);
        padding: 0 20px;
        margin: 20px auto;
      }
      .inputs {
        display: flex;
        transition: height 0.5s ease-in;
        overflow: hidden;
        /* needed for animation */
        height: var(--height);
      }
      :host([sent]) .inputs {
        height: 0;
      }
      .inputs > * {
        width: 50%;
      }
      .inputs > * > * {
        display: block;
        margin: 10px 5px;
      }
      paper-icon-button {
        color: var(--accent-color);
        display: block;
        width: 50px;
        height: 50px;
        margin-left: auto;
      }
      paper-icon-button[disabled] {
        color: var(--disabled-text-color);
      }
      paper-input {
        height: 72px;
      }
      paper-input, paper-textarea {
        padding: 0 12px;
        border: solid 1px var(--primary-color);
        --paper-input-container_-_padding: 4px 0 20px;
        --paper-input-container-shared-input-style_-_font-size: 18px;
        --paper-font-subhead_-_font-size: 18px;
        --paper-font-subhead_-_line-height: 1.4em;
      }
      :host([subject]) paper-radio-group {
        display: none;
      }
      paper-spinner-lite {
         display: block;
         margin-right: 10px;
         padding: 11px;
         margin-left: auto;
         --paper-spinner-color: var(--primary-color);
       }
      :host(:not([loading])) paper-spinner-lite {
        display: none;
      }
      :host([loading]) paper-icon-button, :host([sent]) paper-icon-button {
        display: none;
      }
      .about {
        position: relative;
        bottom: -2px;
      }
      .confirmation {
        text-align: center;
      }
      :host(:not([form-hidden])) .confirmation {
        display: none;
      }
      :host([error]) .sent {
        display: none;
      }
      :host(:not([error])) .error {
        display: none;
      }
      @media all and (max-width: 959px) {
        :host {
          width: auto;
          max-width: calc(var(--width) / 2);
        }
        .inputs {
          flex-direction: column;
          height: calc(var(--height) * 2);
        }
        .inputs > * {
          width: auto;
        }
        paper-radio-group > * {
          display: block;
        }
        .about {
          bottom: 0;
        }
      }
    `];
  }
  constructor() {
    super();
    this._valid = {};
    (async () => {
      await this.updateComplete;
      this.shadowRoot.getElementById('text')
        .shadowRoot.querySelector('paper-input-container')
        .shadowRoot.querySelector('.underline').hidden = true;
      _.map((element) => element.shadowRoot.querySelector('paper-input-container').shadowRoot.querySelector('.underline').hidden = true,
        this.shadowRoot.querySelectorAll('paper-input'));
      this.shadowRoot.getElementById('text')
        .shadowRoot.querySelector('iron-autogrow-textarea').style = `height: ${this.subject ? 276 : 220}px`;
      this.shadowRoot.getElementById('text')
        .shadowRoot.querySelector('paper-input-container').style = 'padding-bottom: 20px';
    })();
  }
  _sendMessage() {
    this.shadowRoot.getElementById('ajax').body = _.reduce(
      (body, id) => _.set(id, this.shadowRoot.getElementById(id).value, body),
      {},
      _.without(['company'], FIELDS),
    );
    this.shadowRoot.getElementById('ajax').body.subject = this.shadowRoot.getElementById('subject').selected;
    this.shadowRoot.getElementById('ajax').generateRequest();
  }
  render() {
    return html`
      <div class="inputs">
        <div>
          ${_.map((input) => html`
            <paper-input
              id="${input.id}"
              .maxlength=${'1000'}
              .autoValidate=${input.id !== 'email'}
              .required=${input.id !== 'company'}
              .errorMessage=${input.id === 'email' ? 'Niepoprawny email' : 'Pole wymagane'}
              .label=${input.label}
              @value-changed=${async (event) => {
                this._fieldsValues = _.set(
                  input.id,
                  input.id === 'email' ? /\S+@\S+\.\S+/.test(event.detail.value) : event.detail.value, 
                  this._fieldsValues
                );
                if (event.detail.value !== '' && input.id === 'email') {
                  // todo what if there are trailing and starting additional characters?
                  this.shadowRoot.getElementById(input.id).invalid = !/\S+@\S+\.\S+/.test(event.detail.value)
                }
              }}>
            </paper-input>
          `, [
            {id: 'name', label: 'Imię i nazwisko*'},
            {id: 'company', label: 'Firma'},
            {id: 'phone', label: 'Nr. tel*'},
            {id: 'email', label: 'Adres email*'},
          ])}
        </div>
        <div>
          <paper-radio-group 
            id="subject" 
            .selected=${this.subject ? this.subject : null}
            @selected-changed=${(event) => this._selectedSubject = event.detail}>
            <span class="about">Dotyczy*:</span> 
            <paper-radio-button name="hotel">Noclegi</paper-radio-button>
            <paper-radio-button name="gastro">Gastronomia</paper-radio-button>
          </paper-radio-group>
          <paper-textarea
            id="text"
            auto-validate
            .required=${true}
            .errorMessage=${'Pole wymagane'}
            .label=${'Co możemy dla Państwa zrobić?*'}
            @value-changed=${(event) => this._fieldsValues = _.set('text', event.detail.value, this._fieldsValues)}>
          </paper-textarea>    
        </div>
      </div>
      <paper-icon-button
        @click=${this._sendMessage}
        .disabled=${!_.every(_.get(_, this._fieldsValues), _.without(['company'], FIELDS)) || !this._selectedSubject}
        .icon=${'send'}>
      </paper-icon-button>
      <paper-spinner-lite active></paper-spinner-lite>
      <div class="confirmation">
        <span class="sent">Wiadomość została wysłana.</span>
        <span class="error">Wysyłanie wiadomości nie powiodło się. Skorzystaj z danych podanych w kontakcie.</span>
      </div>
      <iron-ajax
        id="ajax"
        url="https://europe-west1-pl-hotelgarden.cloudfunctions.net/sendMessage"
        content-type="application/json"
        method="POST"
        @loading-changed=${async (event) => {
          this.loading = event.detail.value;
          if (!this.loading) {
            this.sent = true;
            await sleep(500);
            this.formHidden = true;
          }
        }}
        @last-error-changed=${(event) => this.error = Boolean(event.detail.value)}>
      </iron-ajax>
    `;
  }
});
