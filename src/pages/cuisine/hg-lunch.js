import {LitElement, html, css} from 'lit-element';
import moment from 'moment';
import {getData} from "../../utils";
import sharedStyles from "../../styles/shared-styles";
import HgContent from "../../elements/hg-content";
import '../../content/hg-article/hg-intro-article.js';
import '../../content/hg-article.js';
import '../../content/hg-links.js';
import './hg-lunch/hg-todays-lunch.js';
import './hg-lunch/hg-lunch-week.js';
import './hg-lunch/hg-lunch-edit.js';

customElements.define('hg-lunch', class extends HgContent {
  static get properties() {
    return {
      config: Object,
      _prices: Object,
      _lunchesData: Object,
      _lunches: Object,
      _loggedIn: Boolean,
    };
  }
  constructor() {
    super();
    (async () => {
      const lastMonday = moment().startOf('isoWeek');
      this._lunchesData = _.mapValues((week) => {
        const date = week === 'current'
          ? moment().isoWeekday() <= 5 ? moment(lastMonday) : moment(lastMonday).add(1, 'week')
          : moment().isoWeekday() <= 5 ? moment(lastMonday).add(1, 'week') : moment(lastMonday).add(2, 'week');
        return {
          date,
          dateString: `${date.format('DD.MM.YYYY')} — ${moment(date).add(4, 'day').format('DD.MM.YYYY')}`,
          dateStringShort: `${date.format('DD.MM')} — ${moment(date).add(4, 'day').format('DD.MM')}`,
          doc: date.format('YYYY-MM-DD'),
        };
      }, {current: 'current', upcoming: 'upcoming'});
      this._lunches = {
        current: await getData(`lunches/${this._lunchesData.current.doc}`) || {},
        upcoming: await getData(`lunches/${this._lunchesData.upcoming.doc}`) || {},
      };
    })();
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
    }
  }
  static get styles() {
    return [sharedStyles, css`
      h2 {
        margin: 60px 0 30px;
      }
    `];
  }
  render() {
    return html`
      <hg-intro-article .uid=${'lunch'}></hg-intro-article>
      ${!(this.config && this._lunches) ? '' : html`
        <!--<hg-todays-lunch .lunches=${this._lunches} .prices=${this._prices}></hg-todays-lunch>-->
        <h2 class="content-heading">Aktualne menu lunchowe ${this._lunchesData.current.dateStringShort}</h2>
        <hg-lunch-week .lunches=${this._lunches.current} .prices=${this._prices} .today=${3}></hg-lunch-week>
        ${!this._loggedIn ? '' : html`
          ${_.map((week) => html`
            <hg-lunch-edit
              .isUpcoming=${week === 'upcoming'}
              .lunches=${this._lunches[week]} 
              .lunchesData=${this._lunchesData[week]} 
              .config=${_.get('lunches', this.config)}
              @lunches-changed=${(event) => this._lunches = _.set(week, event.detail, this._lunches)}>
            </hg-lunch-edit>
          `, ['current', 'upcoming'])}
        `} 
      `}
      <hg-links .path=${'/lunch'} .superpath=${'/kuchnia'}></hg-links>
    `;
  }
});
