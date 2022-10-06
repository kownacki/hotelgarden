import {LitElement, html, css} from 'lit';
import ckContent from '../styles/ck-content.js';
import sharedStyles from '../styles/shared-styles.js';
import {createDbPath} from '../utils/database.js';
import './hg-login.js'
import './hg-text.js'

export class HgFooter extends LitElement {
  static styles = [sharedStyles, ckContent, css`
    :host {
      --footer-text-color: #949494;
      --footer-text-color-filter: invert(65%) sepia(0%) saturate(155%) hue-rotate(139deg) brightness(92%) contrast(95%);
      color: var(--footer-text-color);
      display: block;
      background: var(--surface-dark-color);
      position: relative;
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
      margin: 15px 10px;
      text-align: center;
    }
    .image img {
      width: 200px;
      filter: var(--footer-text-color-filter);
    }
    hg-text {
      margin: 10px 0;
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
    hg-login {
      position: absolute;
      bottom: 0;
      left: 0;
    }
    @media all and (max-width: 959px) {
      .container {
        flex-direction: column;
        align-items: center;
      }
    }
  `];
  render() {
    return html`
      <div class="container">
        <div class="image">
          <img src="/resources/images/logo-footer.png">
        </div>
        <hg-text .rich=${true} .path=${createDbPath('texts/footer', 'text')}><div class="ck-content smaller-text"></div></hg-text>
        <div class="icons">
          <a target="_blank" href="http://www.booking.com/hotel/pl/garden.pl.html" class="lighter"><img src="/resources/images/booking-footer.png"></a>
          <a target="_blank" href="https://www.facebook.com/HotelGardenOlesnica" class="lighter"><img src="/resources/images/facebook-footer.png"></a>
          <a target="_blank" href="https://pl.tripadvisor.com/Hotel_Review-g1052898-d7323305-Reviews-Garden_Hotel-Olesnica_Lower_Silesia_Province_Southern_Poland.html"><img src="/resources/images/tripadvisor-footer.png"></a>
        </div>
      </div>
      <hg-login></hg-login>
    `;
  }
}
customElements.define('hg-footer', HgFooter);
