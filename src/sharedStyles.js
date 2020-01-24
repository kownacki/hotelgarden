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
  .editable-text-ckeditor {
    padding: 0 !important;
    margin: 1px;
  }
  .editable-text-ckeditor > :first-child {
    margin-top: 0 !important;
  }
  .editable-text-ckeditor > :last-child {
    margin-bottom: 0 !important;
  }
  .editable-text-ckeditor p, .editable-text-ckeditor ul {
    line-height: 1.4em;
    font-size: 18px;
    padding: 0 !important;
  }
  @media all and (max-width: 599px) {
    .editable-text-ckeditor {
      font-size: 16px;
    }
  }
  .editable-text-ckeditor ul {
    list-style: none;
    padding-left: 20px;
  }
  .editable-text-ckeditor li {
    margin: 8px 0;
  }
  .editable-text-ckeditor ul > li::before {
    color: var(--primary-color);
    content: '\\25A0';
    width: 20px;
    display: inline-block;
    position: relative;
    bottom: 2px;
  }
  .editable-text-ckeditor a {
    text-decoration: none;
    font-weight: 700;
    color: var(--accent-color);
  }
  .editable-text-ckeditor a:hover {
    text-decoration: underline;
  }
  .editable-text-ckeditor .table table {
    border: none !important;
  }
  .editable-text-ckeditor .table table td, .editable-text-ckeditor .table table th {
    padding: 20px 40px !important;
    border: none !important;
  }
  .editable-text-ckeditor figure {
    margin: 10px auto;
  }
  .editable-text-ckeditor img {
    max-width: 100%;
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
    .editable-text-ckeditor p, .editable-text-ckeditor ul {
      font-size: 16px;
    }
  }
  [hidden] {
    display: none !important;
  }
`;
