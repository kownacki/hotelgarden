import {LitElement, html, css} from 'lit';
import sharedStyles from '../../../styles/shared-styles.js';
import {getDayOfWeek} from '../../../utils.js';
import './hg-lunch-item.js';
import './hg-lunch-set.js';

export class HgLunchWeek extends LitElement {
  static get properties() {
    return {
      lunches: Object,
      prices: Object,
      today: Number,
      weekLength: Number,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        max-width: 1200px;
        margin: auto;
        display: block;
        margin-bottom: 60px;
      }
      .items {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
      .item {
        width: 50%;
        box-sizing: border-box;
        padding: 0 80px;
      }
      h3 {
        text-align: center;
      }
      .today-or-tomorrow {
        font-weight: 400;
        color: var(--secondary-color);
      }
      .item-content {
        padding: 20px 0;
      }
      .no-lunch {
        text-align: center;
        padding: 0 20px;
      }
      @media all and (max-width: 1023px) {
        .item {
          padding: 0 40px;
        }
      }
      @media all and (max-width: 719px) {
        .items {
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
      ${_.isEmpty(this.lunches)
        ? html`<div class="bigger-text no-lunch">Menu lunchowe pojawi się w tym miejscu w poniedziałek.</div>`
        : html`
          <div class="items">
            ${_.map((day) => html`
              <div class="item">
                <h3>
                  <span class="today-or-tomorrow">${{[this.today]: 'Dzisiaj ', [(this.today % 7) + 1]: 'Jutro'}[day]}</span>
                  ${_.capitalize(getDayOfWeek(day))}
                </h3>
                <div class="item-content">
                  ${_.get(`${day}.disabled`, this.lunches)
                    ? html`<div class="no-lunch">W ten dzień wyjątkowo nie serwujemy lunchu</div>`
                    : html`
                      <hg-lunch-item .lunch=${_.get(day, this.lunches)} .prices=${this.prices}></hg-lunch-item>  
                      <hg-lunch-set .price=${_.get('set', this.prices)}></hg-lunch-set>
                    `}
                </div>
              </div>
            `, _.range(this.today <= this.weekLength ? this.today : 1, this.weekLength+1))}
          </div>
      `}
    `;
  }
}
customElements.define('hg-lunch-week', HgLunchWeek);
