import {LitElement, html, css} from 'lit';
import {isMailValid} from 'mk-js-utils';
import sharedStyles from '../../styles/shared-styles.js';
import {keepLabelAsterisk} from '../../utils/form.js';
import './hg-contact-form-textfield.js';

export const HG_CONTACT_FORM_FIRST_PART_FIELDS = ['name', 'company', 'phone', 'email'];

export class HgContactFormFirstPart extends LitElement {
  static properties = {
    noCompanyField: Boolean,
    checkValidity: Boolean,
    disabled: Boolean,
  };
  static styles = [sharedStyles, css`
  `];
  getData() {
    return HG_CONTACT_FORM_FIRST_PART_FIELDS.map((field) => {
      const input = this.shadowRoot.getElementById(field).textfield;
      return {
        name: field,
        value: input.value,
        input,
        valid: input.checkValidity(),
        reportValidity: () => input.reportValidity(),
      };
    });
  }
  _mailValidityTransform(value) {
    return {
      valid: isMailValid(value),
    }
  }
  render() {
    return html`
      <hg-contact-form-textfield
        id="name"
        .label=${keepLabelAsterisk('Imię i nazwisko', this.checkValidity)}
        .required=${this.checkValidity}
        .disabled=${this.disabled}>
      </hg-contact-form-textfield>
      <hg-contact-form-textfield
        ?hidden=${this.noCompanyField}
        id="company"
        .label=${'Firma'}
        .disabled=${this.disabled}>
      </hg-contact-form-textfield>
      <hg-contact-form-textfield
        id="phone"
        .label=${keepLabelAsterisk('Nr. tel', this.checkValidity)}
        .required=${this.checkValidity}
        .disabled=${this.disabled}>
      </hg-contact-form-textfield>
      <hg-contact-form-textfield
        id="email"
        .label=${keepLabelAsterisk('Adres email', this.checkValidity)}
        .required=${this.checkValidity}
        .customValidityTransform=${this._mailValidityTransform}
        .customValidationMessage=${'Niepoprawny email'}
        .disabled=${this.disabled}>
      </hg-contact-form-textfield>
    `;
  }
}
customElements.define('hg-contact-form-first-part', HgContactFormFirstPart);
