import {LitElement, html, css} from 'lit';
import sharedStyles from '../../styles/shared-styles.js';

export class HgContactFormLoading extends LitElement {
  static properties = {
  };
  static styles = [sharedStyles, css`
    :host {
      display: flex;
      align-items: center;
    }
    .sending {
      margin-right: 10px;
    }
    mwc-circular-progress {
      padding: 5px;
    }
  `];
  connectedCallback() {
    import('@material/mwc-circular-progress');
    super.connectedCallback();
  }
  render() {
    return html`
      <div class="sending">Wysyłanie...</div>
      <mwc-circular-progress .indeterminate=${true} .density=${-2}></mwc-circular-progress>
    `;
  }
}
customElements.define('hg-contact-form-loading', HgContactFormLoading);
