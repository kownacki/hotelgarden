import {LitElement, html, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import './hg-events-card.js';
import firebase from "firebase";

customElements.define('hg-events', class extends LitElement {
  static get properties() {
    return {
      _events: Array,
    };
  }
  constructor() {
    super();
    (async () => {
      this._events = _.flow([
        _.map(_.method('data')),
        _.sortBy((event) => `${event.date.year}${_.padStart(2, event.date.month)}${_.padStart(2, event.date.day)}`),
        _.reverse,
      ])((await firebase.firestore().collection("events").get()).docs);
    })();
  }
  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 1300px;
        margin: auto;
      }
    `;
  }
  render() {
    return html`
      ${_.isEmpty(this._events) ? '' : repeat(this._events, _.get('uid'), (event) => html`
        <hg-events-card .event=${event}></hg-events-card>
      `)}
    `;
  }
});
