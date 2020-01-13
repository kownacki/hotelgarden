import {LitElement, html, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {splitEvents, assignKeys} from '../../../utils.js';
import sharedStyles from '../../../sharedStyles.js';

customElements.define('hg-events-sidebar', class extends LitElement {
  static get properties() {
    return {
      selected: String,
      events: Object,
      _upcoming: Array,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        top: 0;
        text-align: center;
        box-sizing: border-box;
        min-width: 280px;
        max-width: 280px;
      }
      .container {
        background: rgba(var(--primary-color-rgb), 10%);
        padding: 40px 20px;
        position: sticky;
        top: calc(20px + var(--headerHeight));
      }
      h2 {
        font-weight: 400;
        font-size: 25px;
        margin: 0;
      }
      ul {
        padding: 0;
      }
      li {
        list-style-type: none;
        margin: 5px 0;
      }
      li a {
        display: block;
        padding: 8px;
        color: var(--secondary-color);
        text-decoration: none;
        transition: background-color 0.3s ease;
      }
      li a:hover, li[selected] a {
        background: rgba(var(--primary-color-rgb), 90%);
        color: white;
      }
      a.all {
        display: block;
        padding: 8px 16px;
        background: rgba(var(--accent-color-rgb), 90%);
        color: white;
        text-decoration: none;
        transition: background-color 0.3s ease;
      }
      a.all:hover {
        background: rgba(var(--accent-color-rgb), 70%);
      }
    `];
  }
  updated(changedProperties) {
    if (changedProperties.has('events')) {
      this._upcoming = splitEvents(assignKeys('uid')(this.events))[0];
    }
  }
  render() {
    return html`
      <div class="container">
        <h2>Nadchodzące wydarzenia</h2>
        <nav>
          <ul>
            ${_.isEmpty(this._upcoming) ? '' : repeat(this._upcoming, _.get('uid'), (event) => html`
              <li ?selected=${this.selected === event.uid}><a href="/wydarzenia/${event.uid}">${event.title}</a></li>
            `)}       
          </ul>
          <a class="all" href="/wydarzenia">Wszystkie wydarzenia</a>
        </nav>
      </div>
    `;
  }
});
