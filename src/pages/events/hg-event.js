import {LitElement, html, css} from 'lit-element';
import moment from 'moment';
import {db, updateData} from "../../utils.js";
import '../../elements/hg-banner.js';
import './hg-events/hg-events-sidebar.js';
import './hg-event/hg-event-edit-date.js';

customElements.define('hg-event', class extends LitElement {
  static get properties() {
    return {
      uid: String,
      _event: Object,
      _content: String,
    };
  }
  constructor() {
    super();
  }
  static get styles() {
    return css`
      .container {
        display: flex;
        max-width: 1300px;
        margin: auto;
        padding: 20px;
      }
      .content {
        flex: 1;
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
      hg-events-sidebar {
        margin-left: 20px;
      }
    `;
  }
  async updated(changedProperties) {
    if (changedProperties.has('uid')) {
      db.doc('events/' + this.uid).get()
        .then((snapshot) => this._event = {...snapshot.data(), address: snapshot.id});
      this._content = (await db.doc('eventsContents/' + this.uid).get()).get('content');
    }
  }
  async updateData(path, data) {
    return updateData('events/' + this.uid, path, data);
  }
  render() {
    return this._event ? html`
      <hg-banner .doc=${`events/${this.uid}`} .noSubheading=${true} .useTitleAsHeading=${true}></hg-banner>
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
          ${this._content}
        </div>
        <hg-events-sidebar .selected=${this._event.address}></hg-events-sidebar>
      </div>
    ` : '';
  }
});
