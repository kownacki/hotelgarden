import {LitElement, html, css} from 'lit';
import {updateData, sleep} from '../../../utils.js';
import sharedStyles from '../../../styles/shared-styles.js';
import '../../../elements/hg-action-button.js'
import '../../../edit/hg-delete-item.js';
import './hg-lunch-edit-dialog.js';
import './hg-lunch-generate.js';

export class HgLunchEdit extends LitElement {
  static get properties() {
    return {
      isUpcoming: Boolean,
      lunches: Object,
      lunchesData: Object,
      config: Object,
      weekLength: Number,
      _enableDialog: Boolean,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
      }
      .top {
        text-align: center;
      }
      .status {
        margin-bottom: 20px;
      }
      .not-prepared {
        color: var(--error-color);
      }
      .prepared {
        color: var(--correct-color);
      }
      hg-delete-item {
        position: relative;
        top: -2px;
        margin-left: 5px;
      }
      .date {
        font-size: 30px;
        font-weight: 300;
        margin: 10px 0;
      }
      .buttons {
        text-align: center;
      }
      hg-action-button, hg-lunch-generate {
        margin: 4px;
        text-align: center;
      }
    `];
  }
  render() {
    return html`
      <div class="top">
        <div class="bigger-text">${this.isUpcoming ? 'Kolejne' : 'Aktualne'} Menu Lunchowe</div>
        <div class="date">${this.lunchesData.dateString}</div>
        <div class="status bigger-text">
          ${_.isEmpty(this.lunches)
            ? html`<span class="not-prepared">Nieprzygotowane</span>`
            : html`
              <span class="prepared">Przygotowane</span>
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
      <div class="buttons">
        <hg-action-button
          @click=${async () => {
            this._enableDialog = false;
            await sleep();
            this._enableDialog = true;
            await sleep();
            this.shadowRoot.getElementById('dialog').dialog.open()
          }}>
          Edytuj
        </hg-action-button>
        <hg-lunch-generate 
          .lunches=${this.lunches}
          .dateString=${this.lunchesData.dateString}
          .config=${this.config}
          .weekLength=${this.weekLength}>
        </hg-lunch-generate>
      </div>
    `;
  }
}
customElements.define('hg-lunch-edit', HgLunchEdit);
