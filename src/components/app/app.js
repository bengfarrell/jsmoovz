import {html, render} from '../../../node_modules/lit-html/lit-html.js';
import {Reflect, Map} from '../../../node_modules/attrocity/src/attrocity.js';
import StyleShelter from '../../../node_modules/style-shelter/style-shelter.js';
import Spectrum from '../../style/constructable-spectrum.js';
import Template from './template.js';

export default class Application extends HTMLElement {
    constructor() {
        super();
        Spectrum.config.baseURI = './src/style';
        this.attachShadow( { mode: 'open'} );
        StyleShelter.adopt(Spectrum.getComponents(), this.shadowRoot);
        this.render();
    }

    render() {
        render(Template.render(), this.shadowRoot);
    }
}

if (!customElements.get('moovz-app')) {
    customElements.define('moovz-app', Reflect.attach(Application));
}