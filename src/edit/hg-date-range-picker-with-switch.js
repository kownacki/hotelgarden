import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';
import '@material/mwc-switch';
import sharedStyles from '../styles/shared-styles.js';
import '../utils/fixes/mwc-formfield-fixed.js';
import './hg-date-range-picker.js';

export class HgDateRangePickerWithSwitch extends LitElement {
  static properties = {
    multipleDays: Boolean,
    noSwitch: Boolean,
    minStartDate: String,
    maxStartDate: String,
    minEndDate: String,
    maxEndDate: String,
    startDateLabel: String,
    endDateLabel: String,
    switchLabel: String,
    // observables / properties
    // todo
    startDate: String,
    endDate: String,
    // private
  };
  static styles = [sharedStyles, css`
    mwc-formfield-fixed {
      display: block;
      margin-bottom: 20px;
    }
  `];
  render() {
    return html`
      ${when(
        !this.noSwitch,
        () => html`
          <mwc-formfield-fixed .label=${this.switchLabel}>
            <mwc-switch
              id="multiple"
              .selected=${this.multipleDays}
              @click=${() => {
                const switchElement = this.shadowRoot.getElementById('multiple');
                const multipleDays = switchElement.selected;
                this.dispatchEvent(new CustomEvent('multiple-days-changed', {detail: multipleDays}));
              }}>
            </mwc-switch>
          </mwc-formfield-fixed>
        `,
      )}
      <hg-date-range-picker
        .singleDay=${!this.multipleDays}
        .minStartDate=${this.minStartDate}
        .maxStartDate=${this.maxStartDate}
        .minEndDate=${this.minEndDate}
        .maxEndDate=${this.maxEndDate}
        .startDateLabel=${this.startDateLabel}
        .endDateLabel=${this.endDateLabel}
        .startDate=${this.startDate}
        .endDate=${this.endDate}
        @start-date-changed=${({detail: date}) => {
          this.dispatchEvent(new CustomEvent('start-date-changed', {detail: date}));
        }}
        @end-date-changed=${({detail: date}) => {
          this.dispatchEvent(new CustomEvent('end-date-changed', {detail: date}));
        }}>
      </hg-date-range-picker>
    `;
  }
}
customElements.define('hg-date-range-picker-with-switch', HgDateRangePickerWithSwitch);
