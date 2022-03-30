import {LitElement, html, css} from 'lit';
import {staticProp} from '../utils.js';
import {FirebaseAuthController} from '../utils/FirebaseAuthController.js';
import './hg-list.js';
import './hg-icons/hg-icons-add.js';
import './hg-icons/hg-icons-item.js';

export class HgIcons extends LitElement {
  _firebaseAuth;
  static properties = {
    uid: String,
    empty: {type: Boolean, reflect: true},
    small: {type: Boolean, reflect: true},
    _loggedIn: Boolean,
  };
  static styles = css`
    :host {
      display: block;
    }
    hg-list {
      display: flex;
      flex-wrap: wrap;
    }
    :host(:not([small])) hg-list {
      min-height: 131px;
      justify-content: center;
    }
    :host([small]) hg-list {
      min-height: 60px;
      margin: 0 -15px;
    }
    :host([empty]) {
      background: rgba(var(--placeholder-color-rgb), 0.5);
    }
    @media all and (max-width: 959px) {
      :host([small]) hg-list {
        --columns: 3;
      }
    }
    @media all and (max-width: 769px) {
      :host([small]) hg-list {
        --columns: 2;
      }
    }
    @media all and (max-width: 479px) {
      :host([small]) hg-list {
        --columns: 1;
      }
    }
  `;
  constructor() {
    super();
    this._firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this._loggedIn = loggedIn;
    });
  }
  render() {
    return html`
      <hg-list
        .array=${true}
        .path=${staticProp({doc: 'iconBlocks/' + this.uid})}
        .getItemName=${() => 'ikonę'}
        .itemTemplate=${(icon, index, disableEdit) => html`
          <hg-icons-item .small=${this.small} .icon=${icon} .disableEdit=${disableEdit}></hg-icons-item>
        `}
        .onAdd=${async (newItem) => {
          const addResult = await this.shadowRoot.getElementById('add').getIcon();
          return addResult 
            ? {...newItem, ...addResult}
            : false;
        }}
        @items-changed=${(event) => this.empty = _.isEmpty(event.detail)}>
      </hg-list>
      ${!this._loggedIn ? '' : html`<hg-icons-add id="add"></hg-icons-add>`}
    `;
  }
}
customElements.define('hg-icons', HgIcons);
