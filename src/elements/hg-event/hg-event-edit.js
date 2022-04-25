import {LitElement, html, css} from 'lit';
import '@material/mwc-switch';
import {isEventUpcoming, isEventPast} from '../../../utils/events.js';
import sharedStyles from '../../styles/shared-styles.js';
import './hg-event-edit/hg-event-edit-date.js';
import './hg-event-edit/hg-event-promote-switch.js';
import './hg-event-edit/hg-event-public-switch.js';

import {HgEventEditFields} from '../hg-event.js';

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
    @media all and (max-width: 599px) {
      hg-event-edit-date {
        margin-left: 0;
      }
    }
  `];
  render() {
    return html`
      <div class="container cms">
        <hg-event-edit-date
          .date=${this.eventData.event.date}
          @request-date-change=${({detail: date}) => {
            this.dispatchEvent(new CustomEvent('request-change', {detail: {field: HgEventEditFields.DATE, value: date}}));
          }}>
        </hg-event-edit-date>
        <hg-event-public-switch
          .selected=${this.eventData.event.public}
          @public-changed=${({detail: publicValue}) => {
            this.dispatchEvent(new CustomEvent('request-change', {detail: {field: HgEventEditFields.PUBLIC, value: publicValue}}));
          }}>
        </hg-event-public-switch>
        <div title=${isEventPast(this.eventData.event) ? 'Nie można promować minionego wydarzenia' : ''}>
          <hg-event-promote-switch
            .selected=${isEventUpcoming(this.eventData.event) && this.promotedEventData?.uid === this.eventData.uid}
            .disabled=${isEventPast(this.eventData.event)}
            @promoted-changed=${({detail: promoted}) => {
              this.dispatchEvent(new CustomEvent('request-change', {detail: {field: HgEventEditFields.PROMOTED, value: promoted}}));
            }}>
          </hg-event-promote-switch>
        </div>
      </div>
    `;
  }
}
customElements.define('hg-event-edit', HgEventEdit);
