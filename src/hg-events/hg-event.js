import {LitElement, html, css} from 'lit-element';
import moment from 'moment';
import {db} from "../utils.js";
import '../hg-banner.js';
import './hg-events-sidebar.js';

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
      .date {
        font-size: 20px;
        color: var(--secondary-color);
        margin-bottom: 10px;
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
      db.collection('events').doc(this.uid).get()
        .then((snapshot) => this._event = {...snapshot.data(), address: snapshot.id});
      this._content = (await db.collection('eventsContents').doc(this.uid).get()).get('content');
    }
  }
  render() {
    return this._event ? html`
      <hg-banner
        .src=${this._event.image}
        .heading=${this._event.title}>
      </hg-banner>
      <div class="container">
        <div class="content"> 
          <div class="date">
            ${moment().isBefore(this._event.date, 'day') 
              ? 'Odbędzie się'
              : moment().isSame(this._event.date, 'day') 
              ? 'Dzisiaj'
              : 'Odbyło się'}
            ${moment(this._event.date).format('D MMMM YYYY')}</div>
          <div class="divider"></div>
          ${this._content}
        </div>
        <hg-events-sidebar .selected=${this._event.address}></hg-events-sidebar>
      </div>
    ` : '';
  }
});
