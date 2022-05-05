import {LitElement, html, css} from 'lit';
import '@material/mwc-snackbar';
import {isEventUpcoming, isEventPast} from '../../../utils/events.js';
import sharedStyles from '../../styles/shared-styles.js';
import './hg-event-edit/hg-event-edit-date.js';
import './hg-event-edit/hg-event-promote-switch.js';
import './hg-event-edit/hg-event-public-switch.js';

import {HgEventEditFields} from '../hg-dynamic-path-page.js';

export class HgEventEdit extends LitElement {
  static properties = {
    eventData: Object, // EventData
    promotedEventData: Object, // EventData | undefined
  };
  static styles = [sharedStyles, css`
    .container {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
    hg-event-edit-date {
      margin-left: 5px;
    }
    hg-event-public-switch, hg-event-promote-switch {
      margin-left: 14px;
    }
    mwc-snackbar {
      z-index: 104;
    }
    @media all and (max-width: 599px) {
      hg-event-edit-date {
        margin-left: 0;
      }
    }
  `];
  _getPublicSwitchTooltip() {
    return 'Publiczne wydarzenia są widoczne na stronie wydarzeń oraz będą indeksowane przez przeglądarkę. ' +
      'Niepubliczne wydarzenia wciąż są dostępne dla użytkowników, ale wyłączne poprzez bezpośredni URL.';
  }
  _getPromoteSwitchTooltip(event) {
    return isEventPast(event)
      ? 'Nie można promować minionego wydarzenia.'
      : 'Promowane wydarzenie będzie widoczne w głownym menu nawigacji. ' +
        'Promowanie zostanie automatycznie wyłączone gdy wydarzenie przestanie być aktualne. ' +
        'Tylko jedno wydarzenie może być promowane na raz.';
  }
  _closeAllSnackbars() {
    const snackbars = this.shadowRoot.querySelectorAll('mwc-snackbar');
    snackbars.forEach((snackbar) => snackbar.close());
  }
  render() {
    return html`
      <div class="container cms">
        <hg-event-edit-date
          .startDate=${this.eventData.event.startDate}
          .endDate=${this.eventData.event.endDate}
          @request-date-change=${({detail: {startDate, endDate}}) => {
            this.dispatchEvent(new CustomEvent('request-change', {
              detail: {
                field: HgEventEditFields.DATE,
                value: {startDate, endDate},
              },
            }));
          }}>
        </hg-event-edit-date>
        <div title=${this._getPublicSwitchTooltip()}>
          <hg-event-public-switch
            .selected=${this.eventData.event.public}
            @public-changed=${({detail: publicValue}) => {
              this.dispatchEvent(new CustomEvent('request-change', {detail: {field: HgEventEditFields.PUBLIC, value: publicValue}}));
              this._closeAllSnackbars();
              if (publicValue) {
                this.shadowRoot.getElementById('snackbar-public-true').show();
              } else {
                this.shadowRoot.getElementById('snackbar-public-false').show();
              }
            }}>
          </hg-event-public-switch>
        </div>
        <div title=${this._getPromoteSwitchTooltip(this.eventData.event)}>
          <hg-event-promote-switch
            .selected=${isEventUpcoming(this.eventData.event) && this.promotedEventData?.uid === this.eventData.uid}
            .disabled=${isEventPast(this.eventData.event)}
            @promoted-changed=${({detail: promoted}) => {
              this.dispatchEvent(new CustomEvent('request-change', {detail: {field: HgEventEditFields.PROMOTED, value: promoted}}));
              this._closeAllSnackbars();
              if (promoted) {
                this.shadowRoot.getElementById('snackbar-promote-true').show();
              } else {
                this.shadowRoot.getElementById('snackbar-promote-false').show();
              }
            }}>
          </hg-event-promote-switch>
        </div>
        <mwc-snackbar
          id="snackbar-public-true"
          .leading=${true}
          .labelText=${'Upubliczniono wydarzenie.'}>
        </mwc-snackbar>
        <mwc-snackbar
          id="snackbar-public-false"
          .leading=${true}
          .labelText=${'Wydarzenie przestało być publiczne.'}>
        </mwc-snackbar>
        <mwc-snackbar
          id="snackbar-promote-true"
          .leading=${true}
          .labelText=${'Zapisano. Promowane wydarzenie będzie widoczne w głownym menu nawigacji po odświeżeniu strony.'}>
        </mwc-snackbar>
        <mwc-snackbar
          id="snackbar-promote-false"
          .leading=${true}
          .labelText=${'Zapisano. Wydarzenie przestało być promowane. Zmiany będą widoczne po odświeżeniu strony.'}>
        </mwc-snackbar>
      </div>
    `;
  }
}
customElements.define('hg-event-edit', HgEventEdit);
