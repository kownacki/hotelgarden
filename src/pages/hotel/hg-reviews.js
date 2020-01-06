import {LitElement, html, css} from 'lit-element';
import '../../elements/hg-list.js';
import './hg-reviews/hg-reviews-item.js';

const reviewBlocks = ['landing', 'restaurant'];

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
      hg-list {
        display: flex;
        flex-wrap: wrap;
        --columns: 3;
      }
    `;
  }
  render() {
    return html`
      <hg-list
        .array=${true}
        .addAtStart=${true}
        .transform=${() => _.reverse}
        .path=${{doc: 'reviews/reviews'}}
        .getItemName=${(item) => `opinię${item.heading ? ` "${item.heading}"`: ''}`}
        .itemTemplate=${(review, disableEdit) => html`<hg-reviews-item .review=${review} .disableEdit=${disableEdit}></hg-reviews-item>`}
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
