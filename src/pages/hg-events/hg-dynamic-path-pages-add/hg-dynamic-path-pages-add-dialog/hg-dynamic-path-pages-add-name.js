import {LitElement, html, css} from 'lit';
import sharedStyles from '../../../../styles/shared-styles.js';
import '../../../../utils/fixes/mwc-textfield-fixed.js';

export class HgDynamicPathPagesAddName extends LitElement {
  static properties = {
    label: String,
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }
    mwc-textfield-fixed {
      display: block;
    }
  `];
  _handleValueChange(value) {
    this.dispatchEvent(new CustomEvent('name-changed', {detail: value}));
  }
  render() {
    return html`
      <mwc-textfield-fixed
        .label=${this.label}
        @value-change=${({detail: value}) => this._handleValueChange(value)}>
      </mwc-textfield-fixed>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-name', HgDynamicPathPagesAddName);
