import {LitElement, html, css} from 'lit';

export class MkwcListAdd extends LitElement {
  static properties = {
    addControl: Object, // AddControlOptions
    // observables
    processing: Boolean,
  };
  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;
  willUpdate(changedProperties) {
    if (changedProperties.has('processing')) {
      this.dispatchEvent(new CustomEvent('processing-changed', {detail: this.processing}));
    }
  }
  render() {
    return html`
      <div
        class="container"
        @click=${async () => {
          this.processing = true;
          const newItem = await this.addControl.createNewItem();
          this.dispatchEvent(new CustomEvent('request-add-item', {detail: newItem}));
          this.processing = false;
        }}>
        <slot></slot>
      </div>
    `;
  }
}
customElements.define('mkwc-list-add', MkwcListAdd);
