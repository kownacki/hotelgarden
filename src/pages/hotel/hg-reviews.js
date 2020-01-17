import {LitElement, html, css} from 'lit-element';
import {staticProp} from '../../utils.js';
import '../../elements/hg-list.js';
import '../../elements/hg-review.js';

const reviewBlocks = ['landing', 'restaurant', 'grill-garden', 'catering', 'weddings', 'chrzciny', 'komunie', 'bale-szkolne'];

const configure = {
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
};

customElements.define('hg-reviews', class extends LitElement {
  static get properties() {
    return {
      _dupa: Boolean,
    };
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
      @media all and (max-width: 1279px) {
        :host {
          max-width: 800px;
        }
        hg-list {
          --columns: 2;
        }
      }
      @media all and (max-width: 839px) {
        :host {
          width: auto;
        }
        hg-list {
          --columns: 1;
        }
      }
    `;
  }
  render() {
    return html`
      <hg-list
        .array=${true}
        .addAtStart=${true}
        .transform=${() => _.reverse}
        .path=${staticProp({doc: 'reviews/reviews'})}
        .getItemName=${(item) => `opinię${item.heading ? ` "${item.heading}"`: ''}`}
        .itemTemplate=${(review, index, disableEdit) => html`
          <style>
            hg-review {
              text-align: center;
              box-sizing: border-box;
              margin: 10px;
              padding: 30px 20px;
              box-shadow: 0 0 2px var(--placeholder-color);
              border-radius: 2px;
              height: 400px;
            }
            @media all and (max-width: 839px) {
              hg-review {
                height: auto;
              }
            }
          </style>
          <hg-review .review=${review} .editable=${true} .disableEdit=${disableEdit}></hg-review>
        `}
        .configure=${configure}>
      </hg-list>
    `;
  }
});
