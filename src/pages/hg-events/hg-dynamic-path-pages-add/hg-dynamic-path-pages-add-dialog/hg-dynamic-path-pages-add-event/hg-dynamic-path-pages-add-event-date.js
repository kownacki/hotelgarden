import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';
import '@material/mwc-switch';
import '../../../../../edit/hg-date-picker.js';
import sharedStyles from '../../../../../styles/shared-styles.js';
import '../../../../../utils/fixes/mwc-formfield-fixed.js';
import {getTodayDate} from '../../../../../../utils/general.js';

export class HgDynamicPathPagesAddEventDate extends LitElement {
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
      <p class="smaller-text">
        Wybierz datę wydarzenia
      </p>
      <mwc-formfield-fixed .label=${this._multipleDays ? 'Wielodniowe wydarzenie' : 'Jednodniowe wydarzenie'}>
        <mwc-switch
          id="multiple"
          @click=${() => {
            const switchElement = this.shadowRoot.getElementById('multiple');
            this._multipleDays = switchElement.selected;
          }}>
        </mwc-switch>
      </mwc-formfield-fixed>
      <mwc-formfield-fixed .label=${this._multipleDays ? 'Data rozpoczęcia wydarzenia' : 'Data wydarzenia'}>
        <hg-date-picker
          .min=${minStartDate}
          .max=${maxStartDate}
          @date-changed=${({detail: date}) => {
            this.startDate = date;
          }}>
        </hg-date-picker>
      </mwc-formfield-fixed>
      <div ?hidden=${!this._multipleDays}>
        <mwc-formfield-fixed .label=${'Data zakończenia wydarzenia'}>
          <hg-date-picker
            .min=${minEndDate}
            .max=${maxEndDate}
            @date-changed=${({detail: date}) => {
              this.endDate = date;
            }}>
          </hg-date-picker>
        </mwc-formfield-fixed>
      </div>
      <p class="date-info smaller-text">
        ${when(!datesSet,
          () => 'Data jest wymagana',
          () => when(!this.dateCorrect, () => {
            return this._multipleDays
              ? 'Data zakończenia wydarzenia nie może być miniona. Data zakończenia musi następować po dacie rozpoczęcia.'
              : 'Data nie może być miniona';
          })
        )}
      </p>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-event-date', HgDynamicPathPagesAddEventDate);
