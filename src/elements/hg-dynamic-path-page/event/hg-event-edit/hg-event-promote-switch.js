import {LitElement, html, css} from 'lit';
import {isEventGoingOrUpcoming} from '../../../../../utils/events.js';
import sharedStyles from '../../../../styles/shared-styles.js';
import '../../hg-dynamic-path-page-promote-switch.js';

export class HgEventPromoteSwitch extends LitElement {
  static properties = {
    event: Object, // DynamicPathPageEventWithUid
    promotedEventData: Object, // EventData | undefined
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }
  `];
  _getPromoteSwitchTooltip(event) {
    return !isEventGoingOrUpcoming(event)
      ? 'Nie można promować minionego wydarzenia.'
      : 'Promowane wydarzenie będzie widoczne w głownym menu nawigacji. ' +
        'Promowanie zostanie automatycznie wyłączone gdy wydarzenie się zakończy. ' +
        'Tylko jedno wydarzenie lub aktualność może być promowana na raz.';
  }
  render() {
    return html`
      <div title=${this._getPromoteSwitchTooltip(this.event)}>
        <hg-dynamic-path-page-promote-switch
          .selected=${isEventGoingOrUpcoming(this.event) && this.promotedEventData?.uid === this.event.uid}
          .disabled=${!isEventGoingOrUpcoming(this.event)}
          @promoted-changed=${({detail: promoted}) => {
            this.dispatchEvent(new CustomEvent('promoted-changed', {detail: promoted}));
          }}>
        </hg-dynamic-path-page-promote-switch>
      </div>
    `;
  }
}
customElements.define('hg-event-promote-switch', HgEventPromoteSwitch);
