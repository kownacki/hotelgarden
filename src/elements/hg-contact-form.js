import {LitElement, html, css} from 'lit';
import '@material/mwc-button';
import sharedStyles from '../styles/shared-styles.js';
import {findInvalidInputs} from '../utils/form.js';
import {sleep, scrollIntoView} from '../utils.js';
import './hg-contact-form/hg-contact-form-first-part.js';
import './hg-contact-form/hg-contact-form-loading.js';
import './hg-contact-form/hg-contact-form-second-part.js';

export {HgContactFormSubject} from './hg-contact-form/hg-contact-form-subject-select.js';

export const HgContactFormField = {
  NAME: 'name',
  COMPANY: 'company',
  PHONE: 'phone',
  EMAIL: 'email',
  SUBJECT: 'subject',
  TEXT: 'text',
};

export class HgContactForm extends LitElement {
  static properties = {
    preselectedSubject: {type: String, reflect: true, attribute: 'preselected-subject'}, // HgContactFormSubject
    // observables
    sent: {type: Boolean, reflect: true},
    loading: {type: Boolean, reflect: true},
    error: {type: Boolean, reflect: true},
    // private
    _checkValidity: Boolean,
  };
  static styles = [sharedStyles, css`
    :host {
      --width: 900px;
      font-size: 18px;
      display: block;
      width: var(--width);
      max-width: calc(100% - 40px);
      padding: 0 20px;
      margin: 20px auto;
    }
    .parts {
      display: flex;
    }
    .parts > * {
      flex: 1;
    }
    hg-contact-form-first-part {
      margin-right: 20px;
    }
    .required-info {
      font-size: 12px;
      color: var(--grey-text);
      margin: 20px 0;
    }
    .controls {
      display: flex;
      justify-content: flex-end;
    }
    mwc-button {
      padding: 7px 0;
    }
    :host([loading]) mwc-button, :host([sent]) mwc-button, :host([error]) mwc-button {
      display: none;
    }
    .confirmation {
      text-align: center;
    }
    :host(:not([sent])) .sent {
      display: none;
    }
    :host(:not([error])) .error {
      display: none;
    }
    @media all and (max-width: 769px) {
      .parts {
        flex-direction: column;
      }
      hg-contact-form-first-part {
        margin-right: 0;
      }
    }
  `];
  _getBothPartsFieldsData() {
    return {
      firstPart: this.shadowRoot.getElementById('first-part').getData(),
      secondPart: this.shadowRoot.getElementById('second-part').getData(),
    };
  }
  _getSendMessageRequestBodyParam(fieldData) {
    return fieldData.name === HgContactFormField.SUBJECT
      ? this.preselectedSubject || fieldData.value
      : fieldData.value;
  }
  _createSendMessageRequestBody(fieldsData) {
    const body = {};
    fieldsData
      .forEach((fieldData) => {
        body[fieldData.name] = this._getSendMessageRequestBodyParam(fieldData);
      });
    return body;
  }
  async _sendMessage() {
    this._checkValidity = true;
    // allow checkValidity to propagate
    await sleep();
    const bothPartsFieldsData = this._getBothPartsFieldsData();
    const fieldsData = [...bothPartsFieldsData.firstPart, ...bothPartsFieldsData.secondPart];
    const invalidFields = findInvalidInputs(fieldsData);
    if (invalidFields.length) {
      invalidFields.forEach((fieldData) => fieldData.reportValidity());
      const firstInvalidField = invalidFields[0];
      firstInvalidField.input.focus();
      scrollIntoView(firstInvalidField.input);
    } else {
      const sendMessageRequestBody = this._createSendMessageRequestBody(fieldsData);
      await import('@polymer/iron-ajax/iron-ajax.js');
      this.shadowRoot.getElementById('ajax').body = sendMessageRequestBody;
      this.shadowRoot.getElementById('ajax').generateRequest();
    }
  }
  render() {
    return html`
      <div>
        <div class="parts">
          <hg-contact-form-first-part
            id="first-part"
            .checkValidity=${this._checkValidity}
            .disabled=${this.loading || this.sent || this.error}>
          </hg-contact-form-first-part>
          <hg-contact-form-second-part
            id="second-part"
            .noSubjects=${Boolean(this.preselectedSubject)}
            .checkValidity=${this._checkValidity}
            .disabled=${this.loading || this.sent || this.error}>
          </hg-contact-form-second-part>
        </div>
        <div class="required-info">* Pole jest wymagane</div>
      </div>
      <div class="controls">
        <mwc-button
          .raised=${true}
          .label=${'Wyślij'}
          .icon=${'send'}
          @click=${this._sendMessage}>
        </mwc-button>
        <hg-contact-form-loading ?hidden=${!this.loading}></hg-contact-form-loading>
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
          }
        }}
        @last-error-changed=${(event) => this.error = Boolean(event.detail.value)}>
      </iron-ajax>
    `;
  }
}
customElements.define('hg-contact-form', HgContactForm);
