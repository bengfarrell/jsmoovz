import {Register} from '../../../web_modules/attrocity.js';
import {Mixins} from '../mixins.js';
import Template from './template.js';
import DataModel from '../../datamodel.js';

export default class Tracks extends HTMLElement {
    static get observedAttributes() {
        return ['expanded'];
    }

    constructor() {
        super();
        this.init(Template);
        DataModel.emitter.on(DataModel.MODEL_UPDATE, () => this.render() );
    }
}

Register('moovz-tracks', Tracks, Mixins);