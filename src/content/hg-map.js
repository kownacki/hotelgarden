import {LitElement, html, css} from 'lit';
import {API_KEY} from '../../utils/config.js';
import {loadScript} from '../utils.js';

let googleMapsLoaded = false;

export class HgMap extends LitElement {
  static properties = {
    seen: Boolean,
    lat: Number,
    lng: Number,
    href: String,
    title: String,
    street: String,
  };
  static styles = css`
    #map {
      height: 400px;  /* The height is 400 pixels */
    }
  `;
  async updated(changedProperties) {
    if (changedProperties.has('seen')) {
      if (!googleMapsLoaded) {
        googleMapsLoaded = true;
        await loadScript(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}`);
      }
      const position = {lat: this.lat, lng: this.lng};
      const map = new google.maps.Map(this.shadowRoot.getElementById('map'), {zoom: 13, center: position, mapTypeControl: false});
      const marker = new google.maps.Marker({position, map});
      var infoWindow = new google.maps.InfoWindow({content: `
        <style>
          .container {
           text-align: center;
           font-size: 16px; 
          }
          h1 {
            font-size: 18px
          }
          a {
            font-weight: 700;
            color: var(--primary-color); 
          }
          a:not(:hover) {
            text-decoration: none;
          }
        </style>
        <div class="container">
          <h1>${this.title}</h1>
          <p>${this.street}<br>56-400 Oleśnica</p>
          <a href="${this.href}" target="_blank">Nawiguj</a>
        </div>
      `});
      infoWindow.open(map, marker);
      marker.addListener('click', () => infoWindow.open(map, marker))
    }
  }
  render() {
    return html`
      <div id="map"></div>
    `;
  }
}
customElements.define('hg-map', HgMap);
