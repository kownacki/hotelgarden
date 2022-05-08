import {LitElement, html, css} from 'lit';
import '@material/mwc-button';
import {isEventDateRangeCorrect} from '../../../../../utils/events.js';
import {isDateSame} from '../../../../../utils/general.js';
import sharedStyles from '../../../../styles/shared-styles.js';
import '../../../hg-dialog.js';
import '../../../hg-event-date-picker.js';
import '../../../ui/hg-icon-button.js';

export class HgEventEditDate extends LitElement {
  static properties = {
    startDate: String,
    endDate: String,
    // observables
    dialog: Element,
    opened: {type: Boolean, reflect: true},
    // private
    _dateCorrect: Boolean,
  };
  static styles = [sharedStyles, css`
    hg-dialog {
      --hg-dialog-width: 800px;
    }
    hg-event-date-picker {
      margin-top: 20px;
    }
  `];
  render() {
    return html`
      <hg-icon-button
        .size=${'compact'}
        .icon=${'edit'}
         @click=${() => this.dialog.open()}>
      </hg-icon-button>
      <hg-dialog
        id="dialog"
        @dialog-changed=${({detail: dialog}) => this.dialog = dialog}>
        <div slot="header">
          Zmień datę wydarzenia
        </div>
        <div slot="content">
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
        </div>
        <mwc-button
          slot="button"
          .label=${'Anuluj'}
          @click=${() => this.dialog.close()}>
        </mwc-button>
        <mwc-button
          slot="button"
          .raised=${true}
          .label=${'Zapisz'}
          .disabled=${!this._dateCorrect}
          @click=${() => {
            this.dialog.close();
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
      </hg-dialog>
    `;
  }
}
customElements.define('hg-event-edit-date', HgEventEditDate);
