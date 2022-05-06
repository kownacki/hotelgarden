import {LitElement, html, css} from 'lit';
import '../../elements/hg-list-old.js';
import {DynamicPathPageType, isEventPast, isEventGoingOrUpcoming} from '../../../utils/events.js';
import sharedStyles from '../../styles/shared-styles.js';
import {deleteImageInDb} from '../../utils/database.js';
import {removeDynamicPathPage} from '../../utils.js';
import './hg-dynamic-path-page-card.js';

export class HgDynamicPathPagesList extends LitElement {
  static properties = {
    dynamicPathPages: Array, // DynamicPathPage[]
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
        .noAdd=${true}
        .noSwap=${true}
        .noGetItems=${true}
        .noBuiltInDelete=${true}
        .items=${this.dynamicPathPages}
        .ready=${true}
        .transform=${(items) => _.flow([
          ...(this.noNonPublic ? [_.filter((key) => items[key].public)] : []),
          _.filter((key) => this.past ? isEventPast(items[key]) : isEventGoingOrUpcoming(items[key])),
          _.sortBy((key) => items[key].date),
          ...(!this.past ? [] : [_.reverse]),
          ...(!this.max ? [] : [_.take(this.max)]),
        ])}
        .emptyTemplate=${html`
          <p style="font-size: 20px">Brak ${!this.past ? 'nadchodzących' : 'minionych'} wydarzeń</p>
        `}
        .getItemName=${(dynamicPathPage) => {
          const typeName = dynamicPathPage.type === DynamicPathPageType.EVENT ? 'wydarzenie' : 'aktualność';
          return `${typeName} "${dynamicPathPage.title}"`;
        }}
        .itemTemplate=${(dynamicPathPage, uid) => html`
          <hg-dynamic-path-page-card 
            .dynamicPathPage=${{uid, ...dynamicPathPage}}>
          </hg-dynamic-path-page-card>
        `}
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
customElements.define('hg-dynamic-path-pages-list', HgDynamicPathPagesList);
