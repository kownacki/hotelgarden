import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  SECONDARY_LIGHT_COLOR,
  ACCENT_COLOR,
  ACCENT_DARK_COLOR,
  PLACEHOLDER_COLOR,
  ERROR_COLOR,
  ERROR_BACKGROUND_COLOR,
  CORRECT_COLOR,
  LOGOTYPE_COLOR, SURFACE_COLOR
} from '../config.js';
import {createColorCustomPropertySet} from '../css.js';

export const globalStyles = `
  html, body {
    height: 100%;
  }
  body {
    margin: 0;

    ${createColorCustomPropertySet('primary-color', PRIMARY_COLOR)}
    ${createColorCustomPropertySet('secondary-color', SECONDARY_COLOR)}
    ${createColorCustomPropertySet('secondary-light-color', SECONDARY_LIGHT_COLOR)}
    ${createColorCustomPropertySet('accent-color', ACCENT_COLOR)}
    ${createColorCustomPropertySet('accent-dark-color', ACCENT_DARK_COLOR)}
    ${createColorCustomPropertySet('surface-color', SURFACE_COLOR)}
    ${createColorCustomPropertySet('placeholder-color', PLACEHOLDER_COLOR)}
    ${createColorCustomPropertySet('error-color', ERROR_COLOR)}
    ${createColorCustomPropertySet('error-background-color', ERROR_BACKGROUND_COLOR)}
    ${createColorCustomPropertySet('correct-color', CORRECT_COLOR)}
    ${createColorCustomPropertySet('logotype-color', LOGOTYPE_COLOR)}
    --text-color: var(--secondary-color);
    --divider-color: rgba(0, 0, 0, 0.12);
    --grey-text: rgba(0, 0, 0, 0.6);

    --headerHeight: 60px;
    --layer-header: 100;
    --layer-header-1: 101;
    --layer-profitroom: 999; /* Profitroom snippet layer*/
    --layer-profitroom-1: 1000;

    font-family: 'Lato', sans-serif;
    color: var(--text-color);

    /* MWC theming. See https://github.com/material-components/material-web/blob/master/docs/theming.md */
    --mdc-theme-primary: var(--accent-color);
    --mdc-theme-secondary: var(--primary-color);
    /* Bug. See https://github.com/material-components/material-web/issues/2748 */
    --mdc-switch-selected-pressed-handle-color: var(--mdc-theme-primary);
    --mdc-switch-selected-focus-handle-color: var(--mdc-theme-primary);
    --mdc-switch-selected-hover-handle-color: var(--mdc-theme-primary);
    --mdc-switch-selected-track-color: var(--divider-color);
    --mdc-switch-selected-pressed-track-color: var(--divider-color);
    --mdc-switch-selected-focus-track-color: var(--divider-color);
    --mdc-switch-selected-hover-track-color: var(--divider-color);
  }
`;
