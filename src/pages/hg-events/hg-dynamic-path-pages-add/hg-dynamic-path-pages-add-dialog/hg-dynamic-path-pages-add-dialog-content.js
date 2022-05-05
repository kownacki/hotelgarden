import {LitElement, html, css} from 'lit';
import {choose} from 'lit/directives/choose.js';
import {when} from 'lit/directives/when.js';
import sharedStyles from '../../../../styles/shared-styles.js';
import './types/hg-dynamic-path-pages-add-event.js';
import './types/hg-dynamic-path-pages-add-news.js';
import './hg-dynamic-path-pages-add-address.js';
import './hg-dynamic-path-pages-add-name.js';
import {HgEventsAddType} from './hg-dynamic-path-pages-add-type-select.js';

export class HgDynamicPathPagesAddDialogContent extends LitElement {
  static properties = {
    address: String,
    addressTaken: Boolean,
    dateCorrect: Boolean,
    typing: Boolean,
    loading: Boolean,
    // observables
    dialog: Element,
    // private
    _type: String, // HgEventsAddType
  };
  static styles = [sharedStyles, css`
    hg-dynamic-path-pages-add-type-select {
      margin: 10px 0;
    }
    .date-info, .type-info {
      color: var(--error-color);
    }
    hg-dynamic-path-pages-add-name {
      margin: 20px 0 ;
    }
  `];
  render() {
    return html`
      <hg-dynamic-path-pages-add-type-select
        @selected-type=${({detail: type}) => {
          this._type = type;
          this.dispatchEvent(new CustomEvent('type-changed', {detail: this._type}));
        }}>
      </hg-dynamic-path-pages-add-type-select>
      ${choose(this._type, [
        [HgEventsAddType.EVENT, () => html`
          <hg-dynamic-path-pages-add-event
            .dateCorrect=${this.dateCorrect}
            @date-changed=${({detail: {startDate, endDate}}) => {
              this.dispatchEvent(new CustomEvent('date-changed', {detail: {startDate, endDate}}));
            }}>
          </hg-dynamic-path-pages-add-event>
        `],
        [HgEventsAddType.NEWS, () => html`
          <hg-dynamic-path-pages-add-news></hg-dynamic-path-pages-add-news>
        `],
      ])}
      ${when(
        this._type,
        () => html`
          <hg-dynamic-path-pages-add-name
            .label=${this._type === HgEventsAddType.EVENT ? 'Nazwa wydarzenia' : 'Nazwa aktualności'}
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
        `,
      )}
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-dialog-content', HgDynamicPathPagesAddDialogContent);
