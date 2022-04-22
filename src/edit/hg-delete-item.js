import {LitElement, html, css} from 'lit';
import '@material/mwc-button';
import '@polymer/paper-dialog';
import '../edit/hg-cms-buttons-container.js';
import '../elements/ui/hg-icon-button.js';
import sharedStyles from '../styles/shared-styles.js';

export class HgDeleteItem extends LitElement {
  static properties = {
    name: String,
    disabled: Boolean,
    opened: {type: Boolean, reflect: true},
  };
  static styles = [sharedStyles, css`
    hg-icon-button {
      display: block;
      background: white;
    }
    .warning {
      display: flex;
      color: var(--error-color);
      padding: 10px;
      background: var(--error-background-color);
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
        <hg-icon-button
          .size=${'compact'}
          .icon=${'delete'}
          .disabled=${this.disabled}
          @click=${() => this.shadowRoot.getElementById('dialog').open()}>
        </hg-icon-button>
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
