import {LitElement, html, css} from 'lit-element';

const infographic = [
  {number: _.random(1, 100), image: `https://picsum.photos/id/${_.random(1, 100)}/600/600`, string: 'Viverra justo',},
  {number: _.random(1, 100), image: `https://picsum.photos/id/${_.random(1, 100)}/600/600`, string: 'Habitant morbi tristique senectus et netus et malesuada fames ac'},
  {number: _.random(1, 100), image: `https://picsum.photos/id/${_.random(1, 100)}/600/600`, string: 'Fames'},
  {number: _.random(1, 100), image: `https://picsum.photos/id/${_.random(1, 100)}/600/600`, string: 'Pharetra massa massa'},
  {number: _.random(1, 100), image: `https://picsum.photos/id/${_.random(1, 100)}/600/600`, string: 'Non sodales'},
  {number: _.random(1, 100), image: `https://picsum.photos/id/${_.random(1, 100)}/600/600`, string: 'Vitae suscipit tellus mauris'},
];

customElements.define('hg-infographic', class extends LitElement {
  static get properties() {
    return {
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 900px;
        margin: 40px auto;
      }
      h2 {
        text-transform: uppercase;
        text-align: center;
        font-weight: 300;
        font-size: 40px;
      }
      .items {
        display: flex;
        flex-wrap: wrap;
      }
      .item {
        display: flex;
        flex-direction: column-reverse;
        position: relative;
      }
      .item::after {
        border-right: 20px solid transparent;
        border-bottom: 20px solid var(--paper-grey-200);
        border-left: 20px solid transparent;
        content: '';
        top: calc(50% - 20px);
        left: calc(50% - 20px);
        width: 0;
        height: 0;
        margin: 0 auto;
        position: absolute;
      }
      .item > * {
        height: 150px;
      }
      .data {
        background: var(--paper-grey-200);
        color: var(--primary-color);
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        padding: 20px;
      }
      .number {
        font-weight: 300;
        font-size: 50px;
      }
      @media all and (max-width: 399px) {
        .item {
          width: 100%;
        }
      }
      @media all and (min-width: 400px) and (max-width: 719px) {

        .item {
          width: 50%;
        }
        .item:nth-child(even) {
          flex-direction: column;
        }
        .item:nth-child(even)::after {
          top: calc(50%);
          border-top: 20px solid var(--paper-grey-200);
          border-bottom: none;
        }
      }
      @media all and (min-width: 720px) {
        .item {
          width: 33.33%;
        }
        .item:nth-child(2), .item:nth-child(5) {
          flex-direction: column;
        }
        .item:nth-child(2)::after, .item:nth-child(5)::after {;
          top: calc(50%);
          border-top: 20px solid var(--paper-grey-200);
          border-bottom: none;
        }
      }
    `;
  }
  render() {
    return html`
      <h2>Hotel Garden w liczbach</h2>
      <div class="items">
        ${_.map((item) => html`
          <div class="item">
            <div class="data">
              <div class="number">${item.number}</div>
              <div>${item.string}</div>
            </div>
            <iron-image .src=${item.image} .sizing=${'cover'}></iron-image>
          </div>
        `, infographic)}
      </div>
    `;
  }
});
