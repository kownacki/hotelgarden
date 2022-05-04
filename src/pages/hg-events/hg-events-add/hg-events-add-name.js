import {LitElement, html, css} from 'lit';
import sharedStyles from '../../../styles/shared-styles.js';
import '../../../utils/fixes/mwc-textfield-fixed.js';

export class HgEventsAddName extends LitElement {
  static properties = {
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
    this.dispatchEvent(new CustomEvent('name-change', {detail: value}));
  }
  render() {
    return html`
      <mwc-textfield-fixed
        .label=${'Nazwa wydarzenia'}
        @value-change=${({detail: value}) => this._handleValueChange(value)}>
      </mwc-textfield-fixed>
    `;
  }
}
customElements.define('hg-events-add-name', HgEventsAddName);
