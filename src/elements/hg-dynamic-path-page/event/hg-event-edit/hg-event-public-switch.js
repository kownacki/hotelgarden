import {LitElement, html, css} from 'lit';
import '@material/mwc-switch';
import sharedStyles from '../../../../styles/shared-styles.js';
import '../../../../utils/fixes/mwc-formfield-fixed.js';

export class HgEventPublicSwitch extends LitElement {
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
      <mwc-formfield-fixed .label=${'Publiczne'}>
        <mwc-switch
          id="public"
          .selected=${this.selected}
          @click=${() => {
            const switchElement = this.shadowRoot.getElementById('public');
            this.dispatchEvent(new CustomEvent('public-changed', {detail: switchElement.selected}));
          }}>
        </mwc-switch>
      </mwc-formfield-fixed>
    `;
  }
}
customElements.define('hg-event-public-switch', HgEventPublicSwitch);
