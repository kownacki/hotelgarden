import {LitElement, html, css} from 'lit';
import '../../../elements/hg-list-old.js';
import {isEventPast, isEventTodayOrUpcoming} from '../../../../utils/events.js';
import sharedStyles from '../../../styles/shared-styles.js';
import {deleteImageInDb} from '../../../utils/database.js';
import {removeDynamicPathPage} from '../../../utils.js';
import './hg-events-card.js';

export class HgEventsAndNewsList extends LitElement {
  static properties = {
    events: Array, // DynamicPathPage[]
    noNonPublic: Boolean,
    past: Boolean,
    max: Number,
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }
  `];
  render() {
    return html`
      <hg-list-old
        .array=${true}
        .noAdd=${true}
        .noSwap=${true}
        .noGetItems=${true}
        .noBuiltInDelete=${true}
        .items=${this.events}
        .ready=${true}
        .transform=${(items) => _.flow([
          ...(this.noNonPublic ? [_.filter((key) => items[key].public)] : []),
          _.filter((key) => this.past ? isEventPast(items[key]) : isEventTodayOrUpcoming(items[key])),
          _.sortBy((key) => items[key].date),
          ...(!this.past ? [] : [_.reverse]),
          ...(!this.max ? [] : [_.take(this.max)]),
        ])}
        .emptyTemplate=${html`<p style="font-size: 20px">Brak ${!this.past ? 'nadchodzących' : 'minionych'} wydarzeń</p>`}
        .getItemName=${(item) => `wydarzenie "${item.title}"`}       
        .itemTemplate=${(event, uid) => html`<hg-events-card .event=${{uid, ...event}}></hg-events-card>`}
        .onDelete=${(event) => {
          removeDynamicPathPage(event.uid);
          if (event.image) {
            deleteImageInDb(event.image.name);
          }
        }}
        @list-changed=${(event) => this.dispatchEvent(new CustomEvent('events-changed', {detail: event.detail}))}>
      </hg-list-old>
    `;
  }
}
customElements.define('hg-events-and-news-list', HgEventsAndNewsList);
