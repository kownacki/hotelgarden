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
    dateCorrect: Boolean,
    // observables
    startDate: String,
    endDate: String,
    _multipleDays: Boolean,
  };
  static styles = [sharedStyles, css`
    mwc-formfield-fixed {
      display: block;
      margin-bottom: 20px;
    }
    .date-info {
      color: var(--error-color);
    }
  `];
  updated(changedProperties) {
    if (changedProperties.has('startDate') || changedProperties.has('endDate') || changedProperties.has('_multipleDays')) {
      const endDate = this._multipleDays ? this.endDate : this.startDate;
      this.dispatchEvent(new CustomEvent('date-changed', {
        detail: {
          startDate: this.startDate,
          endDate,
        }
      }));
    }
  }
  willUpdate(changedProperties) {
    if (changedProperties.has('noSingleDay')) {
      if (this.noSingleDay) {
        this._multipleDays = true;
      }
    }
  }
  render() {
    const todayDate = getTodayDate();
    let minStartDate;
    let minEndDate;
    if (this._multipleDays) {
      minEndDate = todayDate;
    } else {
      minStartDate = todayDate;
    }
    const datesSet = this._multipleDays ? (this.startDate && this.endDate) : this.startDate;
    return html`
      <hg-date-range-picker-with-switch
        .multipleDays=${this._multipleDays}
        .minStartDate=${minStartDate}
        .minEndDate=${minEndDate}
        .startDateLabel=${this._multipleDays ? labels.multipleDays.startDate : labels.singleDay.startDate}
        .endDateLabel=${labels.multipleDays.endDate}
        .switchLabel=${this._multipleDays ? labels.multipleDays.switch : labels.singleDay.switch}
        @multiple-days-changed=${({detail: multipleDays}) => {
          this._multipleDays = multipleDays;
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
            return this._multipleDays
              ? labels.multipleDays.error
              : labels.singleDay.error;
          })
        )}
      </p>
    `;
  }
}
customElements.define('hg-event-date-picker', HgEventDatePicker);
