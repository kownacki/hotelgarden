import {LitElement, html, css} from 'lit';
import '@material/mwc-switch';
import sharedStyles from '../../../styles/shared-styles.js';
import '../../../utils/fixes/mwc-formfield-fixed.js';

export class HgEventPromoteSwitch extends LitElement {
  static properties = {
    selected: Boolean,
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }
    mwc-switch {
      margin-right: 2px;
    }
  `];
  render() {
    return html`
      <mwc-formfield-fixed .label=${'Promuj'}>
        <mwc-switch
          id="promote"
          .selected=${this.selected}
          .disabled=${this.disabled}
          @click=${() => {
            const switchElement = this.shadowRoot.getElementById('promote');
            this.dispatchEvent(new CustomEvent('promoted-changed', {detail: switchElement.selected}));
          }}>
        </mwc-switch>
      </mwc-formfield-fixed>
    `;
  }
}
customElements.define('hg-event-promote-switch', HgEventPromoteSwitch);
