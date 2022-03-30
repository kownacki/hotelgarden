import {LitElement, html, css} from 'lit';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import sharedStyles from '../../styles/shared-styles';
import ckContent from '../../styles/ck-content.js'
import {FirebaseAuthController} from '../../utils/FirebaseAuthController.js';
import {updateData, staticProp, setMetaDescription} from '../../utils.js';
import '../../edit/hg-editable-text.js';
import '../../elements/hg-banner.js';
import './hg-event/hg-event-edit-date.js';
import './hg-events/hg-events-sidebar.js';

export class HgEvent extends LitElement {
  _firebaseAuth;
  static properties = {
    uid: String,
    _events: Array,
    _event: Object,
    _promotedEvent: String,
    _contentLoading: Boolean,
    _content: String,
    _dataReady: Boolean,
    _loggedIn: Boolean,
  };
  static styles = [sharedStyles, ckContent, css`
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
      flex-wrap: wrap;
      margin-bottom: 5px;
    }
    .controls > * {
      display: none;
    }
    .header:hover .controls > *, hg-event-edit-date[opened] {
      display: flex;
    }
    paper-toggle-button {
      margin: 1px 0 1px 20px;
    }
    @media all and (max-width: 599px) {
      .header {
        display: block;
      }
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
  constructor() {
    super();
    (async () => {
      this._promotedEvent = _.get('uid', (await db.doc('events/promoted').get()).data());
    })();
    this._firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this._loggedIn = loggedIn;
    });
  }
  async updated(changedProperties) {
    if (changedProperties.has('uid')) {
      this._dataReady = false;
      const uid = this.uid;
      this._events = (await db.doc('events/events').get()).data() || {};
      if (this.uid === uid) {
        this._dataReady = true;
        this._event = this._events[this.uid];
        this.dispatchEvent(new CustomEvent('title-loaded', {detail: this._event ? this._event.title : 'Nie znaleziono wydarzenia'}))
      }
      if (this._event) {
        this._contentLoading = true;
        this._content = (await db.doc('eventsContents/' + this.uid).get()).get('content');
        setMetaDescription(this._content);
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
                    id="public"
                    .checked=${this._event.public}
                    @click=${() => this.updateData('public', this.shadowRoot.getElementById('public').checked)}>
                    Publiczne
                  </paper-toggle-button>
                  <div title="${moment().isAfter(this._event.date, 'day') ? 'Nie można promować minionego wydarzenia' : ''}">
                    <paper-toggle-button
                      id="promote"
                      .checked=${moment().isSameOrBefore(this._event.date, 'day') && this._promotedEvent === this.uid}
                      .disabled=${moment().isAfter(this._event.date, 'day')}
                      @click=${() => db.doc('events/promoted').set({uid: this.shadowRoot.getElementById('promote').checked ? this.uid : null})}>
                      Promuj
                    </paper-toggle-button>
                  </div>
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
}
customElements.define('hg-event', HgEvent);
