import {LitElement, html, css} from 'lit';
import {debounce} from 'lodash-es';
import {isDateTodayOrUpcoming} from '../../../../utils/general.js';
import '../../../elements/hg-dialog.js';
import sharedStyles from '../../../styles/shared-styles.js';
import {hyphenate, isDynamicPathAvailable} from '../../../utils.js';
import './hg-dynamic-path-pages-add-dialog/hg-dynamic-path-pages-add-dialog-button-add.js';
import './hg-dynamic-path-pages-add-dialog/hg-dynamic-path-pages-add-dialog-button-cancel.js';
import './hg-dynamic-path-pages-add-dialog/hg-dynamic-path-pages-add-dialog-content.js';

export class HgDynamicPathPagesAddDialog extends LitElement {
  static properties = {
    // observables
    dialog: Element,
    // private
    _type: String, // HgEventsAddType
    _title: String,
    _address: String,
    _addressTaken: Boolean,
    _date: Object, // {startDate: string, endDate?: string}
    _dateCorrect: Boolean,
    _typing: Boolean,
    _loading: Boolean,
  };
  static styles = [sharedStyles, css`
    hg-dialog {
      --hg-dialog-width: 800px;
    }
  `];
  constructor() {
    super();
    this._checkIfAddressTaken = debounce(async () => {
      this._typing = false;
      if (this._address) {
        this._loading = true;
        const title = this._title;
        const addressTaken = !(await isDynamicPathAvailable(this._address));
        // Avoid race condition. Title could change while db query was going. Only use result if it's still relevant.
        if (title === this._title) {
          this._addressTaken = addressTaken;
          this._loading = false;
        }
      }
    }, 500);
  }
  async _attemptToAddDynamicPathPage() {
    if (!this._address || !(await isDynamicPathAvailable(this._address))) {
      alert(`Operacja nie powiodła się. Adres "${this._address}" jest zajęty lub nieprawidłowy.`);
      this._checkIfAddressTaken();
    } else {
      this.dispatchEvent(new CustomEvent('add', {
        detail: {
          type: this._type,
          title: this._title,
          startDate: this._date.startDate,
          endDate: this._date.endDate,
          permalink: this._address,
        },
      }));
    }
  };
  render() {
    const addDisabled = !this._type || !this._dateCorrect || !this._address || this._addressTaken || this._typing || this._loading;
    return html`
      <hg-dialog
        id="dialog"
        .modal=${true}
        @dialog-changed=${() => this.dialog = this.shadowRoot.getElementById('dialog').dialog}>
        <div slot="header">
          Dodaj nowe wydarzenie lub aktualność
        </div>
        <div slot="content">
          <hg-dynamic-path-pages-add-dialog-content
            .address=${this._address}
            .addressTaken=${this._addressTaken}           
            .dateCorrect=${this._dateCorrect}
            .typing=${this._typing}
            .loading=${this._loading}
            @type-changed=${({detail: type}) => {
              this._type = type;
            }}
            @date-changed=${({detail: {startDate, endDate}}) => {
              this._date = {startDate, endDate};
              this._dateCorrect = startDate && endDate
                && (startDate <= endDate)
                && isDateTodayOrUpcoming(endDate);
            }}
            @title-changed=${({detail: title}) => {
              this._title = title;
              this._address = hyphenate(this._title);
              this._typing = true;
              this._checkIfAddressTaken();
            }}>
          </hg-dynamic-path-pages-add-dialog-content>
        </div>
        <hg-dynamic-path-pages-add-dialog-button-cancel
          slot="button"
          @click=${() => {
            this.dialog.close();
          }}>
        </hg-dynamic-path-pages-add-dialog-button-cancel>
        <hg-dynamic-path-pages-add-dialog-button-add
          slot="button"
          .disabled=${addDisabled}
          @click=${() => {
            if (!addDisabled) {
              this._attemptToAddDynamicPathPage();
            }
          }}>
        </hg-dynamic-path-pages-add-dialog-button-add>
      </hg-dialog>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-dialog', HgDynamicPathPagesAddDialog);
