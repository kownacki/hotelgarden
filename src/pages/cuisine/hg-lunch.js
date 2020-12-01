import {LitElement, html, css} from 'lit-element';
import {getData} from "../../utils";
import sharedStyles from "../../styles/shared-styles";
import HgContent from "../../elements/hg-content";
import '../../content/hg-article/hg-intro-article.js';
import '../../content/hg-article.js';
import '../../content/hg-content-slider.js';
import '../../content/hg-links.js';
import './hg-lunch/hg-lunch-week.js';
import './hg-lunch/hg-lunch-edit.js';
import './hg-lunch/hg-lunch-generate.js';

customElements.define('hg-lunch', class extends HgContent {
  static get properties() {
    return {
      config: Object,
      _prices: Object,
      _lunchesData: Object,
      _lunches: Object,
      _loggedIn: Boolean,
      _lunchDaysCount: Number,
    };
  }
  constructor() {
    super();
    this._unsubscribeLoggedInListener = auth.onAuthStateChanged((user) => this._loggedIn = Boolean(user));
  }
  disconnectedCallback() {
    this._unsubscribeLoggedInListener();
    return super.disconnectedCallback();
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('config')) {
      this._prices = _.get('lunches.prices', this.config);
      // set to 5 for mon - fri, set to 7 for mon - sun
      this._lunchDaysCount = _.get('lunches.lunchDaysCount', this.config);

      (async () => {
        console.log('!!!')
        const lastMonday = moment().startOf('isoWeek');
        this._lunchesData = _.mapValues((week) => {
          const date = week === 'current'
            ? moment().isoWeekday() <= this._lunchDaysCount ? moment(lastMonday) : moment(lastMonday).add(1, 'week')
            : moment().isoWeekday() <= this._lunchDaysCount ? moment(lastMonday).add(1, 'week') : moment(lastMonday).add(2, 'week');
          return {
            date,
            dateString: `${date.format('DD.MM')} — ${moment(date).add(this._lunchDaysCount-1, 'day').format('DD.MM')}`,
            doc: `lunches/${date.format('YYYY-MM-DD')}`,
          };
        }, {current: 'current', upcoming: 'upcoming'});
        this._lunches = {
          current: await getData(this._lunchesData.current.doc) || {},
          upcoming: await getData(this._lunchesData.upcoming.doc) || {},
        };
        console.log(this._lunches, '!');
      })();
    }
  }
  static get styles() {
    return [sharedStyles, css`
      h2 {
        margin: 60px 0 30px;
      }
      hg-lunch-week {
        margin-bottom: 80px;
      }
      .generate {
        text-align: center;
      }
      .edit-wrapper {
        max-width: 1000px;
        margin: 80px auto;
        padding: 0 20px;
      }
      .edit {
        border: solid 1px var(--divider-color);
        display: flex;
        justify-content: center;
        padding: 30px;
        background: rgba(var(--placeholder-color-rgb), 0.03);
      }
      .generate {
        max-width: 700px;
        margin: 80px auto;
        padding: 0 20px;
        text-align: center;
      }
      hg-lunch-edit {
        padding: 40px 20px;
        width: calc(50% - 80px);
      }
      @media all and (max-width: 839px) {
        .edit {
          padding: 30px 0;
        }
      }
      @media all and (max-width: 719px) {
        .edit {
          display: block;
        }
        hg-lunch-edit {
          width: auto;
          margin: auto;
        }
      }
      @media all and (max-width: 479px) {
        .edit-wrapper {
          padding: 0;
        }
      }
    `];
  }
  render() {
    return html`
      <hg-intro-article .uid=${'lunch'}></hg-intro-article>
      <h2 class="content-heading" id="aktualny-lunch">Aktualne menu lunchowe ${this._lunchesData && this._lunchesData.current.dateString}</h2>
      ${!(this.config && this._lunches) ? '' : html`
        <hg-lunch-week 
          .lunches=${this._lunches.current} 
          .prices=${this._prices} 
          .today=${moment().isoWeekday()}
          .weekLength=${this._lunchDaysCount}>
        </hg-lunch-week>
        ${this._loggedIn
          ? html`
            <div class="edit-wrapper">
              <div class="edit">
                ${_.map((week) => html`
                  <hg-lunch-edit
                    .isUpcoming=${week === 'upcoming'}
                    .lunches=${this._lunches[week]} 
                    .lunchesData=${this._lunchesData[week]} 
                    .config=${_.get('lunches', this.config)}
                    .weekLength=${this._lunchDaysCount}
                    @lunches-changed=${(event) => this._lunches = _.set(week, event.detail, this._lunches)}>
                  </hg-lunch-edit>
                `, ['current', 'upcoming'])}
              </div>
            </div>
          `
          : !_.isEmpty(this._lunches.current) 
            ? html`
              <div class="generate">
                <hg-lunch-generate
                  .lunches=${this._lunches.current}
                  .dateString=${this._lunchesData.current.dateString}
                  .config=${_.get('lunches', this.config)}
                  .weekLength=${this._lunchDaysCount}>
                </hg-lunch-generate>
              </div>
            `
            : ''
        }
      `}
      <hg-content-slider id="zdjecia" .uid=${'lunch'}></hg-content-slider>
      <hg-links .path=${'/lunch'} .superpath=${'/kuchnia'}></hg-links>
    `;
  }
});
