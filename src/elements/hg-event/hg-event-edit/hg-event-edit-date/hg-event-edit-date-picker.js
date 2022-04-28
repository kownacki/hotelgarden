import {LitElement, html, css} from 'lit';
import sharedStyles from '../../../../styles/shared-styles.js';

export class HgEventEditDatePicker extends LitElement {
  static properties = {
    date: String,
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
        min="${moment().format('YYYY-MM-DD')}"
        .value=${this.date}>
    `;
  }
}
customElements.define('hg-event-edit-date-picker', HgEventEditDatePicker);
