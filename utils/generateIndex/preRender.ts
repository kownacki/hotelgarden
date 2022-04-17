// @ts-ignore see https://github.com/microsoft/TypeScript/issues/33079
import {loadingDots} from 'mk-frontend-web-utils/loadingDots.js';

export const preRender = `
<style>
  ${loadingDots.css()}
</style>
${loadingDots.html(`<noscript>Do wyświetlenia strony potrzebne jest włączenie obsługi JavaScript.</noscript>`)}
`;
