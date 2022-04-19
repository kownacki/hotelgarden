import {LitElement, html, css} from 'lit';
import '@material/mwc-radio';
import '@polymer/iron-ajax/iron-ajax.js';
import sharedStyles from '../styles/shared-styles.js';
import '../utils/fixes/mwc-formfield-fixed.js';
import {sleep} from '../utils.js'

const FIELDS = ['name', 'company', 'phone', 'email', 'text'];

export const HgContactFormSubject = {
  HOTEL: 'hotel',
  GASTRO: 'gastro',
};

export class HgContactForm extends LitElement {
  static properties = {
    preselectedSubject: {type: String, reflect: true, attribute: 'preselected-subject'}, // HgContactFormSubject
    sent: {type: Boolean, reflect: true},
    formHidden: {type: Boolean, reflect: true, attribute: 'form-hidden'},
    loading: {type: Boolean, reflect: true},
    error: {type: Boolean, reflect: true},
    _fieldsValues: Object,
    _selectedSubject: String, // HgContactFormSubject
  };
  static styles = [sharedStyles, css`
    :host {
      --height: 346px;
      --heightMobile: calc(var(--height) * 2);
      --heightMobileWithSubject: calc(var(--heightMobile) + 92px);
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
      height: 0 !important;
    }
    .inputs > * {
      width: 50%;
    }
    .inputs > * > * {
      display: block;
      margin: 10px 5px;
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
    .subjects {
      display: flex;
      align-items: center;
    }
    :host([preselected-subject]) .subjects {
      display: none;
    }
    .about-container {
      display: flex;
      height: 48px;
      align-items: center;
      margin-right: 10px;
    }
    mwc-formfield-fixed {
      margin-right: 10px;
    }
    .controls {
      display: flex;
      justify-content: flex-end;
    }
    paper-icon-button {
      color: var(--accent-color);
      display: block;
      width: 50px;
      height: 50px;
    }
    paper-icon-button[disabled] {
      color: var(--disabled-text-color);
    }
    mwc-circular-progress {
      padding: 5px;
     }
    :host(:not([loading])) mwc-circular-progress {
      display: none;
    }
    :host([loading]) paper-icon-button, :host([sent]) paper-icon-button {
      display: none;
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
      }
      :host(:not([preselected-subject])) .inputs {
        height: var(--heightMobileWithSubject);
      }
      :host([preselected-subject]) .inputs {
        height: var(--heightMobile);
      }
      .inputs > * {
        width: auto;
      }
      .subjects {
        margin-top: 0;
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `];
  connectedCallback() {
    import('@material/mwc-circular-progress');
    super.connectedCallback();
  }
  firstUpdated() {
    this.shadowRoot.getElementById('text')
      .shadowRoot.querySelector('paper-input-container')
      .shadowRoot.querySelector('.underline').hidden = true;
    _.map((element) => element.shadowRoot.querySelector('paper-input-container').shadowRoot.querySelector('.underline').hidden = true,
      this.shadowRoot.querySelectorAll('paper-input'));
    this.shadowRoot.getElementById('text')
      .shadowRoot.querySelector('iron-autogrow-textarea').style = `height: ${this.preselectedSubject ? 276 : 218}px`;
    this.shadowRoot.getElementById('text')
      .shadowRoot.querySelector('paper-input-container').style = 'padding-bottom: 20px';
  }
  _sendMessage() {
    this.shadowRoot.getElementById('ajax').body = _.reduce(
      (body, id) => _.set(id, this.shadowRoot.getElementById(id).value, body),
      {},
      FIELDS,
    );
    this.shadowRoot.getElementById('ajax').body.subject = this.preselectedSubject || this._selectedSubject;
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
          <div class="subjects">
            <div class="about-container">
              <div class="about">Dotyczy*:</div>
            </div>
            <mwc-formfield-fixed .label=${'Noclegi'}>
              <mwc-radio
                name="subject"
                @click=${() => this._selectedSubject = HgContactFormSubject.HOTEL}>
              </mwc-radio>
            </mwc-formfield-fixed>
            <mwc-formfield-fixed .label=${'Gastronomia'}>
              <mwc-radio
                name="subject"
                @click=${() => this._selectedSubject = HgContactFormSubject.GASTRO}>
              </mwc-radio>
            </mwc-formfield-fixed>
          </div>
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
      <div class="controls">
        <paper-icon-button
          @click=${this._sendMessage}
          .disabled=${!_.every(_.get(_, this._fieldsValues), _.without(['company'], FIELDS)) || !(this.preselectedSubject || this._selectedSubject)}
          .icon=${'send'}>
        </paper-icon-button>
        <mwc-circular-progress .indeterminate=${true} .density=${-2}></mwc-circular-progress>
      </div>
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
}
customElements.define('hg-contact-form', HgContactForm);
