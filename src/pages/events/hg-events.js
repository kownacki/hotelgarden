import {LitElement, html, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {db, splitEvents} from "../../utils.js";
import moment from "moment";
import sharedStyles from '../../sharedStyles.js';
import '../../elements/hg-heading.js';
import './hg-events/hg-events-card.js';
import './hg-events/hg-events-add.js';
import '../../elements/hg-list.js';

customElements.define('hg-events', class extends LitElement {
  static get properties() {
    return {
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
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
        <hg-events-add></hg-events-add>
        <hg-heading>${'Nadchodzące wydarzenia'}</hg-heading>
        <hg-list
          .noAdd=${true}
          .noSwap=${true}
          .transform=${_.flow([
            _.filter((event) => moment().isSameOrBefore(event.date, 'day')),
            _.sortBy('date'),
          ])}
          .path=${{doc: 'events/events'}}
          .emptyTemplate=${html`<p style="font-size: 20px">Brak nadchodzących wydarzeń</p>`}
          .getItemName=${(item) => `wydarzenie "${item.title}"`}       
          .itemTemplate=${(event) => html`<hg-events-card .event=${event}></hg-events-card>`}>
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
            .transform=${_.flow([
              _.filter((event) => moment().isAfter(event.date, 'day')),
              _.sortBy('date'),
              _.reverse,
            ])}
            .path=${{doc: 'events/events'}}
            .emptyTemplate=${html`<p style="font-size: 20px">Brak minionych wydarzeń</p>`}
            .getItemName=${(item) => `wydarzenie "${item.title}"`}       
            .itemTemplate=${(event) => html`<hg-events-card .event=${event}></hg-events-card>`}>
          </hg-list>
        </div>
      </div>
    `;
  }
});
