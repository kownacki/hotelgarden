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
      _promotedEvent: String,
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
      .controls {
        display: flex;
        align-items: flex-start;
      }
      paper-toggle-button {
        margin: 1px 0 1px 10px;
      }
      hg-event-edit-date, paper-toggle-button {
        display: none;
      }
      .header:hover .controls > *, hg-event-edit-date[opened] {
        display: flex;
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
    (async () => {
      this._promotedEvent = _.get('uid', (await db.doc('events/promoted').get()).data());
    })();
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
                ${this._event.date.split('-').reverse().join(' / ')}
              </div>
              ${!this._loggedIn ? '' : html`
                <div class="controls smaller-text">
                  <hg-event-edit-date 
                    .date=${this._event.date}
                    @save=${(event) => {
                      this._event.date = event.detail;
                      this.requestUpdate();
                      this.updateData('date', event.detail);
                    }}>
                  </hg-event-edit-date>
                  <paper-toggle-button
                    id="promote"
                    .checked=${this._promotedEvent === this.uid}
                    @click=${() => db.doc('events/promoted').set({uid: this.shadowRoot.getElementById('promote').checked ? this.uid : null})}>
                    Promuj
                  </paper-toggle-button>
                </div>
              `}
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
