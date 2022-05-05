import {LitElement, html, css} from 'lit';
import '../../../../../edit/hg-info-text.js';
import sharedStyles from '../../../../../styles/shared-styles.js';
import {staticProp} from '../../../../../utils.js';
import '../hg-dynamic-path-pages-add-address.js';
import '../hg-dynamic-path-pages-add-date.js';
import '../hg-dynamic-path-pages-add-name.js';
import '../hg-dynamic-path-pages-add-permalink-warning.js';
import '../hg-dynamic-path-pages-add-heading.js';

export class HgDynamicPathPagesAddNews extends LitElement {
  static properties = {
    address: String,
    addressTaken: Boolean,
    dateCorrect: Boolean,
    typing: Boolean,
    loading: Boolean,
    // observables
    date: Object, // {startDate: string, endDate?: string}
  };
  static styles = [sharedStyles, css`
    hg-dynamic-path-pages-add-permalink-warning {
      margin-bottom: 20px;
    }
    mwc-formfield-fixed {
      margin-bottom: 20px;
    }
  `];
  render() {
    return html`
      <hg-dynamic-path-pages-add-heading>
        Wybierz nazwę aktualności
      </hg-dynamic-path-pages-add-heading>
      <hg-dynamic-path-pages-add-permalink-warning></hg-dynamic-path-pages-add-permalink-warning>
      <hg-dynamic-path-pages-add-name
        .label=${'Nazwa aktualności'}
        @name-changed=${({detail: name}) => {
          this.dispatchEvent(new CustomEvent('title-changed', {detail: name}));
        }}>
      </hg-dynamic-path-pages-add-name>
      <div class="smaller-text">
        <hg-dynamic-path-pages-add-address
          .address=${this.address}
          .addressTaken=${this.addressTaken}
          .showLoading=${this.loading}
          .showAddressInfo=${this.address && !this.typing && !this.loading}>
        </hg-dynamic-path-pages-add-address>
      </div>
      <div class="divider"></div>
      <hg-dynamic-path-pages-add-heading>
        Wybierz datę publikacji aktualności
      </hg-dynamic-path-pages-add-heading>
      <hg-dynamic-path-pages-add-date
        .dateCorrect=${this.dateCorrect}
        .noSingleDay=${true}
        .labels=${staticProp({
          multipleDays: {
            startDate: 'Data rozpoczęcia publikacji',
            endDate: 'Data zakończenia publikacji',
            error: 'Data zakończenia publikacji nie może być miniona. Data zakończenia musi następować po dacie rozpoczęcia.',
          },
        })}
        @date-changed=${({detail: date}) => {
          this.date = date;
          this.dispatchEvent(new CustomEvent('date-changed', {detail: this.date}));
        }}>
      </hg-dynamic-path-pages-add-date>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-news', HgDynamicPathPagesAddNews);
