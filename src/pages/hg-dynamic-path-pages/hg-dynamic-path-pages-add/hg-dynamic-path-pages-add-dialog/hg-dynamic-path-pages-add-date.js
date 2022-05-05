import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';
import '@material/mwc-switch';
import '../../../../edit/hg-date-range-picker.js';
import sharedStyles from '../../../../styles/shared-styles.js';
import {getTodayDate} from '../../../../../utils/general.js';

export class HgDynamicPathPagesAddDate extends LitElement {
  static properties = {
    dateCorrect: Boolean,
    noSingleDay: Boolean,
    labels: Object, // {singleDay: {switchInfo, error}, multipleDays: {}}
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
    let maxStartDate;
    let minEndDate;
    let maxEndDate;
    if (this._multipleDays) {
      minStartDate = undefined;
      maxStartDate = this.endDate ? this.endDate : undefined;
      minEndDate = (this.startDate > todayDate) ? this.startDate : todayDate;
      maxEndDate = undefined;
    } else {
      minStartDate = todayDate;
      maxStartDate = undefined;
    }
    const datesSet = this._multipleDays ? (this.startDate && this.endDate) : this.startDate;
    return html`
      ${when(
        !this.noSingleDay,
        () => html`
          <mwc-formfield-fixed .label=${this._multipleDays ? this.labels.multipleDays.switch : this.labels.singleDay.switch}>
            <mwc-switch
              id="multiple"
              @click=${() => {
                const switchElement = this.shadowRoot.getElementById('multiple');
                this._multipleDays = switchElement.selected;
              }}>
            </mwc-switch>
          </mwc-formfield-fixed>
        `,
      )}
      <hg-date-range-picker
        .singleDay=${!this._multipleDays}
        .minStartDate=${minStartDate}
        .maxStartDate=${maxStartDate}
        .minEndDate=${minEndDate}
        .maxEndDate=${maxEndDate}
        .startDateLabel=${this._multipleDays ? this.labels.multipleDays.startDate : this.labels.singleDay.startDate}
        .endDateLabel=${this.labels.multipleDays.endDate}
        @start-date-changed=${({detail: date}) => {
          this.startDate = date;
        }}
        @end-date-changed=${({detail: date}) => {
          this.endDate = date;
        }}>
      </hg-date-range-picker>
      <p class="date-info smaller-text">
        ${when(!datesSet,
          () => 'Data jest wymagana',
          () => when(!this.dateCorrect, () => {
            return this._multipleDays
              ? this.labels.multipleDays.error
              : this.labels.singleDay.error;
          })
        )}
      </p>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-date', HgDynamicPathPagesAddDate);
