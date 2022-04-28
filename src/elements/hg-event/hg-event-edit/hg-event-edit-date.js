import {LitElement, html, css} from 'lit';
import '@material/mwc-button';
import '@polymer/paper-dialog';
import '../../../edit/hg-cms-buttons-container.js';
import sharedStyles from '../../../styles/shared-styles.js';
import '../../ui/hg-icon-button.js';
import './hg-event-edit-date/hg-event-edit-date-picker.js';

export class HgEventEditDate extends LitElement {
  static properties = {
    date: String,
    opened: {type: Boolean, reflect: true},
  };
  static styles = [sharedStyles, css`
    hg-event-edit-date-picker {
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
        <hg-event-edit-date-picker
          id="picker"
         .date=${this.date}>
        </hg-event-edit-date-picker>
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
                const newDate = this.shadowRoot.getElementById('picker').picker.value;
                this.dispatchEvent(new CustomEvent('request-date-change', {detail: newDate, composed: true}));
              }}>
            </mwc-button>
          </hg-cms-buttons-container>
        </div>
      </paper-dialog>
    `;
  }
}
customElements.define('hg-event-edit-date', HgEventEditDate);
