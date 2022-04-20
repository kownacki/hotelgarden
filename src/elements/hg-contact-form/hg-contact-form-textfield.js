import {LitElement, html, css} from 'lit';
import sharedStyles from '../../styles/shared-styles.js';
import '../../utils/fixes/mwc-textfield-fixed.js';

export class HgContactFormTexfield extends LitElement {
  static properties = {
    label: String,
    required: Boolean,
    customValidityTransform: Function,
    customValidationMessage: String,
    disabled: Boolean,
    // observables
    textfield: Element,
    value: String,
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }
    mwc-textfield-fixed {
      display: block;
      margin-bottom: 5px;
    }
  `];
  firstUpdated() {
    this.textfield = this.shadowRoot.getElementById('textfield');
  }
  render() {
    return html`
      <mwc-textfield-fixed
        id="textfield"
        .label=${this.label}
        .required=${this.required}
        .validityTransform=${(this.required && this.customValidityTransform) || null}
        .validationMessage=${this.customValidationMessage || 'Pole wymagane'}
        .maxLength=${1000}
        .autoValidate=${true}
        .disabled=${this.disabled}
        @value-change=${({detail: value}) => {
          this.value = value;
        }}>
      </mwc-textfield-fixed>
    `;
  }
}
customElements.define('hg-contact-form-textfield', HgContactFormTexfield);
