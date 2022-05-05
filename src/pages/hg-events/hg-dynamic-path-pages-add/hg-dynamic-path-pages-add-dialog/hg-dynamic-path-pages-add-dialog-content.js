import {LitElement, html, css} from 'lit';
import {choose} from 'lit/directives/choose.js';
import sharedStyles from '../../../../styles/shared-styles.js';
import {DynamicPathPageType} from '../../../../utils.js';
import './types/hg-dynamic-path-pages-add-event.js';
import './types/hg-dynamic-path-pages-add-news.js';
import './hg-dynamic-path-pages-add-type-select.js';

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
    _type: String, // DynamicPathPageType
  };
  static styles = [sharedStyles, css`
    hg-dynamic-path-pages-add-type-select {
      margin: 10px 0;
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
        [DynamicPathPageType.EVENT, () => html`
          <hg-dynamic-path-pages-add-event
            .address=${this.address}
            .addressTaken=${this.addressTaken}
            .dateCorrect=${this.dateCorrect}
            .typing=${this.typing}
            .loading=${this.loading}
            @title-changed=${({detail: name}) => {
              this.dispatchEvent(new CustomEvent('title-changed', {detail: name}));
            }}
            @date-changed=${({detail: {startDate, endDate}}) => {
              this.dispatchEvent(new CustomEvent('date-changed', {detail: {startDate, endDate}}));
            }}>
          </hg-dynamic-path-pages-add-event>
        `],
        [DynamicPathPageType.NEWS, () => html`
          <hg-dynamic-path-pages-add-news
            .address=${this.address}
            .addressTaken=${this.addressTaken}
            .dateCorrect=${this.dateCorrect}
            .typing=${this.typing}
            .loading=${this.loading}
            @title-changed=${({detail: name}) => {
              this.dispatchEvent(new CustomEvent('title-changed', {detail: name}));
            }}
            @date-changed=${({detail: {startDate, endDate}}) => {
              this.dispatchEvent(new CustomEvent('date-changed', {detail: {startDate, endDate}}));
            }}>
          </hg-dynamic-path-pages-add-news>
        `],
      ])}
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-dialog-content', HgDynamicPathPagesAddDialogContent);
