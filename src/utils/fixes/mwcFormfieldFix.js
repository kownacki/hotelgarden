import {css} from 'lit';

// 1. Centers label correctly
export const mwcFormfieldFix = (MwcFormfield) =>
  class extends MwcFormfield {
    static get styles() {
      return [super.styles, css`
        label {
          margin-top: 2px;
        }
      `];
    }
  };
