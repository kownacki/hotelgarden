import {LitElement, html, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import firebase from "firebase";
import {splitEvents} from '../utils.js';

customElements.define('hg-events-sidebar', class extends LitElement {
  static get properties() {
    return {
      selected: String,
      _upcoming: Array,
      _past: Array,
    };
  }
  constructor() {
    super();
    (async () => {
      const docs = (await firebase.firestore().collection("events").get()).docs;
      const allEvents = _.map((snapshot) => ({...snapshot.data(), address: snapshot.id}), docs);
      [this._upcoming, this._past] = splitEvents(allEvents);
    })();
  }
  static get styles() {
    return css`
      :host {
        width: 250px;
        background: rgba(var(--primary-color-rgb), 10%);
        padding: 20px;
        text-align: center;
      }
      h3 {
        color: var(--primary-color);
        font-weight: 400;
        font-size: 25px;
        margin: 0;
      }
      ul {
        padding: 0;
      }
      li {
        list-style-type: none;
      }
      li a {
        display: block;
        padding: 10px;
        color: var(--secondary-color);
        text-decoration: none;
      }
      li a span {
        position: relative;
      }
      li a span::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: -2px;
        left: 0;
        background: var(--primary-color);
        visibility: hidden;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transition: all 0.2s ease-in-out 0s;
        transition: all 0.2s ease-in-out 0s;
      }
      li a:hover span::before, li[selected] a span:before {
        visibility: visible;
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
      }
      a.all {
        display: block;
        padding: 8px 16px;
        background: rgba(var(--primary-color-rgb), 90%);
        color: white;
        text-decoration: none;
        transition: background-color 0.3s ease;
      }
      a.all:hover {
        background: rgba(var(--primary-color-rgb), 70%);
      }
    `;
  }
  render() {
    return html`
      <h3>Nadchodzące wydarzenia</h3>
      <nav>
        <ul>
          ${_.isEmpty(this._upcoming) ? '' : repeat(this._upcoming, _.get('uid'), (event) => html`
            <li ?selected=${this.selected === event.address}><a href="/wydarzenia/${event.address}"><span>${event.title}</span></a></li>
          `)}       
        </ul>
        <a class="all" href="/wydarzenia">Wszystkie wydarzenia</a>
      </nav>
    `;
  }
});
