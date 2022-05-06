import {LitElement, html, css} from 'lit';
import sharedStyles from '../../styles/shared-styles.js';
import './hg-news-edit/hg-news-edit-date.js';

import {HgNewsEditFields} from '../hg-dynamic-path-page.js';

export class HgNewsEdit extends LitElement {
  static properties = {
    news: Object, // DynamicPathPageNewsWithUid
    promotedEventData: Object, // EventData | undefined
  };
  static styles = [sharedStyles, css`
    .container {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
    hg-news-edit-date {
      margin-left: 5px;
    }
    @media all and (max-width: 599px) {
      hg-news-edit-date {
        margin-left: 0;
      }
    }
  `];
  render() {
    return html`
      <div class="container cms">
        <hg-news-edit-date
          .publishDate=${this.news.publishDate}
          .unpublishDate=${this.news.unpublishDate}
          @request-date-change=${({detail: {publishDate, unpublishDate}}) => {
            this.dispatchEvent(new CustomEvent('request-change', {
              detail: {
                field: HgNewsEditFields.DATE,
                value: {publishDate, unpublishDate},
              },
            }));
          }}>
        </hg-news-edit-date>
    `;
  }
}
customElements.define('hg-news-edit', HgNewsEdit);
