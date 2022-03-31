import {LitElement, html, css} from 'lit';
import '../../../content/hg-menu/hg-menu-item.js';
import sharedStyles from '../../../styles/shared-styles.js';
import {staticProp} from '../../../utils.js';

export class HgLunchSet extends LitElement {
  static properties = {
    price: String,
  };
  static styles = [sharedStyles, css`
    hg-menu-item {
      padding: 0;
    }
  `];
  render() {
    return html`
      <hg-menu-item .disableEdit=${true} .item=${staticProp({name: 'I + II Danie', price: this.price})}></hg-menu-item>
    `;
  }
}
customElements.define('hg-lunch-set', HgLunchSet);
