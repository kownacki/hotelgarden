import {LitElement, html, css} from 'lit';
import {until} from 'lit/directives/until.js';
import {getWhenEventHappens, getEventFormattedDate} from '../../../utils/events.js';
import sharedStyles from '../../styles/shared-styles.js';
import {FirebaseAuthController} from '../../utils/FirebaseAuthController.js';

export class HgEventHeader extends LitElement {
  _firebaseAuth;
  static properties = {
    event: Object, // DynamicPathPageEventWithUid
    promotedEventData: Object, // EventData | undefined
    _loggedIn: Boolean,
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }
    .date {
      color: var(--secondary-color);
      margin-bottom: 10px;
    }
    hg-event-edit {
      display: block;
      margin-bottom: 10px;
    }
  `];
  constructor() {
    super();
    this._firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this._loggedIn = loggedIn;
    });
  }
  _getDateText(event) {
    return `${getWhenEventHappens(event)} ${getEventFormattedDate(event)}`
  }
  render() {
    return html`
      <div class="date">
        ${this._getDateText(this.event)}
      </div>
      ${!this._loggedIn ? '' : until(import('./hg-event-edit.js').then(() => {
        return html`
          <hg-event-edit
            .event=${this.event}
            .promotedEventData=${this.promotedEventData}
            @request-change=${({detail}) => {
              this.dispatchEvent(new CustomEvent('request-change', {detail}));
            }}>
          </hg-event-edit>
        `;
      }))}
    `;
  }
}
customElements.define('hg-event-header', HgEventHeader);
