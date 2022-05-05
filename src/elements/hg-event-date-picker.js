import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';
import {getTodayDate} from '../../utils/general.js';
import '../edit/hg-date-range-picker-with-switch.js';
import sharedStyles from '../styles/shared-styles.js';

const labels = {
  singleDay: {
    switch: 'Jednodniowe wydarzenie',
    startDate: 'Data wydarzenia',
    error: 'Data nie może być miniona',
  },
  multipleDays: {
    switch: 'Wielodniowe wydarzenie',
    startDate: 'Data rozpoczęcia wydarzenia',
    endDate: 'Data zakończenia wydarzenia',
    error: 'Data zakończenia wydarzenia nie może być miniona. Data zakończenia musi następować po dacie rozpoczęcia.',
  },
};

export class HgEventDatePicker extends LitElement {
  static properties = {
    // properties
    multipleDays: Boolean,
    dateCorrect: Boolean,
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
    .date-info {
      color: var(--error-color);
    }
  `];
  updated(changedProperties) {
    if (changedProperties.has('startDate') || changedProperties.has('endDate') || changedProperties.has('multipleDays')) {
      const newDate = this.getDate();
      this.dispatchEvent(new CustomEvent('date-changed', {detail: newDate}));
    }
  }
  getDate() {
    const endDate = this.multipleDays ? this.endDate : this.startDate;
    return {
      startDate: this.startDate,
      endDate,
    };
  }
  render() {
    const todayDate = getTodayDate();
    let minStartDate;
    let minEndDate;
    if (this.multipleDays) {
      minEndDate = todayDate;
    } else {
      minStartDate = todayDate;
    }
    const datesSet = this.multipleDays ? (this.startDate && this.endDate) : this.startDate;
    return html`
      <hg-date-range-picker-with-switch
        .multipleDays=${this.multipleDays}
        .minStartDate=${minStartDate}
        .minEndDate=${minEndDate}
        .startDateLabel=${this.multipleDays ? labels.multipleDays.startDate : labels.singleDay.startDate}
        .endDateLabel=${labels.multipleDays.endDate}
        .switchLabel=${this.multipleDays ? labels.multipleDays.switch : labels.singleDay.switch}
        .startDate=${this.startDate}
        .endDate=${this.endDate}
        @multiple-days-changed=${({detail: multipleDays}) => {
          this.multipleDays = multipleDays;
        }}
        @start-date-changed=${({detail: date}) => {
          this.startDate = date;
        }}
        @end-date-changed=${({detail: date}) => {
          this.endDate = date;
        }}>
      </hg-date-range-picker-with-switch>
      <p class="date-info smaller-text">
        ${when(!datesSet,
          () => 'Data jest wymagana',
          () => when(!this.dateCorrect, () => {
            return this.multipleDays
              ? labels.multipleDays.error
              : labels.singleDay.error;
          })
        )}
      </p>
    `;
  }
}
customElements.define('hg-event-date-picker', HgEventDatePicker);
