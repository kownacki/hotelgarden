import {LitElement, html, css} from 'lit';
import sharedStyles from '../../../styles/shared-styles.js';
import '../../../utils/fixes/mwc-textfield-fixed.js';

export class HgIconsAddText extends LitElement {
  static properties = {
    text: String,
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
    this.text = value;
  }
  render() {
    return html`
      <mwc-textfield-fixed
        .label=${'Tekst pod ikoną'}
        @value-change=${({detail: value}) => this._handleValueChange(value)}>
      </mwc-textfield-fixed>
    `;
  }
}
customElements.define('hg-icons-add-text', HgIconsAddText);
