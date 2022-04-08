import {LitElement, html, css} from 'lit';
import '../../../elements/hg-list.js';
import sharedStyles from '../../../styles/shared-styles.js';
import {createDbPath} from '../../../utils/database.js';
import {FirebaseAuthController} from '../../../utils/FirebaseAuthController.js';
import './hg-events-card.js';

export class HgEventsList extends LitElement {
  _firebaseAuth;
  static properties = {
    past: Boolean,
    max: Number,
    noNonPublic: Boolean,
    _loggedIn: Boolean,
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }
  `];
  constructor() {
    super();
    this._firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this._loggedIn = loggedIn;
    });
  }
  render() {
    return html`
      <hg-list
        .noAdd=${true}
        .transform=${(items) => _.flow([
          ...(this._loggedIn && !this.noNonPublic ? [] : [_.filter((key) => items[key].public)]),
          _.filter((key) => moment()[!this.past ? 'isSameOrBefore' : 'isAfter'](items[key].date, 'day')),
          _.sortBy((key) => items[key].date),
          ...(!this.past ? [] : [_.reverse]),
          ...(!this.max ? [] : [_.take(this.max)]),
        ])}
        .path=${createDbPath('events/events')}
        .emptyTemplate=${html`<p style="font-size: 20px">Brak ${!this.past ? 'nadchodzących' : 'minionych'} wydarzeń</p>`}
        .getItemName=${(item) => `wydarzenie "${item.title}"`}       
        .itemTemplate=${(event, uid) => html`<hg-events-card .event=${{uid, ...event}}></hg-events-card>`}
        @list-changed=${(event) => this.dispatchEvent(new CustomEvent('events-changed', {detail: event.detail}))}>
      </hg-list>
    `;
  }
}
customElements.define('hg-events-list', HgEventsList);
