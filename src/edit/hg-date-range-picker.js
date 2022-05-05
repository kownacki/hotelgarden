import {LitElement, html, css} from 'lit';
import sharedStyles from '../styles/shared-styles.js';
import '../utils/fixes/mwc-formfield-fixed.js';
import './hg-date-picker.js';

export class HgDateRangePicker extends LitElement {
  static properties = {
    singleDay: Boolean,
    minStartDate: String,
    maxStartDate: String,
    minEndDate: String,
    maxEndDate: String,
    startDateLabel: String,
    endDateLabel: String,
    // observables
    startDate: String,
    endDate: String,
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }
    mwc-formfield-fixed {
      display: block;
      margin-bottom: 20px;
    }
  `];
  render() {
    return html`
      <mwc-formfield-fixed .label=${this.startDateLabel}>
        <hg-date-picker
          .min=${this.minStartDate}
          .max=${this.maxStartDate}
          @date-changed=${({detail: date}) => {
            this.startDate = date;
            this.dispatchEvent(new CustomEvent('start-date-changed', {detail: date}));
          }}>
        </hg-date-picker>
      </mwc-formfield-fixed>
      <div ?hidden=${this.singleDay}>
        <mwc-formfield-fixed .label=${this.endDateLabel}>
          <hg-date-picker
            .min=${this.minEndDate}
            .max=${this.maxEndDate}
            @date-changed=${({detail: date}) => {
              this.endDate = date;
              this.dispatchEvent(new CustomEvent('end-date-changed', {detail: date}));
            }}>
          </hg-date-picker>
        </mwc-formfield-fixed>
      </div>
    `;
  }
}
customElements.define('hg-date-range-picker', HgDateRangePicker);
