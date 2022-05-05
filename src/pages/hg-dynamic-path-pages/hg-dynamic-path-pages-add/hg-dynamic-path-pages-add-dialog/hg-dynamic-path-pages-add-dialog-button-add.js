import {LitElement, html, css} from 'lit';
import '@material/mwc-button';
import sharedStyles from '../../../../styles/shared-styles.js';

export class HgDynamicPathPagesAddDialogButtonAdd extends LitElement {
  static properties = {
    disabled: Boolean,
  };
  static styles = [sharedStyles, css`
  `];
  render() {
    return html`
      <mwc-button
        .raised=${true}
        .disabled=${this.disabled}
        .label=${'Dodaj'}>
      </mwc-button>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-dialog-button-add', HgDynamicPathPagesAddDialogButtonAdd);
