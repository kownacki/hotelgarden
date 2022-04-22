import {LitElement, html, css} from 'lit';
import '@material/mwc-button';
import '@polymer/paper-dialog';
import '../../edit/hg-cms-buttons-container.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../ui/hg-icon-button.js';

export class HgListItemConfigure extends LitElement {
  static properties = {
    configure: Object,
    item: Object,
    disabled: Boolean,
    opened: {type: Boolean, reflect: true},
  };
  static styles = [sharedStyles, css`
    hg-icon-button {
      background: white;
    }
    .buttons {
      margin-top: 10px;
    }
  `];
  render() {
    return html`
      <div class="cms">
        <hg-icon-button
          .size=${'compact'}
          .icon=${this.configure.icon}
          .disabled=${this.disabled}
          @click=${() => this.shadowRoot.getElementById('dialog').open()}>
        </hg-icon-button>
        <paper-dialog
          id="dialog"
          @opened-changed=${(event) => {
            this.opened = event.target.opened;
            if (this.opened) {
              this.configure.setData(this, this.item);
            }
            this.dispatchEvent(new CustomEvent('opened-changed'));
          }}>
          ${this.configure.template(this.item)}
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
                  const field = this.configure.field;
                  const newData = this.configure.getData(this);
                  this.item[field] = newData;
                  this.dispatchEvent(new CustomEvent('update', {detail: {path: field, data: newData}, composed: true}));
                }}>
              </mwc-button>
            </hg-cms-buttons-container>
          </div>
        </paper-dialog>
      </div>
    `;
  }
}
customElements.define('hg-list-item-configure', HgListItemConfigure);
