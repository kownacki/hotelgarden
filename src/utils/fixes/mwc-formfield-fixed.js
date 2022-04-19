import {Formfield as MwcFormfield} from '@material/mwc-formfield';
import {mwcFormfieldFix} from './mwcFormfieldFix.js';

export class MwcFormfieldFixed extends mwcFormfieldFix(MwcFormfield) {}
customElements.define('mwc-formfield-fixed', MwcFormfieldFixed);
