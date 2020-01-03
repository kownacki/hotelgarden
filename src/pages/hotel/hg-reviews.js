import {LitElement, html, css} from 'lit-element';
import '../../elements/hg-list.js';
import './hg-reviews/hg-reviews-item.js';

const reviewBlocks = ['landing', 'test'];

customElements.define('hg-reviews', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 1200px;
        padding: 20px;
        margin: auto;
      }
    `;
  }
  render() {
    return html`
      <hg-list
        .reverse=${true}
        .doc=${'reviews/reviews'}
        .template=${(review, processing) => html`<hg-reviews-item .review=${review} .disableEdit=${processing}></hg-reviews-item>`}
        .configure=${{
          icon: 'settings',
          field: 'display',
          getData: (that) => {
            const checkboxes = that.shadowRoot.getElementById('dialog').querySelectorAll('paper-checkbox');
            return _.filter.convert({cap: false})((reviewBlock, index) => checkboxes[index].checked, reviewBlocks);
          },
          setData: (that, review) => {
            const checkboxes = that.shadowRoot.getElementById('dialog').querySelectorAll('paper-checkbox');
            return _.map(([checkbox, reviewBlock]) => checkbox.checked = _.includes(reviewBlock, review.display), _.zip(checkboxes, reviewBlocks));
          },
          template: (review) => html`
            <div>
              Wyświetlaj opinię "${review.heading}" w:
            </div>
            ${_.map((reviewBlock) => html`<paper-checkbox>${reviewBlock}</paper-checkbox>`, reviewBlocks)}
          `
        }}>
      </hg-list>
    `;
  }
});
