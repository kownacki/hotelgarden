import {LitElement, html, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import './hg-events-card.js';
import firebase from "firebase";
import sharedStyles from './shared-styles.js';

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
      const allEevents = _.map(_.method('data'), (await firebase.firestore().collection("events").get()).docs);
      const today = `${new Date().getFullYear()}${_.padStart(2, new Date().getMonth() + 1)}${_.padStart(2, new Date().getDate())}`;
      this._upcoming = _.flow([
        _.filter((event) => event.date >= today),
        _.sortBy('date'),
      ])(allEevents);
      this._past = _.flow([
        _.filter((event) => event.date < today),
        _.sortBy('date'),
        _.reverse,
      ])(allEevents);
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
        ${_.isEmpty(this._past) ? '' : repeat(this._past, _.get('uid'), (event) => html`
          <hg-events-card .event=${event}></hg-events-card>
        `)} 
      </div>
    `;
  }
});
