import {LitElement, html, css} from 'lit-element';
import moment from 'moment';
import {db, updateData} from "../../utils.js";
import '../../elements/hg-banner.js';
import './hg-events/hg-events-sidebar.js';
import './hg-event/hg-event-edit-date.js';
import {splitEvents, staticProp} from "../../utils";
import sharedStyles from "../../styles/shared-styles";
import ckContent from '../../styles/ck-content.js'
import firebase from "firebase";

customElements.define('hg-event', class extends LitElement {
  static get properties() {
    return {
      uid: String,
      _events: Array,
      _event: Object,
      _contentLoading: Boolean,
      _content: String,
      _dataReady: Boolean,
      _loggedIn: Boolean,
    };
  }
  static get styles() {
    return [sharedStyles, ckContent, css`
      .container {
        display: flex;
        justify-content: center;
        max-width: 1040px;
        margin: auto;
        padding: 20px 20px 40px;
      }
      .content {
        box-sizing: border-box;
        width: 720px;
        padding: 0 60px;
      }
      .header {
        display: flex;
      }
      .date {
        font-size: 20px;
        color: var(--secondary-color);
        margin-bottom: 10px;
      }
      hg-event-edit-date {
        display: none;
      }
      .header:hover hg-event-edit-date, hg-event-edit-date[opened] {
        display: block;
      }
      .divider {
        height: 1px;
        background: rgba(var(--secondary-color-rgb), 30%);
        margin-bottom: 20px;
      }
      @media all and (max-width: 959px) {
        .container {
          display: block;
        }
        .content {
          max-width: 720px;
          width: auto;
          padding: 0;
          margin: auto;
        }
        hg-events-sidebar {
          display: block;
          margin: 40px auto 0;
        }
      }
    `];
  }
  constructor() {
    super();
    this._unsubscribeLoggedInListener = firebase.auth().onAuthStateChanged((user) => this._loggedIn = Boolean(user));
  }
  disconnectedCallback() {
    this._unsubscribeLoggedInListener();
    return super.disconnectedCallback();
  }
  async updated(changedProperties) {
    if (changedProperties.has('uid')) {
      this._dataReady = false;
      const uid = this.uid;
      this._events = (await db.doc('events/events').get()).data() || {};
      if (this.uid === uid) {
        this._dataReady = true;
        this._event = this._events[this.uid];
      }
      if (this._event) {
        this._contentLoading = true;
        this._content = (await db.doc('eventsContents/' + this.uid).get()).get('content');
        this._contentLoading = false;
      } else {
        this.dispatchEvent(new CustomEvent('event-not-found', {composed: true}))
      }
    }
  }
  async updateData(path, data) {
    return updateData('events/events', `${this.uid}.${path}`, data);
  }
  render() {
    return html`
      <hg-banner 
        .uid=${this._dataReady && !this._event ? 'event-not-found' : undefined}
        .path=${this._dataReady && this._event ? staticProp({doc: 'events/events', field: this.uid}) : undefined}
        .noImage=${this._dataReady && !this._event}
        .noSubheading=${true} 
        .useTitleAsHeading=${this._dataReady && this._event}>
      </hg-banner>
      <div class="container">
        ${!(this._dataReady && this._event) ? '' : html`
          <div class="content">
            <div class="header">
              <div class="date">
                ${moment().isBefore(this._event.date, 'day')
                  ? 'Odbędzie się'
                  : moment().isSame(this._event.date, 'day')
                    ? 'Dzisiaj'
                    : 'Odbyło się'}
                ${moment(this._event.date).format('D MMMM YYYY')}
              </div>
              ${!this._loggedIn ? '' : html`<hg-event-edit-date 
                .date=${this._event.date}
                @save=${(event) => {
                  this._event.date = event.detail;
                  this.requestUpdate();
                  this.updateData('date', event.detail);
                }}>
              </hg-event-edit-date>`}
            </div>
            <div class="divider"></div>
            ${this._contentLoading ? '' : html`<hg-editable-text 
              .ready=${true}
              .rich=${true}
              multiline
              id="text"
              .text=${this._content}
              @save=${(event) => {
                this._content = event.detail;
                db.doc('eventsContents/' + this.uid).set({content: event.detail});
              }}>
              <div class="ck-content smaller-text"></div>
            </hg-editable-text>`}
          </div>
        `}
        ${!this._dataReady ? '' : html`<hg-events-sidebar .selected=${this.uid} .events=${this._events}></hg-events-sidebar>`}
      </div>
    `;
  }
});
