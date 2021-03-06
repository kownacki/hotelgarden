import {LitElement, html, css} from 'lit-element';
import '@polymer/paper-checkbox/paper-checkbox.js';
import {staticProp} from '../../utils.js';
import '../../content/hg-article/hg-intro-article.js';
import '../../elements/hg-list.js';
import '../../elements/hg-review.js';
import '../../content/hg-links.js';

const reviewBlocks = ['landing', 'restaurant', 'grill-garden', 'weddings', 'family-parties'];

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
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 1200px;
        padding: 40px 0;
        margin: auto;
      }
      hg-intro-article {
        display: none;
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
          width: 580px;
          max-width: 100%;
        }
        hg-list {
          --columns: 1;
        }
      }
    `;
  }
  render() {
    return html`
      <hg-intro-article .uid=${'reviews'}></hg-intro-article>
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
              margin: 0 10px 20px;
              padding: 0 20px;
              height: 400px;
            }
            @media all and (max-width: 839px) {
              hg-review {
                height: auto;
                margin: 10px 0;
                padding: 20px;
              }
            }
          </style>
          <hg-review .review=${review} .editable=${true} .disableEdit=${disableEdit}></hg-review>
        `}
        .configure=${configure}>
      </hg-list>
      <hg-links .path=${'/opinie'} .superpath=${'/'}></hg-links>
    `;
  }
});
