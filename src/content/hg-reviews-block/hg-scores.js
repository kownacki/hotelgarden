import {LitElement, html, css} from 'lit';
import '../../elements/mkwc/hg-image.js';

export class HgScores extends LitElement {
  static properties = {
    bookingScores: Object,
  };
  static styles = css`
    :host {
      display: block;
    }
    .container {
      display: flex;
      justify-content: center;
      align-content: center;
      text-align: center;
    }
    .container > * {
      margin: 0 10px;
    }
    .property {
      font-size: 20px;
      color: var(--primary-color);
      padding: 20px 0;
    }
    .box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100px;
      height: 100px;
      background: var(--secondary-color);
      color: white;
      padding: 10px;
      margin: auto;
    }
    .score {
      font-weight: 300; 
      font-size: 60px;
    }
    .out-of {
      font-size: 20px;
    }
    .booking {
      display: flex;
      justify-content: center;
      margin: 10px 0;
    }
    .booking > div {
      font-size: 20px;
      margin-right: 10px;
    }
    a {
      display: block;
      transition: filter 0.3s ease ;
    }
    a:hover {
      filter: brightness(120%);
    }
    hg-image {
      width: 150px;
      height: 30px;
      filter: grayscale(90%) var(--primary-color-filter) brightness(120%);
    }
  `;
  render() {
    return html`
      <div class="container">
        <div>
          <div class="property">Hotel Garden</div>
          <div class="box">
            <div class="score">${_.get('hotel-garden', this.bookingScores)}</div>
            <div class="out-of">/ 10</div>         
          </div>
        </div>
        <div>
          <div class="property">Villa Garden</div>
          <div class="box">
            <div class="score">${_.get('villa-garden', this.bookingScores)}</div>
            <div class="out-of">/ 10</div>         
          </div>
        </div>
      </div>
      <div class="booking">
        <div>na</div>
        <a href="https://www.booking.com/hotel/pl/garden">
          <hg-image
            .src=${'/resources/images/booking.png'}
            .ready=${true}
            .fit=${'cover'}>
          </hg-image>
        </a>
      </div>
    `;
  }
}
customElements.define('hg-scores', HgScores);
