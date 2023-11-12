import {LitElement, html} from 'lit';
import {
  WOJSKA_POLSKIEGO_STUDIO_MAP_HREF,
  WOJSKA_POLSKIEGO_STUDIO_MAP_LAT,
  WOJSKA_POLSKIEGO_STUDIO_MAP_LNG,
  WOJSKA_POLSKIEGO_STUDIO_MAP_STREET,
  WOJSKA_POLSKIEGO_STUDIO_MAP_TITLE,
} from '../../utils/constants/map.js';
import '../hg-map.js'

export class HgMapWojskaPolskiegoStudio extends LitElement {
  static properties = {
    seen: Boolean,
  };
  render() {
    return html`
      <hg-map
        .seen=${this.seen}
        .lat=${WOJSKA_POLSKIEGO_STUDIO_MAP_LAT}
        .lng=${WOJSKA_POLSKIEGO_STUDIO_MAP_LNG}
        .href=${WOJSKA_POLSKIEGO_STUDIO_MAP_HREF}
        .title=${WOJSKA_POLSKIEGO_STUDIO_MAP_TITLE}
        .street=${WOJSKA_POLSKIEGO_STUDIO_MAP_STREET}>
      </hg-map>
    `;
  }
}
customElements.define('hg-map-wojska-polskiego-studio', HgMapWojskaPolskiegoStudio);
