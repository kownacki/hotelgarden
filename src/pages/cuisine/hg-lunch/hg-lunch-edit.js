import {LitElement, html, css} from 'lit-element';
import sharedStyles from '../../../styles/shared-styles.js';
import {getDayOfWeek} from '../../../utils.js';
import './hg-lunch-edit-dialog.js';

let pdfmakeLoaded = false;
const downloadLunch = async (lunches) => {
  if (!pdfmakeLoaded) {
    pdfmakeLoaded = true;
    await new Promise((resolve) => {
      const script = document.createElement('script');
      script.onload = resolve;
      script.src = '/node_modules/pdfmake/build/pdfmake.min.js';
      document.body.append(script);
    });
    await new Promise((resolve) => {
      const script = document.createElement('script');
      script.onload = resolve;
      script.src = '/node_modules/pdfmake/build/vfs_fonts.js';
      document.body.append(script);
    });
  }
  const docDefinition = {
    content: [
      {
        text: 'Lunch menu 2.03-6.03',
        style: 'header'
      },
      {
        columns: [
          _.flatten(_.map((day) => [
            ' ',
            getDayOfWeek(day),
            'I danie: ' + _.get(`${day}.1.name`, lunches),
            'II danie: ' + _.get(`${day}.2.name`, lunches),
          ], [1, 2, 3])),
          _.flatten(_.map((day) => [
            ' ',
            getDayOfWeek(day),
            'I danie: ' + _.get(`${day}.1.name`, lunches),
            'II danie: ' + _.get(`${day}.2.name`, lunches),
          ], [4, 5])),
        ],
        columnGap: 10
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true
      },
      subheader: {
        fontSize: 15,
        bold: true
      },
      quote: {
        italics: true
      },
      small: {
        fontSize: 8
      }
    }
  };
  pdfMake.createPdf(docDefinition).download();
  // const storageRef = storage.ref('dupa/dupa');
  // await storageRef.put(blob);
};
customElements.define('hg-lunch-edit', class extends LitElement {
  static get properties() {
    return {
      lunches: Object,
      doc: String,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
        max-width: 700px;
        padding: 60px 20px;
        margin: auto;
      }
    `];
  }
  render() {
    return html`
      <div>Aktualny lunch 2-6.03.2020</div>
      <mwc-button raised label="Edytuj"
        @click=${() => this.shadowRoot.getElementById('dialog').dialog.open()}>
      </mwc-button>
      <mwc-button raised label="Pobierz" @click=${() => downloadLunch(this.lunches)}></mwc-button>
      <hg-lunch-edit-dialog id="dialog" .lunches=${this.lunches} .doc=${this.doc}></hg-lunch-edit-dialog>
    `;
  }
});
