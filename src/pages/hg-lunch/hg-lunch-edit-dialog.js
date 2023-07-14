import {LitElement, html, css} from 'lit';
import '@material/mwc-snackbar';
import {updateData, sleep, scrollIntoView} from '../../utils.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../../elements/hg-action-button.js'
import '../../elements/hg-dialog.js';
import './hg-lunch-edit-dialog-day.js';

export class HgLunchEditDialog extends LitElement {
  static properties = {
    lunches: Object,
    doc: String,
    dateString: String,
    weekLength: Number,
    _error: String,
    //
    dialog: Element,
  };
  static styles = [sharedStyles, css`
    :host {
      position: relative;
    }
    hg-dialog {
      --hg-dialog-width: 800px;
    }
    .required-info {
      font-size: 12px;
      color: var(--grey-text);
      margin: 10px 0 20px;
    }
    .message {
      color: var(--error-color);
      margin-bottom: 20px;
    }
    mwc-snackbar {
      z-index: 104;
    }
  `];
  async _saveLunch() {
    const dialogElement = this.shadowRoot.getElementById('dialog');
    const saveButtonElement = this.shadowRoot.getElementById('save-button');
    const snackbarSuccessElement = this.shadowRoot.getElementById('snackbar-success');

    try {
      saveButtonElement.disabled = true;
      let newLunches = {};
      let firstUnfilledRequiredInput;
      _.map((day) => {
        const dayData = this.shadowRoot.getElementById(day).getData();
        firstUnfilledRequiredInput = firstUnfilledRequiredInput || dayData.firstUnfilledRequiredInput;
        newLunches = _.setWith(Object, String(day), dayData.values, newLunches);
      }, _.range(1, this.weekLength+1));
      if (firstUnfilledRequiredInput) {
        firstUnfilledRequiredInput.focus();
        firstUnfilledRequiredInput.reportValidity();
        scrollIntoView(firstUnfilledRequiredInput, dialogElement.scrollable);
      } else {
        await updateData(this.doc, null, newLunches);
        this.lunches = newLunches;
        this.dispatchEvent(new CustomEvent('lunches-changed', {detail: newLunches, composed: true}));
        dialogElement.dialog.close();
        snackbarSuccessElement.show();
        this._error = null;
      }
    }
    catch (error) {
      this._error = 'Zapisywanie nie powiodło się.';
      await sleep(0);
      dialogElement.scrollable.scrollBy(0, dialogElement.scrollable.scrollHeight);
      throw error;
    }
    finally {
      saveButtonElement.disabled = false;
    }
  }
  render() {
    return html`
      <hg-dialog 
        id="dialog"
        .modal=${true}
        @dialog-changed=${({detail: dialog}) => this.dialog = dialog}>
        <div slot="header">
          Edytuj lunch ${this.dateString}
        </div>l
        <div slot="content">
          ${_.map((day) => html`
            <hg-lunch-edit-dialog-day
              class="${day === this.weekLength ? '' : 'divider'}"
              id="${day}"
              .day=${day}
              .lunches=${_.get(day, this.lunches)}>
            </hg-lunch-edit-dialog-day>
          `, _.range(1, this.weekLength+1))}
          <div class="required-info">* Pole jest wymagane</div>
          ${!this._error ? '' : html`<div class="message">${this._error}</div>`}
        </div>
        <hg-action-button slot="button"
          .lowEmphasis=${true}
          @click=${() => this.shadowRoot.getElementById('dialog').dialog.close()}>
          Anuluj
        </hg-action-button>
        <hg-action-button
          slot="button"
          id="save-button"
          @click=${() => {
            this._saveLunch();
          }}>
          Zapisz
        </hg-action-button>
      </hg-dialog>
      <mwc-snackbar .leading=${true} id="snackbar-success" labelText="Menu lunchowe ${this.dateString} zostało zapisane."></mwc-snackbar>
    `;
  }
}
customElements.define('hg-lunch-edit-dialog', HgLunchEditDialog);
