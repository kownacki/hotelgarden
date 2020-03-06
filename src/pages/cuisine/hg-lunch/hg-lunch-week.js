import {LitElement, html, css} from 'lit-element';
import sharedStyles from '../../../styles/shared-styles.js';
import {getDayOfWeek} from '../../../utils.js';
import './hg-lunch-item.js';
import './hg-lunch-set.js';

customElements.define('hg-lunch-week', class extends LitElement {
  static get properties() {
    return {
      lunches: Object,
      prices: Object,
      today: Number,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: flex;
        flex-wrap: wrap;
        max-width: 1200px;
        margin: auto;
      }
      .item {
        width: 50%;
        box-sizing: border-box;
        padding: 0 80px;
      }
      h3 {
        text-align: center;
      }
      .item-content {
        padding: 20px 0;
      }
      .no-lunch {
        text-align: center;
      }
      @media all and (max-width: 1023px) {
        .item {
          padding: 0 40px;
        }
      }
      @media all and (max-width: 719px) {
        :host {
          display: block;
        }
        .item {
          width: auto;
          max-width: 450px;
          margin: auto;
          padding: 0 20px;
        }
        .item-content {
          padding: 10px 0;
        }
      }
      @media all and (max-width: 599px) {
        .item {
          padding: 0 20px;
        }
      }
    `];
  }
  render() {
    return html`
      ${_.map((day) => html`
        <div class="item">
          <h3>${{[this.today]: 'Dzisiaj ', [this.today + 1]: 'Jutro '}[day] || _.capitalize(getDayOfWeek(day))}</h3>
          <div class="item-content">
            ${_.get(`${day}.disabled`, this.lunches)
              ? html`<div class="no-lunch">W ten dzień wyjątkowo nie serwujemy lunchu</div>`
              : html`
                <hg-lunch-item .lunch=${_.get(day, this.lunches)} .prices=${this.prices}></hg-lunch-item>  
                <hg-lunch-set .price=${_.get('set', this.prices)}></hg-lunch-set>
              `}
          </div>
        </div>
      `, _.range(this.today <= 5 ? this.today : 1, 6))}
    `;
  }
});
