import {css} from 'lit-element';

export default css`
  body, :host {
    font-size: 20px;
  }
  p {
    line-height: 1.4em;
  }
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
    word-break: break-word;
    color: var(--primary-color);
    font-weight: 300;
  }
  @media all and (max-width: 959px) {
    body, :host {
      font-size: 18px;
    }
    h1 {
      font-size: 40px;
    }
    h2 {
      font-size: 35px;
    }
    h3 {
      font-size: 30px;
    }
    h4 {
      font-size: 25px;
    }
  }
  @media all and (max-width: 599px) {
    body, :host {
      font-size: 16px;
    }
    h1 {
      font-size: 30px;
    }
    h2 {
      font-size: 27px;
    }
    h3 {
      font-size: 24px;
    }
    h4 {
      font-size: 21px;
    }
  }
  [hidden] {
    display: none !important;
  }
`;
