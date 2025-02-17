import {LitElement, html, css} from 'lit';
import sharedStyles from '../styles/shared-styles.js';
import '../utils/fixes/mwc-formfield-fixed.js';
import './hg-date-picker.js';
import {earlierDate, laterDate} from '../../utils/general.js';

export class HgDateRangePicker extends LitElement {
  static properties = {
    singleDay: Boolean,
    minStartDate: String,
    maxStartDate: String,
    minEndDate: String,
    maxEndDate: String,
    startDateLabel: String,
    endDateLabel: String,
    // observables / properties
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
    let defaultMaxStartDate;
    let defaultMinEndDate;
    if (!this.singleDay) {
      defaultMaxStartDate = this.endDate || undefined;
      defaultMinEndDate = this.startDate || undefined;
    }
    const maxStartDate = this.maxStartDate && defaultMaxStartDate
      ? earlierDate(this.maxStartDate, defaultMaxStartDate)
      : (this.maxStartDate || defaultMaxStartDate);
    const minEndDate = this.minEndDate && defaultMinEndDate
      ? laterDate(this.minEndDate, defaultMinEndDate)
      : (this.minEndDate || defaultMinEndDate);

    return html`
      <mwc-formfield-fixed .label=${this.startDateLabel}>
        <hg-date-picker
          .date=${this.startDate}
          .min=${this.minStartDate}
          .max=${maxStartDate}
          @date-changed=${({detail: date}) => {
            this.startDate = date;
            this.dispatchEvent(new CustomEvent('start-date-changed', {detail: date}));
          }}>
        </hg-date-picker>
      </mwc-formfield-fixed>
      <div ?hidden=${this.singleDay}>
        <mwc-formfield-fixed .label=${this.endDateLabel}>
          <hg-date-picker
            .date=${this.endDate}
            .min=${minEndDate}
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
