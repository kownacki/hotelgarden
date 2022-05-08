import {LitElement, html, css} from 'lit';
import {isNewsBeingInPublish} from '../../../../../utils/events.js';
import sharedStyles from '../../../../styles/shared-styles.js';
import '../../hg-dynamic-path-page-promote-switch.js';

export class HgNewsPromoteSwitch extends LitElement {
  static properties = {
    news: Object, // DynamicPathPageNewsWithUid
    promotedEventData: Object, // EventData | undefined
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }
  `];
  _getPromoteSwitchTooltip(news) {
    return !isNewsBeingInPublish(news)
      ? 'Nie można promować aktualności, która nie jest aktualnie w publikacji.'
      : 'Promowana aktualność będzie widoczne w głownym menu nawigacji. ' +
        'Promowanie zostanie automatycznie wyłączone gdy aktualność przestanie być publikowana. ' +
        'Tylko jedno wydarzenie lub aktualność może być promowana na raz.';
  }
  render() {
    return html`
      <div title=${this._getPromoteSwitchTooltip(this.news)}>
        <hg-dynamic-path-page-promote-switch
          .selected=${isNewsBeingInPublish(this.news) && this.promotedEventData?.uid === this.news.uid}
          .disabled=${!isNewsBeingInPublish(this.news)}
          @promoted-changed=${({detail: promoted}) => {
            this.dispatchEvent(new CustomEvent('promoted-changed', {detail: promoted}));
          }}>
        </hg-dynamic-path-page-promote-switch>
      </div>
    `;
  }
}
customElements.define('hg-news-promote-switch', HgNewsPromoteSwitch);
