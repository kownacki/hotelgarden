import {LitElement, html, css} from 'lit';
import '@material/mwc-button';
import sharedStyles from '../../../../styles/shared-styles.js';

export class HgDynamicPathPagesAddDialogButtonCancel extends LitElement {
  static properties = {
  };
  static styles = [sharedStyles, css`
  `];
  render() {
    return html`
      <mwc-button
        .label=${'Anuluj'}>
      </mwc-button>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-dialog-button-cancel', HgDynamicPathPagesAddDialogButtonCancel);
