import {LitElement, html, css} from 'lit';
import '@material/mwc-button';
import '@polymer/paper-dialog';
import {isEventDateRangeCorrect} from '../../../../utils/events.js';
import {isDateSame} from '../../../../utils/general.js';
import '../../../edit/hg-cms-buttons-container.js';
import sharedStyles from '../../../styles/shared-styles.js';
import '../../hg-event-date-picker.js';
import '../../ui/hg-icon-button.js';

export class HgEventEditDate extends LitElement {
  static properties = {
    startDate: String,
    endDate: String,
    opened: {type: Boolean, reflect: true},
    _dateCorrect: Boolean,
  };
  static styles = [sharedStyles, css`
  `];
  render() {
    return html`
      <hg-icon-button
        .size=${'compact'}
        .icon=${'edit'}
         @click=${() => this.shadowRoot.getElementById('dialog').open()}>
      </hg-icon-button>
      <paper-dialog
        id="dialog">
        <div>
          Zmień datę wydarzenia
        </div>
        <hg-event-date-picker
          id="picker"
          .multipleDays=${!isDateSame(this.startDate, this.endDate)}
          .dateCorrect=${this._dateCorrect}
          .startDate=${this.startDate}
          .endDate=${this.endDate}
          @date-changed=${({detail: {startDate, endDate}}) => {
            this._dateCorrect = isEventDateRangeCorrect(startDate, endDate);
          }}>
        </hg-event-date-picker>
        <div class="buttons">
          <hg-cms-buttons-container>
            <mwc-button
              .label=${'Anuluj'}
              @click=${() => this.shadowRoot.getElementById('dialog').close()}>
            </mwc-button>
            <mwc-button
              .raised=${true}
              .label=${'Zapisz'}
              .disabled=${!this._dateCorrect}
              @click=${() => {
                this.shadowRoot.getElementById('dialog').close();
                const picker = this.shadowRoot.getElementById('picker');
                const {startDate, endDate} = picker.getDate();
                this.dispatchEvent(new CustomEvent('request-date-change', {
                  detail: {
                    startDate,
                    endDate,
                  },
                  composed: true,
                }));
              }}>
            </mwc-button>
          </hg-cms-buttons-container>
        </div>
      </paper-dialog>
    `;
  }
}
customElements.define('hg-event-edit-date', HgEventEditDate);
