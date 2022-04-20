import {LitElement, html, css} from 'lit';
import 'mkwc/fixes/mwc-textarea-fixed.js';
import sharedStyles from '../../styles/shared-styles.js';
import {keepLabelAsterisk} from '../../utils/form.js';
import './hg-contact-form-subject-select.js';

export const HG_CONTACT_FORM_SECOND_PART_FIELDS = ['subject', 'text'];

export class HgContactFormSecondPart extends LitElement {
  static properties = {
    disabled: Boolean,
    checkValidity: Boolean,
    noSubjects: Boolean,
  };
  static styles = [sharedStyles, css`
    :host {
      display: flex;
      flex-direction: column;
    }
    hg-contact-form-subject-select {
      margin-bottom: 10px;
    }
    mwc-textarea-fixed {
      flex: 1;
      display: block;
      margin-bottom: 24px;
      --mdc-textarea-fixed-divider-color: var(--divider-color);
    }
    @media all and (max-width: 769px) {
      mwc-textarea-fixed {
        height: 250px;
        flex: auto;
      }
    }
  `];
  getData() {
    const subjectInput = this.shadowRoot.getElementById('subject');
    const textInput = this.shadowRoot.getElementById('text');
    return [
      {
        name: 'subject',
        value: subjectInput.selectedSubject,
        input: subjectInput,
        valid: this.noSubjects || Boolean(subjectInput.selectedSubject),
        reportValidity: () => subjectInput.reportValidity(),
      },
      {
        name: 'text',
        value: textInput.value,
        input: textInput,
        valid: textInput.checkValidity(),
        reportValidity: () => textInput.reportValidity(),
      },
    ];
  }
  render() {
    return html`
      <hg-contact-form-subject-select
        ?hidden=${this.noSubjects}
        id="subject"
        disabled=${this.disabled}>
      </hg-contact-form-subject-select>
      <mwc-textarea-fixed
        id="text"
        .label=${keepLabelAsterisk('Co możemy dla Państwa zrobić?', this.checkValidity)}
        .required=${this.checkValidity}
        .validationMessage=${'Pole wymagane'}
        .maxLength=${1000}
        .autoValidate=${true}
        .disabled=${this.disabled}>
      </mwc-textarea-fixed>
    `;
  }
}
customElements.define('hg-contact-form-second-part', HgContactFormSecondPart);
