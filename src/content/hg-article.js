import {LitElement, html, css} from 'lit-element';
import {db} from '../utils.js';

customElements.define('hg-article', class extends LitElement {
  static get properties() {
    return {
      uid: Number,
      edit: Boolean,
      _text: String,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this.shadowRoot.getElementById('text').addEventListener('input', () => this.edit = true);
      this._text = (await db.doc('articles/' + this.uid).get()).data().text;
    })();
  }
  updated(changedProperties) {
    if (changedProperties.has('edit')) {
      if (this.edit) {
        //todo add also when changing location
        window.onbeforeunload = () => {
          this.shadowRoot.getElementById('text').focus();
          window.scrollTo(0, this.shadowRoot.getElementById('text').offsetTop - 70);
          return '';
        }
      } else {
        window.onbeforeunload = null;
      }
    }
  }
  static get styles() {
    return css`
      :host {
        display: block;
        margin: 80px auto;
        max-width: 700px;
        padding: 0 20px;
      }
      #text {
        font-size: 20px;
        line-height: 1.5em;
      }
      #text:not(:focus):first-letter {
        font-size: 3em;
        float: left;
        margin: 0.25em 0.15em 0.15em 0;
      }
      .edit {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
      }
    `;
  }
  render() {
    return html`
      <div id="text" contenteditable>${this._text}</div>
      <div class="edit">
        <paper-button 
          raised
          ?hidden=${!this.edit}
          @click=${() => {
            this.shadowRoot.getElementById('text').innerHTML = this._text;
            this.edit = false;
          }}>
          Cofnij
        </paper-button>
        <paper-button 
          raised 
          ?hidden=${!this.edit}
          @click=${() => {
            this.edit = false;
            db.doc('articles/' + this.uid).set({text: this.shadowRoot.getElementById('text').innerText});
          }}>
          Zapisz
        </paper-button>
      </div>
    `;
  }
});
