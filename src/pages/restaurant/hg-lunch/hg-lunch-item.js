import {LitElement, html, css} from 'lit';
import sharedStyles from '../../../styles/shared-styles.js';
import {staticProp} from "../../../utils";
import '../../../content/hg-menu/hg-menu-item.js';

customElements.define('hg-lunch-item', class extends LitElement {
  static get properties() {
    return {
      lunch: Object,
      prices: Object,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
      }
      hg-menu-item {
      }
    `];
  }
  render() {
    return html`
      ${_.map((course) => html`
        <hg-menu-item .disableEdit=${true} .item=${staticProp({
          name: `${{1: 'I', 2: 'II'}[course]} danie: ${_.get(`${course}.name`, this.lunch)}`, 
          description: _.get(`${course}.description`, this.lunch), 
          price: _.get(course, this.prices),
        })}></hg-menu-item>
      `, [1, 2])}
    `;
  }
});
