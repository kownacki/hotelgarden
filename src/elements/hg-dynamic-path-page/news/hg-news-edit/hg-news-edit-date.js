import {LitElement, html, css} from 'lit';
import '@material/mwc-button';
import {isEventDateRangeCorrect} from '../../../../../utils/events.js';
import sharedStyles from '../../../../styles/shared-styles.js';
import '../../../hg-dialog.js';
import '../../../hg-news-date-picker.js';
import '../../../ui/hg-icon-button.js';

export class HgNewsEditDate extends LitElement {
  static properties = {
    publishDate: String,
    unpublishDate: String,
    // observables
    dialog: Element,
    opened: {type: Boolean, reflect: true},
    // private
    _dateCorrect: Boolean,
  };
  static styles = [sharedStyles, css`
    hg-dialog {
      --hg-dialog-width: 800px;
    }
    hg-news-date-picker {
      margin-top: 20px;
    }
  `];
  render() {
    return html`
      <hg-icon-button
        .size=${'compact'}
        .icon=${'edit'}
         @click=${() => this.dialog.open()}>
      </hg-icon-button>
      <hg-dialog
        id="dialog"
        @dialog-changed=${({detail: dialog}) => this.dialog = dialog}>
        <div slot="header">
          Zmień datę publikacji aktualności
        </div>
        <div slot="content">
          <hg-news-date-picker
            id="picker"
            .dateCorrect=${this._dateCorrect}
            .publishDate=${this.publishDate}
            .unpublishDate=${this.unpublishDate}
            @date-changed=${({detail: {publishDate, unpublishDate}}) => {
              this._dateCorrect = isEventDateRangeCorrect(publishDate, unpublishDate);
            }}>
          </hg-news-date-picker>
        </div>
        <mwc-button
          slot="button"
          .label=${'Anuluj'}
          @click=${() => this.dialog.close()}>
        </mwc-button>
        <mwc-button
          slot="button"
          .raised=${true}
          .label=${'Zapisz'}
          .disabled=${!this._dateCorrect}
          @click=${() => {
            this.dialog.close();
            const picker = this.shadowRoot.getElementById('picker');
            const {publishDate, unpublishDate} = picker.getDate();
            this.dispatchEvent(new CustomEvent('request-date-change', {
              detail: {
                publishDate,
                unpublishDate,
              },
              composed: true,
            }));
          }}>
        </mwc-button>
      </hg-dialog>
    `;
  }
}
customElements.define('hg-news-edit-date', HgNewsEditDate);
