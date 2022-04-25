import {LitElement, html, css} from 'lit';
import {until} from 'lit/directives/until.js';
import '@material/mwc-switch';
import {isEventUpcoming, isEventPast, isEventToday} from '../../utils/events.js';
import {createEventJsonLd} from '../../utils/seo.js';
import sharedStyles from '../styles/shared-styles.js';
import ckContent from '../styles/ck-content.js'
import '../utils/fixes/mwc-formfield-fixed.js';
import {FirebaseAuthController} from '../utils/FirebaseAuthController.js';
import {createDbPath, getFromDb, updateInDb} from '../utils/database.js';
import {cleanTextForMetaDescription, updateData} from '../utils.js';
import '../edit/hg-editable-text.js';
import './hg-event/hg-events-sidebar.js';
import './hg-page/hg-page-loading.js';

export class HgEvent extends LitElement {
  _firebaseAuth;
  static properties = {
    eventData: Object, // EventData
    eventsList: Object, // EventsList
    promotedEventData: Object, // EventData | undefined
    promotedEventLoaded: Boolean,
    _content: String,
    _contentReady: Boolean,
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
    this._firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this._loggedIn = loggedIn;
    });
  }
  async willUpdate(changedProperties) {
    if (changedProperties.has('eventData') && this.eventData.event) {
      const eventJsonLd = createEventJsonLd(this.eventData.event);
      this.dispatchEvent(new CustomEvent('set-json-ld', {detail: eventJsonLd}));
      this._content = await getFromDb(createDbPath(`eventsContents/${this.eventData.uid}`, 'content'));
      this.dispatchEvent(new CustomEvent('set-meta-description', {detail: this._content}));
      this._contentReady = true;
    }
  }
  async updateData(path, data) {
    return updateData('events/events', `${this.eventData.uid}.${path}`, data);
  }
  render() {
    return html`
      <div class="container">
        ${!this.eventData.event ? '' : html`
          <div class="content">
            <div class="header">
              <div class="date">
                ${isEventUpcoming(this.eventData.event)
                  ? 'Odbędzie się'
                  : isEventToday(this.eventData.event)
                    ? 'Dzisiaj'
                    : 'Odbyło się'}
                ${this.eventData.event.date.split('-').reverse().join(' / ')}
              </div>
              ${!this._loggedIn ? '' : until(import('./hg-event/hg-event-edit-date.js').then(() => {
                return html`
                  <div class="cms controls smaller-text">
                    <hg-event-edit-date 
                      .date=${this.eventData.event.date}
                      @save=${({detail: date}) => {
                        this.eventData.event.date = date;
                        this.requestUpdate();
                        this.updateData('date', date);
                      }}>
                    </hg-event-edit-date>
                    <mwc-formfield-fixed .label=${'Publiczne'}>
                      <mwc-switch
                        id="public"
                        .selected=${this.eventData.event.public}
                        @click=${() => {
                          this.updateData('public', this.shadowRoot.getElementById('public').selected)
                        }}>
                      </mwc-switch>
                    </mwc-formfield-fixed>
                    <div title=${isEventPast(this.eventData.event) ? 'Nie można promować minionego wydarzenia' : ''}>
                      <mwc-formfield-fixed .label=${'Promuj'}>
                        <mwc-switch
                          id="promote"
                          .selected=${isEventUpcoming(this.eventData.event) && this.promotedEventData?.uid === this.eventData.uid}
                          .disabled=${isEventPast(this.eventData.event)}
                          @click=${() => {
                            updateInDb(createDbPath('events/promoted', 'uid'), this.shadowRoot.getElementById('promote').selected ? this.eventData.uid : null);
                          }}>
                        </mwc-switch>
                      </mwc-formfield-fixed>
                    </div>
                  </div>
                `;
              }))}
            </div>
            <div class="divider"></div>
            ${this._contentReady
              ? html`
                <hg-editable-text 
                  multiline
                  id="text"
                  .ready=${true}
                  .rich=${true}
                  .text=${this._content}
                  @save=${({detail: text}) => {
                    this._content = text;
                    updateInDb(createDbPath(`eventsContents/${this.eventData.uid}`, 'content'), text);
                    const cleanedText = cleanTextForMetaDescription(text);
                    updateInDb(createDbPath(`eventsData/${this.eventData.uid}`, 'seo.description'), cleanedText);
                    this.dispatchEvent(new CustomEvent('set-meta-description', {detail: cleanedText}));
                  }}>
                  <div class="ck-content smaller-text"></div>
                </hg-editable-text>
              `
              : html`<hg-page-loading></hg-page-loading>`
            }
          </div>
        `}
        <hg-events-sidebar
          .selected=${this.eventData.uid}
          .events=${this.eventsList}>
        </hg-events-sidebar>
      </div>
    `;
  }
}
customElements.define('hg-event', HgEvent);
