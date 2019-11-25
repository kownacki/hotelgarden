import {LitElement, html, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import moment from 'moment';
import {db, splitEvents} from "../utils.js";
import sharedStyles from '../sharedStyles.js';
import './hg-events-card.js';
import './hg-events-add.js';

customElements.define('hg-events', class extends LitElement {
  static get properties() {
    return {
      _upcoming: Array,
      _past: Array,
    };
  }
  constructor() {
    super();
    (async () => {
      const allEvents = _.map((snapshot) => ({...snapshot.data(), address: snapshot.id}), (await db.collection("events").get()).docs);
      [this._upcoming, this._past] = splitEvents(allEvents);
    })();
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
        max-width: 1300px;
        padding: 0 20px;
        margin: 20px auto;
      }
      h2 {
        color: var(--primary-color);
        font-weight: 300;
      }
      mwc-button {
        --mdc-theme-primary: var(--primary-color);
      }
    `];
  }
  render() {
    return html`
      <hg-events-add></hg-events-add>
      <h2>Nadchodzące wydarzenia</h2>
      ${_.isEmpty(this._upcoming) ? '' : repeat(this._upcoming, _.get('uid'), (event) => html`
        <hg-events-card .event=${event}></hg-events-card>
      `)}
      <mwc-button id="button" raised label="Pokaż minione wydarzenia"
        @click=${() => {
          this.shadowRoot.getElementById('past').hidden = false;
          this.shadowRoot.getElementById('button').hidden = true;
        }}>
      </mwc-button>
      <div id="past" hidden>
        <h2>Minione wydarzenia</h2>
        ${_.isEmpty(this._past) ? '' : repeat(this._past.reverse(), _.get('uid'), (event) => html`
          <hg-events-card .event=${event}></hg-events-card>
        `)} 
      </div>
    `;
  }
});
