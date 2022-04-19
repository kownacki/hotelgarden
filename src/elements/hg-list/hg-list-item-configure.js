import {LitElement, html, css} from 'lit';
import '@material/mwc-button';
import '../../edit/hg-cms-buttons-container.js';
import sharedStyles from '../../styles/shared-styles.js';

export class HgListItemConfigure extends LitElement {
  static properties = {
    configure: Object,
    item: Object,
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
    .buttons {
      margin-top: 10px;
    }
  `];
  render() {
    return html`
      <paper-icon-button
        .icon=${this.configure.icon}
        ?disabled=${this.disable}
        @click=${() => this.shadowRoot.getElementById('dialog').open()}>
      </paper-icon-button>
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
              class="cms"
              .raised=${true}
              .label=${'Anuluj'}
              @click=${() => this.shadowRoot.getElementById('dialog').close()}>
            </mwc-button>
            <mwc-button
              class="cms"
              emphasis
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
    `;
  }
}
customElements.define('hg-list-item-configure', HgListItemConfigure);
