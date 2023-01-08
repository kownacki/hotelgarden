import {LitElement, html, css} from 'lit';
import {HOTEL_GARDEN_BOOKING_URL, VILLA_GARDEN_BOOKING_URL} from '../../../utils/config.js';
import {staticProp, ROOM_ID, openProfitroom} from '../../utils.js';
import sharedStyles from '../../styles/shared-styles.js'
import '../../content/hg-text-image.js'
import '../../content/hg-content-icons.js';

const roomsConfig = [
  [
    {url: `${HOTEL_GARDEN_BOOKING_URL}#RD115791103`, text: 'Rezerwuj pokój', newTab: true},
  ],
  [
    {url: `${HOTEL_GARDEN_BOOKING_URL}#RD115791108`, text: 'Rezerwuj pokój', newTab: true},
  ],
  [
    {url: `${VILLA_GARDEN_BOOKING_URL}#RD355411801`, text: 'Rezerwuj pokój', newTab: true},
  ],
  [
    {url: `${HOTEL_GARDEN_BOOKING_URL}#RD115791102`, text: 'Rezerwuj pokój (3 osoby)', newTab: true},
    {url: `${HOTEL_GARDEN_BOOKING_URL}#RD115791109`, text: 'Rezerwuj pokój (4 osoby)', newTab: true},
  ],
];

export class HgRoom extends LitElement {
  static properties = {
    index: Number,
    extraButtons: Array,
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }
    hg-text-image {
      margin-bottom: 40px;
    }
    hg-content-icons {
      margin-bottom: 60px;
    }
  `];
  render() {
    return html`
      <div class="divider">
        <hg-text-image
          .slider=${true}
          .uid=${'rooms-' + this.index}
          .iconFields=${staticProp(['size', 'people'])}
          .iconSrcs=${staticProp([
            'https://firebasestorage.googleapis.com/v0/b/pl-hotelgarden.appspot.com/o/icons%2Fediting%2Fmove.png?alt=media&token=68fa9540-cd2c-4577-9a32-55c83d5ea682',
            'https://firebasestorage.googleapis.com/v0/b/pl-hotelgarden.appspot.com/o/icons%2Fpeople%2Fstanding-man.png?alt=media&token=f284442d-c273-480e-acd1-67a9bcb0463a'
          ])}
          .buttons=${[
            ...roomsConfig[this.index - 1],
            ...(this.extraButtons || []),
          ]}>
        </hg-text-image>
        <hg-content-icons .small=${true} .uid=${'rooms-' + this.index}></hg-content-icons>
      </div>
    `;
  }
}
customElements.define('hg-room', HgRoom);
