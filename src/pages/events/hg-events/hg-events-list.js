import {LitElement, html, css} from 'lit-element';
import moment from "moment";
import {staticProp} from "../../../utils";
import sharedStyles from '../../../styles/shared-styles.js';
import '../../../elements/hg-list.js';
import './hg-events-card.js';

customElements.define('hg-events-list', class extends LitElement {
  static get properties() {
    return {
      past: Boolean,
      max: Number,
      _loggedIn: Boolean,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
      }
    `];
  }
  constructor() {
    super();
    this._unsubscribeLoggedInListener = auth.onAuthStateChanged((user) => this._loggedIn = Boolean(user));
  }
  disconnectedCallback() {
    this._unsubscribeLoggedInListener();
    return super.disconnectedCallback();
  }
  render() {
    return html`
      <hg-list
        .noAdd=${true}
        .transform=${(items) => _.flow([
          ...(this._loggedIn ? [] : [_.filter((key) => items[key].public)]),
          _.filter((key) => moment()[!this.past ? 'isSameOrBefore' : 'isAfter'](items[key].date, 'day')),
          _.sortBy((key) => items[key].date),
          ...(!this.past ? [] : [_.filter((key) => items[key].public)]),
          ...(!this.max ? [] : [_.take(this.max)]),
        ])}
        .path=${staticProp({doc: 'events/events'})}
        .emptyTemplate=${html`<p style="font-size: 20px">Brak ${!this.past ? 'nadchodzących' : 'minionych'} wydarzeń</p>`}
        .getItemName=${(item) => `wydarzenie "${item.title}"`}       
        .itemTemplate=${(event, uid) => html`<hg-events-card .event=${{uid, ...event}}></hg-events-card>`}
        @list-changed=${(event) => this.dispatchEvent(new CustomEvent('events-changed', {detail: event.detail}))}>
      </hg-list>
    `;
  }
});
