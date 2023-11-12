import {LitElement, html} from 'lit';
import {
  HOTEL_GARDEN_MAP_HREF,
  HOTEL_GARDEN_MAP_LAT,
  HOTEL_GARDEN_MAP_LNG,
  HOTEL_GARDEN_MAP_STREET,
  HOTEL_GARDEN_MAP_TITLE,
} from '../../utils/constants/map.js';
import '../hg-map.js'

export class HgMapHotelGarden extends LitElement {
  static properties = {
    seen: Boolean,
  };
  render() {
    return html`
      <hg-map
        .seen=${this.seen}
        .lat=${HOTEL_GARDEN_MAP_LAT}
        .lng=${HOTEL_GARDEN_MAP_LNG}
        .href=${HOTEL_GARDEN_MAP_HREF}
        .title=${HOTEL_GARDEN_MAP_TITLE}
        .street=${HOTEL_GARDEN_MAP_STREET}>
      </hg-map>
    `;
  }
}
customElements.define('hg-map-hotel-garden', HgMapHotelGarden);
