import {Register} from '../../../web_modules/attrocity.js';
import {Mixins} from '../mixins.js';
import Template from './template.js';

export default class Application extends HTMLElement {
    constructor() {
        super();
        this.init(Template);
    }
}

Register('moovz-app', Application, Mixins);