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
  h3, paper-dialog h2 {
    font-size: 35px;
    margin: 27px 0;
  }
  h4, paper-dialog h3 {
    font-size: 30px;
    margin: 24px 0;
  }
  paper-dialog h4  {
    font-size: 27px;
    margin: 21px 0;
  }
  h1, h2, h3, h4 {
    word-break: break-word;
    color: var(--primary-color);
    /* for headings in paper-dialog */
    line-height: normal;
    font-weight: 300;
  }
  .content-heading {
    text-align: center;
    padding: 0 20px;
    margin-right: auto;
    margin-left: auto;
    text-transform: uppercase;
    width: 800px;
    max-width: 100%;
    box-sizing: border-box;
  }
  .divider {
    border-bottom: solid 1px rgba(var(--secondary-color-rgb), 30%);
    margin-bottom: 20px;
  }
  .smaller-text {
    font-size: 18px;
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
      margin: 27px 0;
    }
    h3, paper-dialog h2 {
      font-size: 30px;
      margin: 24px 0;
    }
    h4, paper-dialog h3 {
      font-size: 27px;
      margin: 21px 0;
    }
    paper-dialog h4 {
      font-size: 24px;
      margin: 19px 0;
    }
  }
  @media all and (max-width: 599px) {
    body, :host, paper-dialog  {
      font-size: 16px;
    }
    h1 {
      font-size: 30px;
    }
    h2 {
      font-size: 27px;
    }
    h3, paper-dialog h2 {
      font-size: 24px;
    }
    h4, paper-dialog h3 {
      font-size: 21px;
    }
    paper-dialog h4 {
      font-size: 19px;
    }
    .smaller-text {
      font-size: 16px;
    }
  }
  [hidden] {
    display: none !important;
  }
`;
