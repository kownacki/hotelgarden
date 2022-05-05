import {LitElement, html, css} from 'lit';
import '../../../../edit/hg-warning-text.js';
import sharedStyles from '../../../../styles/shared-styles.js';

export class HgDynamicPathPagesAddPermalinkWarning extends LitElement {
  static properties = {
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }
  `];
  render() {
    return html`
      <hg-warning-text
        .text=${'Zmiana nazwy po utworzeniu NIE będzie skutkować zmianą adresu URL.'}>
      </hg-warning-text>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-permalink-warning', HgDynamicPathPagesAddPermalinkWarning);
