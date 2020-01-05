import {LitElement, html, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {splitEvents, assignKeys} from '../../../utils.js';

customElements.define('hg-events-sidebar', class extends LitElement {
  static get properties() {
    return {
      selected: String,
      events: Object,
      _upcoming: Array,
    };
  }
  static get styles() {
    return css`
      :host {
        width: 250px;
        background: rgba(var(--primary-color-rgb), 10%);
        padding: 20px;
        text-align: center;
      }
      h2 {
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
      /* todo bug multiline breaks */
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
  updated(changedProperties) {
    if (changedProperties.has('events')) {
      this._upcoming = splitEvents(assignKeys('uid')(this.events))[0];
    }
  }
  render() {
    return html`
      <h2>Nadchodzące wydarzenia</h2>
      <nav>
        <ul>
          ${_.isEmpty(this._upcoming) ? '' : repeat(this._upcoming, _.get('uid'), (event) => html`
            <li ?selected=${this.selected === event.uid}><a href="/wydarzenia/${event.uid}"><span>${event.title}</span></a></li>
          `)}       
        </ul>
        <a class="all" href="/wydarzenia">Wszystkie wydarzenia</a>
      </nav>
    `;
  }
});
