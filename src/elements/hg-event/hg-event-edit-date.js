import {LitElement, html, css} from 'lit';
import '@material/mwc-button';
import '@polymer/paper-dialog';
import '../../edit/hg-cms-buttons-container.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../ui/hg-icon-button.js';

export class HgEventEditDate extends LitElement {
  static properties = {
    date: String,
    opened: {type: Boolean, reflect: true},
  };
  static styles = [sharedStyles, css`
    .buttons {
      margin-top: 10px;
    }
  `];
  render() {
    return html`
      <div class="cms">
        <hg-icon-button
          .size=${'compact'}
          .icon=${'edit'}
           @click=${() => this.shadowRoot.getElementById('dialog').open()}>
        </hg-icon-button>
        <paper-dialog 
          id="dialog"
          @opened-changed=${(event) => {this.opened = event.target.opened; this.dispatchEvent(new CustomEvent('opened-changed'))}}>
          <div>
            Zmień datę wydarzenia
          </div>
          <input 
            type="date"
            name="date" 
            id="date" 
            min="${moment().format('YYYY-MM-DD')}"
            .value=${this.date}>
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
                  this.dispatchEvent(new CustomEvent('save', {detail: this.shadowRoot.getElementById('date').value, composed: true}));
                }}>
              </mwc-button>
            </hg-cms-buttons-container>
          </div>
        </paper-dialog>
      </div>
    `;
  }
}
customElements.define('hg-event-edit-date', HgEventEditDate);
