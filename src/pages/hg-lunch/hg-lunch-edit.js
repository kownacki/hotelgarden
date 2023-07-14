import {LitElement, html, css} from 'lit';
import '@material/mwc-button';
import {updateData, sleep} from '../../utils.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../../edit/hg-delete-item.js';
import './hg-lunch-edit-dialog.js';
import './hg-lunch-generate.js';

export class HgLunchEdit extends LitElement {
  static properties = {
    isUpcoming: Boolean,
    lunches: Object,
    lunchesData: Object,
    config: Object,
    weekLength: Number,
    _enableDialog: Boolean,
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }
    .top {
      text-align: center;
    }
    .status {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
    .not-prepared {
      color: var(--error-color);
    }
    .prepared {
      color: var(--correct-color);
    }
    hg-delete-item {
      margin: 2px 4px;
    }
    .date {
      font-size: 30px;
      font-weight: 300;
      margin: 10px 0;
    }
    .buttons {
      text-align: center;
      margin-bottom: 10px;
    }
  `];
  render() {
    return html`
      <div class="cms">
        <div class="top">
          <div class="bigger-text">${this.isUpcoming ? 'Kolejne' : 'Aktualne'} Menu Lunchowe</div>
          <div class="date">${this.lunchesData.dateString}</div>
          <div class="status bigger-text">
            ${_.isEmpty(this.lunches)
              ? html`<div class="not-prepared">Nieprzygotowane</div>`
              : html`
                <div class="prepared">Przygotowane</div>
                <hg-delete-item
                  .name=${`Menu Lunchowe ${this.lunchesData.dateString}`}
                  @request-delete=${(event) => {
                    event.stopPropagation();
                    updateData(this.lunchesData.doc, null, {});
                    this.dispatchEvent(new CustomEvent('lunches-changed', {detail: {}}));
                  }}>
                </hg-delete-item>
              `}
          </div>
        </div>
        ${!this._enableDialog ? '' : html`
          <hg-lunch-edit-dialog
            id="dialog"
            .lunches=${this.lunches}
            .doc=${this.lunchesData.doc}
            .dateString=${this.lunchesData.dateString}
            .weekLength=${this.weekLength}>
          </hg-lunch-edit-dialog>
        `}
        <div class="buttons cms">
          <mwc-button
            .raised=${true}
            .label=${'Edytuj'}
            @click=${async () => {
              this._enableDialog = false;
              await sleep();
              this._enableDialog = true;
              await sleep();
              this.shadowRoot.getElementById('dialog').dialog.open()
            }}>
          </mwc-button>
        </div>
        <div class="buttons">
          <hg-lunch-generate
            .lunches=${this.lunches}
            .dateString=${this.lunchesData.dateString}
            .config=${this.config}
            .weekLength=${this.weekLength}>
          </hg-lunch-generate>
        </div>
      </div>
    `;
  }
}
customElements.define('hg-lunch-edit', HgLunchEdit);
