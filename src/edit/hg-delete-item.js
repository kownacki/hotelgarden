import {LitElement, html, css} from 'lit';
import '@material/mwc-button';
import '../edit/hg-cms-buttons-container.js';
import sharedStyles from '../styles/shared-styles.js';

export class HgDeleteItem extends LitElement {
  static properties = {
    name: String,
    disable: Boolean,
    opened: {type: Boolean, reflect: true},
  };
  static styles = [sharedStyles, css`
    paper-icon-button {
      background: white;
      width: 24px;
      height: 24px;
      padding: 0;
    }
    .warning {
      display: flex;
      color: var(--error-color);
      padding: 10px;
      background: var(--paper-red-100);
    }
    mwc-icon {
      margin-right: 10px;
    }
    .warning-text {
      margin-top: 3px;
    }
  `];
  render() {
    return html`
      <div class="cms">
        <paper-icon-button 
          ?disabled=${this.disable}
          .icon=${'delete'}
          @click=${() => this.shadowRoot.getElementById('dialog').open()}>
        </paper-icon-button>
        <paper-dialog
          id="dialog"
          @opened-changed=${(event) => {this.opened = event.target.opened; this.dispatchEvent(new CustomEvent('opened-changed'))}}>
          <div class="warning">
            <mwc-icon>warning</mwc-icon>
            <div class="warning-text">
              Czy na pewno usunąć ${this.name}?
              Usunięte dane nie mogą być przywrócone.
            </div>
          </div>
          <div class="buttons">
            <hg-cms-buttons-container>
              <mwc-button
                .label=${'Anuluj'}
                @click=${() => this.shadowRoot.getElementById('dialog').close()}>
              </mwc-button>
              <mwc-button
                .label=${'Usuń'}
                @click=${() => {
                  this.shadowRoot.getElementById('dialog').close();
                  this.dispatchEvent(new CustomEvent('request-delete', {composed: true}));
                }}>
              </mwc-button>
            </hg-cms-buttons-container>
          </div>
        </paper-dialog>
      </div>
    `;
  }
}
customElements.define('hg-delete-item', HgDeleteItem);
