// 1. Adds event 'value-change' with value of input.
export const mwcTextfieldFix = (MwcTextfield) =>
  class extends MwcTextfield {
    constructor() {
      super();
      this.addEventListener('input', () => {
        this.dispatchEvent(new CustomEvent('value-change', {detail: this.value}));
      });
    }
  };
