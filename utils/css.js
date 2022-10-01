import hexRgb from 'hex-rgb';
import { hexToCSSFilter } from 'hex-to-css-filter';
export const hexToRgb = (hex) => {
    const rgb = hexRgb(hex);
    return `${rgb.red}, ${rgb.green}, ${rgb.blue}`;
};
export const hexToFilter = (hex) => {
    // hexToCSSFilter adds unnecessary ';' at the end. Removing it
    return hexToCSSFilter(hex).filter.replace(';', '');
};
export const createCustomProperty = (name, value) => {
    return `--${name}: ${value}`;
};
export const createColorCustomPropertySet = (name, hex) => {
    // filter only works when changing color from black
    return `
    ${createCustomProperty(name, hex)};
    ${createCustomProperty(`${name}-rgb`, hexToRgb(hex))};
    ${createCustomProperty(`${name}-filter`, hexToFilter(hex))};
  `;
};
