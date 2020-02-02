import {LitElement, html, css} from 'lit-element';
import moment from "moment";
import {staticProp} from "../../utils";
import sharedStyles from '../../styles/shared-styles.js';
import '../../elements/hg-heading.js';
import '../../elements/hg-list.js';
import './hg-events/hg-events-add.js';
import './hg-events/hg-events-card.js';

// favicon rozciągnięta??
// todo add scrolling to dialogs

customElements.define('hg-events', class extends LitElement {
  static get properties() {
    return {
      _loggedIn: Boolean,
    };
  }
  constructor() {
    super();
    this._unsubscribeLoggedInListener = auth.onAuthStateChanged((user) => this._loggedIn = Boolean(user));
  }
  disconnectedCallback() {
    this._unsubscribeLoggedInListener();
    return super.disconnectedCallback();
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        max-width: 1000px;
        margin: 20px auto;
        display: block;
      }
      hg-heading {
        margin: 40px 0;
      }
      .events {
        max-width: 1300px;
        padding: 0 20px;
        margin: 20px auto;
      }
      hg-list {
        display: block;
        margin-bottom: 50px;
      }
      mwc-button {
        --mdc-theme-primary: var(--primary-color);
      }
    `];
  }
  render() {
    return html`
      <div class="events">
        ${!this._loggedIn ? '' : html`<hg-events-add></hg-events-add>`}
        <hg-heading>${'Nadchodzące wydarzenia'}</hg-heading>
        <hg-list
          .noAdd=${true}
          .noSwap=${true}
          .transform=${(items) => _.flow([
            _.filter((key) => moment().isSameOrBefore(items[key].date, 'day')),
            _.sortBy((key) => items[key].date),
          ])}
          .path=${staticProp({doc: 'events/events'})}
          .emptyTemplate=${html`<p style="font-size: 20px">Brak nadchodzących wydarzeń</p>`}
          .getItemName=${(item) => `wydarzenie "${item.title}"`}       
          .itemTemplate=${(event, uid) => html`<hg-events-card .event=${{uid, ...event}}></hg-events-card>`}>
        </hg-list>
        <mwc-button id="button" raised label="Pokaż minione wydarzenia"
          @click=${() => {
            this.shadowRoot.getElementById('past').hidden = false;
            this.shadowRoot.getElementById('button').hidden = true;
          }}>
        </mwc-button>
        <div id="past" hidden>
          <hg-heading>${'Minione wydarzenia'}</hg-heading>
          <hg-list
            .noAdd=${true}
            .transform=${(items) => _.flow([
              _.filter((key) => moment().isAfter(items[key].date, 'day')),
              _.sortBy((key) => items[key].date),
              _.reverse,
            ])}
            .path=${staticProp({doc: 'events/events'})}
            .emptyTemplate=${html`<p style="font-size: 20px">Brak minionych wydarzeń</p>`}
            .getItemName=${(item) => `wydarzenie "${item.title}"`}       
            .itemTemplate=${(event, uid) => html`<hg-events-card .event=${{uid, ...event}}></hg-events-card>`}>
          </hg-list>
        </div>
      </div>
    `;
  }
});
