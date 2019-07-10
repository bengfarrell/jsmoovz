import {Register} from '../../../../../web_modules/attrocity.js';
import {Mixins} from '../../../mixins.js';
import Template from './template.js';
import Keyboard from '../../../../devices/keyboard.js';
import DataModel from '../../../../datamodel.js';

export default class KeyboardSettings extends HTMLElement {
    static get VALID_CHANGE() { return 'onValidityChange'; }
    
    constructor() {
        super();
        this.init(Template, { device: null });
    }

    connectedCallback() {
        const ce = new CustomEvent(KeyboardSettings.VALID_CHANGE, { detail: { valid: false } });
        this.dispatchEvent(ce);
    }

    set device(val) {
        this.model.device = val;
        this.render();
    }

    get device() {
        return this.model.device;
    }

    processInput(e) {
        e.target.value = e.target.value.replace(/(.)(?=.*\1)/g, '');
        const keys = e.target.value.split('');
        this.model.device.options.keys = keys;
        this.model.device.trigger();

        const ce = new CustomEvent(KeyboardSettings.VALID_CHANGE, { 
            detail: { valid: false }, bubbles: true, composed: true });
        if (keys.length > 0) {
            ce.detail.valid = true;
        }
        this.dispatchEvent(ce);
    }
}

Register('moovz-settings-keyboard', KeyboardSettings, Mixins);