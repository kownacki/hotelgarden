import {css} from 'lit-element';

export default css`
  h1 {
    font-size: 50px;
  }
  h2 {
    font-size: 40px;
  }
  h3 {
    font-size: 35px;
  }      
  h1, h2, h3, h4 {
    color: var(--primary-color);
     font-weight: 300;
   }
  [hidden] {
    display: none !important;
  }
`;
