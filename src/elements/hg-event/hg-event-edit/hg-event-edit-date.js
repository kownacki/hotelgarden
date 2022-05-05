import {LitElement, html, css} from 'lit';
import '@material/mwc-button';
import '@polymer/paper-dialog';
import '../../../edit/hg-cms-buttons-container.js';
import '../../../edit/hg-date-range-picker.js';
import sharedStyles from '../../../styles/shared-styles.js';
import '../../ui/hg-icon-button.js';

export class HgEventEditDate extends LitElement {
  static properties = {
    startDate: String,
    endDate: String,
    opened: {type: Boolean, reflect: true},
  };
  static styles = [sharedStyles, css`
    hg-range-date-picker {
      margin-bottom: 10px;
    }
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
        <hg-date-range-picker
          id="picker"
          .startDate=${this.startDate}
          .endDate=${this.endDate}>
        </hg-date-range-picker>
        <div class="buttons">
          <hg-cms-buttons-container>
            <mwc-button
              .label=${'Anuluj'}
              @click=${() => this.shadowRoot.getElementById('dialog').close()}>
            </mwc-button>
            <mwc-button
              .raised=${true}
              .label=${'Zapisz'}
              @click=${() => {
                this.shadowRoot.getElementById('dialog').close();
                const picker = this.shadowRoot.getElementById('picker');
                const newStartDate = picker.startDate;
                const newEndDate = picker.endDate;
                this.dispatchEvent(new CustomEvent('request-date-change', {
                  detail: {
                    startDate: newStartDate,
                    endDate: newEndDate,
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
