import { PRIMARY_COLOR, SECONDARY_COLOR, SECONDARY_DARK_COLOR, TEXT_COLOR, SURFACE_COLOR, SURFACE_LIGHT_COLOR, SURFACE_DARK_COLOR, PLACEHOLDER_COLOR, ERROR_COLOR, ERROR_BACKGROUND_COLOR, CORRECT_COLOR, ON_SURFACE_COLOR, } from '../config.js';
import { createColorCustomPropertySet } from '../css.js';
export const globalStyles = `
  html, body {
    height: 100%;
  }
  body {
    margin: 0;

    ${createColorCustomPropertySet('primary-color', PRIMARY_COLOR)}
    ${createColorCustomPropertySet('secondary-color', SECONDARY_COLOR)}
    ${createColorCustomPropertySet('secondary-dark-color', SECONDARY_DARK_COLOR)}
    ${createColorCustomPropertySet('text-color', TEXT_COLOR)}
    ${createColorCustomPropertySet('surface-color', SURFACE_COLOR)}
    ${createColorCustomPropertySet('surface-light-color', SURFACE_LIGHT_COLOR)}
    ${createColorCustomPropertySet('surface-dark-color', SURFACE_DARK_COLOR)}
    ${createColorCustomPropertySet('on-surface-color', ON_SURFACE_COLOR)}
    ${createColorCustomPropertySet('placeholder-color', PLACEHOLDER_COLOR)}
    ${createColorCustomPropertySet('error-color', ERROR_COLOR)}
    ${createColorCustomPropertySet('error-background-color', ERROR_BACKGROUND_COLOR)}
    ${createColorCustomPropertySet('correct-color', CORRECT_COLOR)}
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
    --mdc-theme-primary: var(--primary-color);
    --mdc-theme-secondary: var(--secondary-color);
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
