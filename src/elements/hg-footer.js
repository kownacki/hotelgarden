import {LitElement, html, css} from 'lit-element';
import './hg-text.js'

customElements.define('hg-footer', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
      :host {
        color: #949494;
        display: block;
        background: var(--secondary-color);
      }
      .container {
        display: flex;
        align-items: flex-start;
        max-width: 1000px;
        padding: 20px;
        margin: auto;
      }
      .container > * {
        flex: 1;
      }
      .image {
        margin: 10px;
        text-align: center;
      }
      .icons {
        margin: 10px;
        text-align: center;
      }
      .icons img {
        margin: 5px;
        height: 50px;
      }
      .icons > a {
        filter: grayscale(100%);
      }
      .icons > a.lighter {
        filter: grayscale(100%) brightness(200%);
      }
      .icons > :hover {
        transition: filter 0.3s ease;
        filter: none !important;
      }
      @media all and (max-width: 959px) {
        .container {
          flex-direction: column;
          align-items: center;
        }
      }
    `;
  }
  render() {
    return html`
      <div class="container">
        <div class="image">
          <img src="/resources/images/logo-footer.png">
        </div>
        <hg-text .rich=${true} .uid=${'footer'}><div></div></hg-text>
        <div class="icons">
          <a target="_blank" href="http://www.booking.com/hotel/pl/garden.pl.html" class="lighter"><img src="/resources/images/booking-footer.png"></a>
          <a target="_blank" href="https://https://www.facebook.com/HotelGardenOlesnica" class="lighter"><img src="/resources/images/facebook-footer.png"></a>
          <a target="_blank" href="https://pl.tripadvisor.com/Hotel_Review-g1052898-d7323305-Reviews-Garden_Hotel-Olesnica_Lower_Silesia_Province_Southern_Poland.html"><img src="/resources/images/tripadvisor-footer.png"></a>
        </div>
      </div>
    `;
  }
});
