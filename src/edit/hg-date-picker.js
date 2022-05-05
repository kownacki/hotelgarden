import {LitElement, html, css} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import sharedStyles from '../styles/shared-styles.js';

export class HgDatePicker extends LitElement {
  static properties = {
    date: String,
    min: String,
    max: String,
    // observables
    picker: Element,
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }
  `];
  firstUpdated() {
    this.picker = this.shadowRoot.getElementById('picker');
  }
  render() {
    return html`
      <input
        id="picker"
        type="date"
        name="date" 
        min=${ifDefined(this.min)}
        max=${ifDefined(this.max)}
        .value=${this.date}
        @input=${() => {
          this.dispatchEvent(new CustomEvent('date-changed', {detail: this.picker.value}));
        }}>
    `;
  }
}
customElements.define('hg-date-picker', HgDatePicker);
