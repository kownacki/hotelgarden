import {css} from 'lit-element';

export default css`
  h1 {
    font-size: 50px;
  }
  h2 {
    font-size: 40px;
    margin: 30px 0;
  }
  h3 {
    font-size: 35px;
    margin: 25px 0;
  }
  h4 {
    font-size: 30px;
    margin: 20px 0;
  }
  h1, h2, h3, h4 {
    color: var(--primary-color);
    font-weight: 300;
  }
  [hidden] {
    display: none !important;
  }
`;
