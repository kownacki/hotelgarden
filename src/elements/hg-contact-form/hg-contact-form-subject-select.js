import {LitElement, html, css} from 'lit';
import '@material/mwc-radio';
import {SendMessageRequestBodySubject} from '../../../utils/sendMessage.js';
import '../../elements/ui/hg-mwc-formfield-wrapper.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../../utils/fixes/mwc-formfield-fixed.js';

export class HgContactFormSubjectSelect extends LitElement {
  static properties = {
    disabled: Boolean,
    // observables
    selectedSubject: String, // SendMessageRequestBodySubject
    invalid: {type: Boolean, reflect: true},
  };
  static styles = [sharedStyles, css`
    :host {
      display: flex;
      align-items: center;
    }
    :host([invalid]) {
      color: var(--error-color);
    }
    .about-container {
      display: flex;
      height: 48px;
      align-items: center;
      margin-right: 10px;
      font-size: 18px;
    }
    mwc-formfield-fixed {
      margin-right: 10px;
    }
    @media all and (max-width: 769px) {
      :host {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `];
  _selectSubject(subject) {
    this.invalid = false;
    this.selectedSubject = subject;
    this.dispatchEvent(new CustomEvent('selected-subject', {detail: subject}))
  }
  reportValidity() {
    if (!this.selectedSubject) {
      this.invalid = true;
    }
  }
  render() {
    return html`
      <div class="about-container">
        <div class="about">Dotyczy*:</div>
      </div>
      <hg-mwc-formfield-wrapper .invalid=${this.invalid}>
        <mwc-formfield-fixed .label=${'Noclegi'}>
          <mwc-radio
            name="subject"
            .disabled=${this.disabled}
            @click=${() => this._selectSubject(SendMessageRequestBodySubject.HOTEL)}>
          </mwc-radio>
        </mwc-formfield-fixed>
      </hg-mwc-formfield-wrapper>
      <hg-mwc-formfield-wrapper .invalid=${this.invalid}>
        <mwc-formfield-fixed .label=${'Gastronomia'}>
          <mwc-radio
            name="subject"
            .disabled=${this.disabled}
            @click=${() => this._selectSubject(SendMessageRequestBodySubject.GASTRO)}>
          </mwc-radio>
        </mwc-formfield-fixed>
      </hg-mwc-formfield-wrapper>
    `;
  }
}
customElements.define('hg-contact-form-subject-select', HgContactFormSubjectSelect);
