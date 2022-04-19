import {LitElement, html, css} from 'lit';
import '@material/mwc-textfield';
import sharedStyles from '../../../../styles/shared-styles.js';

export class HgEventsAddName extends LitElement {
  static properties = {
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }
    mwc-textfield {
      display: block;
      margin: 20px 0 ;
    }
  `];
  _handleInput() {
    const textfield = this.shadowRoot.getElementById('textfield');
    this.dispatchEvent(new CustomEvent('input-changed', {detail: textfield.value}));
  }
  render() {
    return html`
      <mwc-textfield
        id="textfield"
        .label=${'Nazwa wydarzenia'}
        @input=${() => this._handleInput()}>
      </mwc-textfield>
    `;
  }
}
customElements.define('hg-events-add-name', HgEventsAddName);
