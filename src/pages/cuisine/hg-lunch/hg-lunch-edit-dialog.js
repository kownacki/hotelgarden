import {LitElement, html, css} from 'lit-element';
import sharedStyles from '../../../styles/shared-styles.js';
import '@material/mwc-textfield';
import {updateData, getDayOfWeek} from '../../../utils.js';
import '../../../elements/hg-dialog.js';

customElements.define('hg-lunch-edit-dialog', class extends LitElement {
  static get properties() {
    return {
      lunches: Object,
      doc: String,
      dateString: String,
      //
      dialog: Element,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      h2 {
        margin: 15px 30px 15px 0;
      }
    `];
  }
  render() {
    return html`
      <hg-dialog 
        id="dialog"
        .noClose=${true}
        @dialog-changed=${() => this.dialog = this.shadowRoot.getElementById('dialog').dialog}>
        <div slot="header">
          Edytuj lunch ${this.dateString}
        </div>
        <div slot="content">
          ${_.map((day) => html`
            <div class="edit-day">
              ${getDayOfWeek(day)}
              ${_.map((course) => html`
                <div class="edit-course">
                  ${{1: 'I', 2: 'II'}[course]} danie:
                  ${_.map((field) => html`
                    <mwc-textfield
                      id=${`${day}.${course}.${field}`}
                      .label=${{name: 'Nazwa', description: 'Podpis'}[field]}
                      .value=${_.get(`${day}.${course}.${field}`, this.lunches) || ''}>
                    </mwc-textfield>
                  `, ['name', 'description'])}
                  </div>
              `, [1, 2])}
            </div>
          `, [1, 2, 3, 4, 5])}
        </div>
        <div slot="buttons">
          <mwc-button raised label="Anuluj" 
            @click=${() => this.shadowRoot.getElementById('dialog').dialog.close()}>
          </mwc-button>
          <mwc-button raised label="Zapisz" 
            @click=${() => {
              let newLunches = {};
              _.map((day) => {
                _.map((course) => {
                  _.map((field) => {
                    const path = `${day}.${course}.${field}`;
                    newLunches = _.setWith(Object, path, this.shadowRoot.getElementById(path).value, newLunches);
                  }, ['name', 'description'])
                }, [1, 2]);
              }, [1, 2, 3, 4, 5]);
              updateData(this.doc, null, newLunches);
              this.lunches = newLunches;
              this.dispatchEvent(new CustomEvent('lunches-changed', {detail: newLunches, composed: true}));
              this.shadowRoot.getElementById('dialog').dialog.close();
            }}>
          </mwc-button>
        </div>
      </hg-dialog>
    `;
  }
});
