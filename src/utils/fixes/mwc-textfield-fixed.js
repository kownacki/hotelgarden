import {TextField as MwcTextfield} from '@material/mwc-textfield';
import {mwcTextfieldFix} from './mwcTextfieldFix.js';

export class MwcTextfieldFixed extends mwcTextfieldFix(MwcTextfield) {}
customElements.define('mwc-textfield-fixed', MwcTextfieldFixed);
