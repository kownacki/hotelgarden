import {LitElement, html, css} from 'lit-element';
import moment from 'moment';
import {db, updateData} from "../../utils.js";
import '../../elements/hg-banner.js';
import './hg-events/hg-events-sidebar.js';
import './hg-event/hg-event-edit-date.js';
import {splitEvents, staticProp} from "../../utils";

customElements.define('hg-event', class extends LitElement {
  static get properties() {
    return {
      uid: String,
      _events: Array,
      _event: Object,
      _contentLoading: Boolean,
      _content: String,
    };
  }
  constructor() {
    super();
    (async () => {
      this._events = (await db.doc('events/events').get()).data() || {};
    })();
  }
  static get styles() {
    return css`
      .container {
        display: flex;
        max-width: 1040px;
        margin: auto;
        padding: 20px;
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
        margin-bottom: 10px;
      }
    `;
  }
  async updated(changedProperties) {
    if (changedProperties.has('uid') || changedProperties.has('_events')) {
      if (this.uid && this._events) {
        this._event = this._events[this.uid];
        this._contentLoading = true;
        this._content = (await db.doc('eventsContents/' + this.uid).get()).get('content');
        this._contentLoading = false;
      }
    }
  }
  async updateData(path, data) {
    return updateData('events/events', `${this.uid}.${path}`, data);
  }
  render() {
    return this._event ? html`
      <hg-banner .path=${staticProp({doc: 'events/events', field: this.uid})} .noSubheading=${true} .useTitleAsHeading=${true}></hg-banner>
      <div class="container">
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
            <hg-event-edit-date 
              .date=${this._event.date}
              @save=${(event) => {
                this._event.date = event.detail;
                this.requestUpdate();
                this.updateData('date', event.detail);
              }}>
            </hg-event-edit-date>
          </div>
          <div class="divider"></div>
          ${this._contentLoading ? '' : html`<hg-editable-text 
            .rich=${true}
            multiline
            id="text"
            .text=${this._content}
            @save=${(event) => {
              this._content = event.detail;
              db.doc('eventsContents/' + this.uid).set({content: event.detail});
            }}>
            <div></div>
          </hg-editable-text>`}
        </div>
        <hg-events-sidebar .selected=${this.uid} .events=${this._events}></hg-events-sidebar>
      </div>
    ` : '';
  }
});
