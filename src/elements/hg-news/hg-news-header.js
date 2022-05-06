import {LitElement, html, css} from 'lit';
import {getNewsFormattedDate} from '../../../utils/events.js';
import sharedStyles from '../../styles/shared-styles.js';
import {FirebaseAuthController} from '../../utils/FirebaseAuthController.js';

export class HgNewsHeader extends LitElement {
  _firebaseAuth;
  static properties = {
    news: Object, // DynamicPathPageNewsWithUid
    promotedEventData: Object, // EventData | undefined
    _loggedIn: Boolean,
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }
    .date {
      color: var(--secondary-color);
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
    `;
  }
}
customElements.define('hg-news-header', HgNewsHeader);
