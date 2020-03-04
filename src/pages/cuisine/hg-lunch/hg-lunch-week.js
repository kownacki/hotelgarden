import {LitElement, html, css} from 'lit-element';
import sharedStyles from '../../../styles/shared-styles.js';
import {getDayOfWeek} from '../../../utils.js';
import './hg-lunch-item.js';

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
      :host > * {
        width: 50%;
      }
      h3 {
        text-align: center;
      }
      @media all and (max-width: 719px) {
        :host {
          display: block;
        }
        :host > * {
          width: auto;
        }
      }
    `];
  }
  render() {
    return html`
      ${_.map((day) => html`
        <div>
          <h3>${{[this.today]: 'Dzisiaj ', [this.today + 1]: 'Jutro '}[day] || _.capitalize(getDayOfWeek(day))}</h3>
          <hg-lunch-item .lunch=${this.lunches[day]} .prices=${this.prices}></hg-lunch-item>       
        </div>
      `, _.range(this.today, 5+1))}
    `;
  }
});
