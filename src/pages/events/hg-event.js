import {LitElement, html, css} from 'lit';
import {until} from 'lit/directives/until.js';
import '@material/mwc-switch';
import {createEventJsonLd} from '../../../utils/seo';
import sharedStyles from '../../styles/shared-styles';
import ckContent from '../../styles/ck-content.js'
import '../../utils/fixes/mwc-formfield-fixed.js';
import {FirebaseAuthController} from '../../utils/FirebaseAuthController.js';
import {createDbPath, getFromDb, updateInDb} from '../../utils/database.js';
import {cleanTextForMetaDescription, updateData} from '../../utils.js';
import '../../edit/hg-editable-text.js';
import '../../elements/hg-banner.js';
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
      margin-bottom: 10px;
    }
    hg-event-edit-date {
      margin-left: 5px;
    }
    mwc-formfield-fixed {
      margin-top: 2px;
      margin-left: 14px;
    }
    mwc-switch {
      margin-right: 2px;
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
    @media all and (max-width: 599px) {
      .header {
        display: block;
      }
      hg-event-edit-date {
        margin-left: 0;
      }
    }
  `];
  constructor() {
    super();
    (async () => {
      this._promotedEvent = await getFromDb(createDbPath('events/promoted', 'uid'));
    })();
    this._firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this._loggedIn = loggedIn;
    });
  }
  async updated(changedProperties) {
    if (changedProperties.has('uid')) {
      this._dataReady = false;
      const uid = this.uid;
      this._events = await getFromDb(createDbPath('events/events'));
      if (this.uid === uid) {
        this._dataReady = true;
        this._event = this._events[this.uid];
        this.dispatchEvent(new CustomEvent('title-loaded', {detail: this._event ? this._event.title : 'Nie znaleziono wydarzenia'}))
      }
      if (this._event) {
        const eventJsonLd = createEventJsonLd(this._event);
        this.dispatchEvent(new CustomEvent('set-json-ld', {detail: eventJsonLd}));
        this._contentLoading = true;
        this._content = await getFromDb(createDbPath(`eventsContents/${this.uid}`, 'content'));
        this.dispatchEvent(new CustomEvent('set-meta-description', {detail: this._content}));
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
        .path=${this._dataReady && this._event ? createDbPath('events/events', this.uid) : undefined}
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
              ${!this._loggedIn ? '' : until(import('./hg-event/hg-event-edit-date.js').then(() => {
                return html`
                  <div class="cms controls smaller-text">
                    <hg-event-edit-date 
                      .date=${this._event.date}
                      @save=${(event) => {
                        this._event.date = event.detail;
                        this.requestUpdate();
                        this.updateData('date', event.detail);
                      }}>
                    </hg-event-edit-date>
                    <mwc-formfield-fixed .label=${'Publiczne'}>
                      <mwc-switch
                        id="public"
                        .selected=${this._event.public}
                        @click=${() => {
                          this.updateData('public', this.shadowRoot.getElementById('public').selected)
                        }}>
                      </mwc-switch>
                    </mwc-formfield-fixed>
                    <div title="${moment().isAfter(this._event.date, 'day') ? 'Nie można promować minionego wydarzenia' : ''}">
                      <mwc-formfield-fixed .label=${'Promuj'}>
                        <mwc-switch
                          id="promote"
                          .selected=${moment().isSameOrBefore(this._event.date, 'day') && this._promotedEvent === this.uid}
                          .disabled=${moment().isAfter(this._event.date, 'day')}
                          @click=${() => {
                            updateInDb(createDbPath('events/promoted', 'uid'), this.shadowRoot.getElementById('promote').selected ? this.uid : null);
                          }}>
                        </mwc-switch>
                      </mwc-formfield-fixed>
                    </div>
                  </div>
                `;
              }))}
            </div>
            <div class="divider"></div>
            ${this._contentLoading ? '' : html`<hg-editable-text 
              .ready=${true}
              .rich=${true}
              multiline
              id="text"
              .text=${this._content}
              @save=${({detail: text}) => {
                this._content = text;
                updateInDb(createDbPath(`eventsContents/${this.uid}`, 'content'), text);
                const cleanedText = cleanTextForMetaDescription(text);
                updateInDb(createDbPath(`eventsData/${this.uid}`, 'seo.description'), cleanedText);
                this.dispatchEvent(new CustomEvent('set-meta-description', {detail: cleanedText}));
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
