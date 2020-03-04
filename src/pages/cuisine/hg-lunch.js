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
      _lunches: Object,
      _loggedIn: Boolean,
    };
  }
  constructor() {
    super();
    (async () => {
      this._lunches = await getData('lunches/2020-03-02') || {};
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
        <!--<h2 class="content-heading">Dzisiejszy lunch ${moment().format('DD/MM/YYYY')}</h2>
        <hg-todays-lunch .lunches=${this._lunches} .prices=${this._prices}></hg-todays-lunch>-->
        <h2 class="content-heading">Lunche w tym tygodniu</h2>
        <hg-article .uid=${'lunch-extra'} .rich=${true} .richConfig=${'mosaic'}></hg-article>
        ${!this._loggedIn ? '' : html`
          <hg-lunch-edit
            .lunches=${this._lunches} 
            .doc=${'lunches/2020-03-02'}
            @lunches-changed=${(event) => this._lunches = event.detail}>
          </hg-lunch-edit>
        `} 
        <hg-lunch-week .lunches=${this._lunches} .prices=${this._prices} .today=${3}></hg-lunch-week>
      `}
      <hg-links .path=${'/lunch'} .superpath=${'/kuchnia'}></hg-links>
    `;
  }
});
