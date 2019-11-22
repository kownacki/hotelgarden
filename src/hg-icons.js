import {LitElement, html, css} from 'lit-element';

customElements.define('hg-icons', class extends LitElement {
  static get properties() {
    return {
      icons: Array,
    };
  }
  constructor() {
    super();
    this.icons = [
      {src: '/resources/icons/icons8-cafe-50.png', text: 'Ut a lorem at'},
      {src: '/resources/icons/icons8-cocktail-50.png', text: 'Justo dapibus'},
      {src: '/resources/icons/icons8-confectionery-50.png', text: 'Facilisis nec nec sapien'},
      {src: '/resources/icons/icons8-organization-chart-people-50.png', text: 'Sed id pretium mauris'},
      {src: '/resources/icons/icons8-prawn-50.png', text: 'Duis blandit in dolor'},
    ];
  }
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
      .block {
        width: 130px;
        margin: 10px;
      }
      iron-icon {
        display: block;
        margin: auto;
        width: 50px;
        height: 50px;
        filter: var(--primary-color-filter)
      }
      p {
        text-align: center;
      }
    `;
  }
  render() {
    return html`
      ${_.map((icon) => html`
        <div class="block">
          <iron-icon .src="${icon.src}"></iron-icon>
          <p>${icon.text}</p>
        </div>
      `, this.icons)}
    `;
  }
});
