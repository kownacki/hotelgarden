import {LitElement, html, css} from 'lit';
import '@material/mwc-radio';
import sharedStyles from '../../styles/shared-styles.js';
import '../../utils/fixes/mwc-formfield-fixed.js';

export const HgContactFormSubject = {
  HOTEL: 'hotel',
  GASTRO: 'gastro',
};

export class HgContactFormSubjectSelect extends LitElement {
  static properties = {
    selectedSubject: String, // HgContactFormSubject
  };
  static styles = [sharedStyles, css`
    :host {
      display: flex;
      align-items: center;
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
    @media all and (max-width: 959px) {
      :host {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `];
  _selectSubject(subject) {
    this.selectedSubject = subject;
    this.dispatchEvent(new CustomEvent('selected-subject', {detail: subject}))
  }
  render() {
    return html`
      <div class="about-container">
        <div class="about">Dotyczy*:</div>
      </div>
      <mwc-formfield-fixed .label=${'Noclegi'}>
        <mwc-radio
          name="subject"
          @click=${() => this._selectSubject(HgContactFormSubject.HOTEL)}>
        </mwc-radio>
      </mwc-formfield-fixed>
      <mwc-formfield-fixed .label=${'Gastronomia'}>
        <mwc-radio
          name="subject"
          @click=${() => this._selectSubject(HgContactFormSubject.GASTRO)}>
        </mwc-radio>
      </mwc-formfield-fixed>
    `;
  }
}
customElements.define('hg-contact-form-subject-select', HgContactFormSubjectSelect);
