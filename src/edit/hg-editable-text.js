import {LitElement, html, css} from 'lit';
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from '../utils/database.js';
import sharedStyles from '../styles/shared-styles.js';
import {headerHeight, moveOutFromShadowDom} from '../utils.js'

export default class HgEditableText extends LitElement {
  static properties = {
    text: String,
    ready: {type: Boolean, reflect: true},
    disabled: Boolean,
    showControls: Boolean,
    //todo rich and lessRich into one property
    rich: Boolean,
    richConfig: String, // 'mosaic' / 'intro' / default full
    multiline: {type: Boolean, reflect: true},
    float: {type: Boolean, reflect: true},
    _editable: Element,
    _editor: Element,
    _editorSet: Boolean,
    _loggedIn: Boolean,
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
      position: relative;
    }
    :host(:not([ready])), :host([disabled]) {
      opacity: 50%;
    }
    :host([multiline]) {
      height: 150px;
    }
    :host([multiline][not-empty]) {
      height: auto;
    }
    ::slotted(*) {
      min-width: 20px;
      /*todo background only to #editable */
      background: rgba(var(--placeholder-color-rgb), 0.5);
    }
    :host([multiline]) ::slotted(*) {
      height: 100%;
    }
    :host([not-empty]) ::slotted(:not(.ck-focused)) {
      background: transparent;
    }
    ::slotted(.ck-focused) {
      z-index: var(--layer-header-1);
      position: relative;
      /* todo sometimes not working when clicket too fast on load */
      background: white
    }
    .edit {
      margin-top: 5px;
      justify-content: flex-end;
      flex-wrap: wrap;
    }
    .edit:not([hidden]) {
      display: flex;
    }
    :host([float]) .edit {
      position: absolute;
      top: 100%;
      right: 0;
      z-index: var(--layer-header-1);
    }
    paper-button {
      background: white;
    }
  `];
  constructor() {
    super();
    this._unsubscribeLoggedInListener = onAuthStateChanged(auth, (user) => this._loggedIn = Boolean(user));
  }
  disconnectedCallback() {
    this._unsubscribeLoggedInListener();
    return super.disconnectedCallback();
  }
  setEditable() {
    let slotted = this.querySelector('*');
    while (slotted.tagName === 'SLOT') {
      slotted = slotted.assignedElements()[0];
    }
    this._editable = (slotted.shadowRoot && slotted.shadowRoot.getElementById('editable')) || slotted;
  }
  setEditor() {
    this._editable.addEventListener("focus", () => {
      this._editable.style['text-transform'] = "initial";
    });
    this._editable.addEventListener("blur", () => {
      this._editable.style['text-transform'] = null;
    });
    if (this.rich) {
      this.setCkeditor();
    } else {
      this._editable.addEventListener('input', () => {
        this.showControls = true;
        this.setAttribute('not-empty', '');
      });
    }
  }
  async setCkeditor() {
    await Promise.all([
      import('/node_modules/@ckeditor/ckeditor5-build-inline/build/ckeditor.js'),
      moveOutFromShadowDom(this._editable),
    ]);
    this._editor = await InlineEditor.create(
      this._editable,
      {
        mediaEmbed: {
          previewsInData: true
        },
        link: {
          decorators: [
            {
              mode: 'manual',
              label: 'Downloadable',
              attributes: {
                download: 'download'
              }
            },
            {
               mode: 'manual',
               label: 'Open in a new tab',
               attributes: {
                 target: '_blank',
               }
             }
          ]
        },
        ...(this.richConfig === 'mosaic'
          ? {
              removePlugins: _.flow([
                _.map(_.get('pluginName')),
                _.without(['Essentials', 'Autoformat', 'Bold', 'Italic', 'Link', 'List', 'Paragraph']),
              ])(InlineEditor.builtinPlugins),
              toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', 'undo', 'redo'],
            }
          : this.richConfig === 'intro'
          ? {
            removePlugins: _.flow([
              _.map(_.get('pluginName')),
              _.without(['Essentials', 'Autoformat', 'Bold', 'Italic', 'Link', 'Paragraph']),
            ])(InlineEditor.builtinPlugins),
            toolbar: ['bold', 'italic', 'link', 'undo', 'redo'],
          }
        : {}),
      }
    );
    this._editor.model.document.on('change:data', () => {
      this.showControls = true;
      this.setAttribute('not-empty', '');
    });
  }
  async updated(changedProperties) {
    if (changedProperties.has('showControls')) {
      this.dispatchEvent(new CustomEvent('show-controls-changed', {detail: this.showControls, composed: true, bubbles: true}));
      //todo add also when changing location
      //todo multiple onbeforeunload overlapping
      window.onbeforeunload = !this.showControls ? null : () => {
        window.scrollTo(0, this._editable.offsetTop - headerHeight - 10);
        this._editable.focus();
        return '';
      };
    }
    if ((changedProperties.has('ready') && this.ready) || changedProperties.has('text')) {
      if (!this._editable) {
        this.setEditable();
      }
      this._editable.innerHTML = this.text || (this.rich ? '<p></p>' : '');
      this.text ? this.setAttribute('not-empty', '') : this.removeAttribute('not-empty');
    }
    if (changedProperties.has('_editable') || (changedProperties.has('_loggedIn'))) {
      if (this._editable && this._loggedIn) {
        if (!this._editorSet) {
          this._editorSet = true;
          this.setEditor();
        }
      }
    }
    if (changedProperties.has('disabled')
      || changedProperties.has('ready')
      || changedProperties.has('_editable')
      || changedProperties.has('_loggedIn')
    ) {
      if (this._editable) {
        //todo empty textfield has height 0 when contenteditable set to false
        this._editable.setAttribute('contenteditable', !(this.disabled || !this.ready || !this._loggedIn));
      }
    }
  }
  render() {
    return html`
      <slot id="text"></slot>
      ${!this._loggedIn ? '' : html`
        <div class="edit smaller-text" ?hidden=${!this.showControls}>
          <paper-button
            raised
            @click=${() => {
              this.rich ? this._editor.setData(this.text || '') : (this._editable.innerHTML = this.text || '');
              this.showControls = false;
              if (!this.text) {
                this.removeAttribute('not-empty');
              }
            }}>
            Cofnij
          </paper-button>
          <paper-button
            raised
            @click=${() => {
              this.showControls = false;
              this.text = this._editable.textContent || '';
              this.dispatchEvent(new CustomEvent('save', {detail: this.rich ? this._editor.getData() : this.text}));
            }}>
            Zapisz
          </paper-button>
        </div>
      `}
    `;
  }
}
customElements.define('hg-editable-text', HgEditableText);
