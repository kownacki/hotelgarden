import {LitElement, html, css} from 'lit';
import '../../elements/hg-list-old.js';
import {
  DynamicPathPageType,
  getDynamicPathPageObsolityScore,
  isDynamicPathPageArchived,
  isDynamicPathPageHidden,
} from '../../../utils/events.js';
import sharedStyles from '../../styles/shared-styles.js';
import {deleteImageInDb} from '../../utils/database.js';
import {removeDynamicPathPage} from '../../utils.js';
import './hg-dynamic-path-page-card.js';

export class HgDynamicPathPagesList extends LitElement {
  static properties = {
    dynamicPathPages: Array, // DynamicPathPage[]
    showHidden: Boolean,
    archived: Boolean,
    max: Number,
    enableEditing: Boolean,
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
        .noBuiltInDelete=${true}
        .items=${this.dynamicPathPages}
        .ready=${true}
        .enableEditing=${this.enableEditing}
        .transform=${(items) => _.flow([
          ...(this.showHidden ? [] : [_.filter((key) => !isDynamicPathPageHidden(items[key]))]),
          _.filter((key) => this.archived ? isDynamicPathPageArchived(items[key]) : !isDynamicPathPageArchived(items[key])),
          _.sortBy((key) => {
            const item = items[key];
            return getDynamicPathPageObsolityScore(item);
          }),
          ...(!this.max ? [] : [_.take(this.max)]),
        ])}
        .emptyTemplate=${html`
          <p style="font-size: 20px">Brak ${!this.archived ? 'nadchodzących' : 'minionych'} wydarzeń i aktualności</p>
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
