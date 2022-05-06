import {LitElement, html, css} from 'lit';
import '@material/mwc-radio';
import {DynamicPathPageType} from '../../../../../utils/events.js';
import sharedStyles from '../../../../styles/shared-styles.js';
import '../../../../utils/fixes/mwc-formfield-fixed.js';

export class HgDynamicPathPagesAddTypeSelect extends LitElement {
  static properties = {
    // observables
    selectedType: String, // DynamicPathPageType
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }
    .type-select-container {
      border: solid 1px var(--divider-color);
      padding: 10px;
      margin-bottom: 10px;
    }
    .type-select-container-text {
      padding: 0 15px;
    }
  `];
  _selectType(type) {
    this.selectedType = type;
    this.dispatchEvent(new CustomEvent('selected-type', {detail: type}))
  }
  render() {
    return html`
      <div class="type-select-container">
        <mwc-formfield-fixed .label=${'Wydarzenie'}>
          <mwc-radio
            name="type"
            @click=${() => this._selectType(DynamicPathPageType.EVENT)}>
          </mwc-radio>
        </mwc-formfield-fixed>
        <div class="type-select-container-text smaller-text"
          <ul>
            <li>Widoczne w Google jak najszybciej po opublikowaniu.</li>
            <li>Wyświetlane w Google wraz z pojedyńczą datą, w którą się odbywa lub z datą rozpoczęcia i zakończenia.</li>
          </ul>
          <p class="smaller-text">
            Nadaje się dla: zwykłe wydarzenia, np. Sylwester, Dzień Kobiet
          </p>
        </div>
      </div>
      <div class="type-select-container">
        <mwc-formfield-fixed .label=${'Aktualność'}>
          <mwc-radio
            name="type"
            @click=${() => this._selectType(DynamicPathPageType.NEWS)}>
          </mwc-radio>
        </mwc-formfield-fixed>
        <div class="type-select-container-text smaller-text"
          <ul>
            <li>Widoczna w Google dopiero po dacie publikacji.</li>
            <li>Wyświetlana w Google razem z datą publikacji.</li>
            <li>Po dacie zakończenia trwania publikacji aktualność zostanie usunięta z Google.</li>
            <li>Data zakończenia trwania publikacji nie będzie znana dla Google.</li>
          </ul>
          <p class="smaller-text">
            Nadaje się dla: nowości, ogłoszenia, zapowiedzi
          </p>
        </div>
      </div>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-type-select', HgDynamicPathPagesAddTypeSelect);
