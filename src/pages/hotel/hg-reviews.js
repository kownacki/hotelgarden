import {LitElement, html, css} from 'lit';
import '@material/mwc-checkbox';
import '../../content/hg-article/hg-intro-article.js';
import '../../elements/hg-list-old.js';
import '../../elements/hg-review.js';
import '../../content/hg-links.js';
import '../../utils/fixes/mwc-formfield-fixed.js';
import {createDbPath} from '../../utils/database.js';
import {pagesStaticData} from '../../../utils/urlStructure.js';

const reviewBlocks = ['landing', 'restaurant', 'weddings', 'family-parties'];

//todo implement vertical swap

const configure = {
  icon: 'settings',
  field: 'display',
  getData: (that) => {
    const checkboxes = that.shadowRoot.getElementById('dialog').querySelectorAll('mwc-checkbox');
    return reviewBlocks.filter((reviewBlock, index) => checkboxes[index].checked);
  },
  setData: (that, review) => {
    const checkboxes = that.shadowRoot.getElementById('dialog').querySelectorAll('mwc-checkbox');
    return _.zip(checkboxes, reviewBlocks).map(([checkbox, reviewBlock]) => checkbox.checked = review.display.includes(reviewBlock));
  },
  template: (review) => html`
    <div>
      Wyświetlaj opinię "${review.heading}" w:
    </div>
    <div>
      ${reviewBlocks.map((reviewBlock) => {
        const pageData = pagesStaticData[reviewBlock];
        return html`
          <div>
            <mwc-formfield-fixed .label=${`${pageData.path} (${pageData.name})`}>
              <mwc-checkbox></mwc-checkbox>
            </mwc-formfield-fixed>
          </div>
        `;
      })}
    </div>
  `
};

export class HgReviews extends LitElement {
  static styles = css`
    :host {
      display: block;
      max-width: 1200px;
      padding: 40px 0;
      margin: auto;
    }
    hg-intro-article {
      display: none;
    }
    hg-list-old {
      display: flex;
      flex-wrap: wrap;
      --columns: 3;
    }
    @media all and (max-width: 1279px) {
      :host {
        max-width: 800px;
      }
      hg-list-old {
        --columns: 2;
      }
    }
    @media all and (max-width: 839px) {
      :host {
        width: 580px;
        max-width: 100%;
      }
      hg-list-old {
        --columns: 1;
      }
    }
  `;
  render() {
    return html`
      <hg-intro-article .uid=${'reviews'}></hg-intro-article>
      <hg-list-old
        .addAtStart=${true}
        .transform=${() => _.reverse}
        .path=${createDbPath('reviews/reviews')}
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
      </hg-list-old>
      <hg-links .path=${'/opinie'} .superpath=${'/'}></hg-links>
    `;
  }
}
customElements.define('hg-reviews', HgReviews);
