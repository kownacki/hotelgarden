import {LitElement, html, css} from 'lit';
import '@material/mwc-button';
import {EVENTS_ROOT_PATH} from '../../../utils/urlStructure.js';
import sharedStyles from '../../styles/shared-styles.js';
import {addDynamicPathPageEvent} from '../../utils.js';
import './hg-dynamic-path-pages-add/hg-dynamic-path-pages-add-dialog.js';

export class HgDynamicPathPagesAdd extends LitElement {
  static properties = {
  };
  static styles = [sharedStyles, css`
  `];
  async _addDynamicPathPage(type, title, startDate, endDate, permalink) {
    // todo transaction to avoid race condition
    await addDynamicPathPageEvent(title, startDate, endDate, permalink);
    window.history.pushState(null, null, `${EVENTS_ROOT_PATH}${permalink}`);
    this.dispatchEvent(new CustomEvent('location-changed', {composed: true, bubbles: true}));
  };
  render() {
    return html`
      <div class="cms">
        <mwc-button
          .raised=${true}
          .icon=${'add'}
          .label=${'Dodaj nowe'}
          @click=${() => {
            this.shadowRoot.getElementById('dialog').dialog.open();
          }}>
        </mwc-button>
        <hg-dynamic-path-pages-add-dialog
          id="dialog"
          @add=${({detail: {type, title, startDate, endDate, permalink}}) => {
            this._addDynamicPathPage(type, title, startDate, endDate, permalink);
          }}>
        </hg-dynamic-path-pages-add-dialog>
      </div>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add', HgDynamicPathPagesAdd);
