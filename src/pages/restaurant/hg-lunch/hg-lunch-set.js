import {LitElement, html, css} from 'lit';
import sharedStyles from '../../../styles/shared-styles.js'
import {staticProp} from "../../../utils";
import '../../../content/hg-menu/hg-menu-item.js';

export class HgLunchSet extends LitElement {
  static properties = {
    price: String,
  };
  static get styles() {
    return [sharedStyles, css`
      hg-menu-item {
        padding: 0;
      }
    `];
  }
  render() {
    return html`
      <hg-menu-item .disableEdit=${true} .item=${staticProp({name: 'I + II Danie', price: this.price})}></hg-menu-item>
    `;
  }
}
customElements.define('hg-lunch-set', HgLunchSet);
