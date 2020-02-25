import {LitElement, html, css} from 'lit-element';

let googleMapsLoaded = false;

customElements.define('hg-map', class extends LitElement {
  static get properties() {
    return {
      seen: Boolean,
    };
  }
  loadGoogleMaps() {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.onload = resolve;
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDvamIugzBC3k3WA52KpHeINrfDHfkvnSs';
      document.body.append(script);
    })
  }
  async updated(changedProperties) {
    if (changedProperties.has('seen')) {
      if (!googleMapsLoaded) {
        googleMapsLoaded = true;
        await this.loadGoogleMaps();
      }
      const lat = 51.210707;
      const lng = 17.401097;
      const position = {lat, lng};
      const map = new google.maps.Map(this.shadowRoot.getElementById('map'), {zoom: 13, center: position, mapTypeControl: false});
      const marker = new google.maps.Marker({position, map});
      const desktopHref = `https://www.google.com/maps/place/Hotel+%26+Restaurant+Garden/@${lat},${lng}z/data=!3m1!4b1!4m8!3m7!1s0x470fe2c41dc1ff81:0xd17fa908bb368c0c!5m2!4m1!1i2!8m2!3d51.210159!4d17.401491`;
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
          <h1>Hotel & Restaurant Garden</h1>
          <p>ul. Podchorążych 2A<br>56-400 Oleśnica</p>
          <a href="${desktopHref}" target="_blank">Nawiguj</a>   
        </div>
      `});
      infoWindow.open(map, marker);
      marker.addListener('click', () => infoWindow.open(map, marker))
    }
  }
  static get styles() {
    return css`
      #map {
        height: 400px;  /* The height is 400 pixels */
      }
    `;
  }
  render() {
    return html`
      <div id="map"></div>
    `;
  }
});
