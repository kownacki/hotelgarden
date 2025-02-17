import {LitElement, html, css} from 'lit';
import {until} from 'lit/directives/until.js';
import {getNewsFormattedDate} from '../../../../utils/events.js';
import sharedStyles from '../../../styles/shared-styles.js';
import {FirebaseAuthController} from '../../../utils/FirebaseAuthController.js';

export class HgNewsHeader extends LitElement {
  _firebaseAuth;
  static properties = {
    news: Object, // DynamicPathPageNewsWithUid
    promotedDynamicPathPage: Object, // DynamicPathPageEventWithUid | DynamicPathPageNewsWithUid | undefined
    _loggedIn: Boolean,
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }
    .date {
      margin-bottom: 10px;
    }
    hg-news-edit {
      display: block;
      margin-bottom: 10px;
    }
  `];
  constructor() {
    super();
    this._firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this._loggedIn = loggedIn;
    });
  }
  _getDateText(news) {
    return getNewsFormattedDate(news);
  }
  render() {
    return html`
      <div class="date">
        ${this._getDateText(this.news)}
      </div>
      ${!this._loggedIn ? '' : until(import('./hg-news-edit.js').then(() => {
        return html`
          <hg-news-edit
            .news=${this.news}
            .promotedDynamicPathPage=${this.promotedDynamicPathPage}
            @request-change=${({detail}) => {
              this.dispatchEvent(new CustomEvent('request-change', {detail}));
            }}>
          </hg-news-edit>
        `;
      }))}
    `;
  }
}
customElements.define('hg-news-header', HgNewsHeader);
