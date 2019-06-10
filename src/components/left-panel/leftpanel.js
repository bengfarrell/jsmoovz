import {html, render} from '../../../node_modules/lit-html/lit-html.js';
import {Reflect, Map} from '../../../node_modules/attrocity/src/attrocity.js';
import StyleShelter from '../../../node_modules/style-shelter/style-shelter.js';
import Spectrum from '../../style/constructable-spectrum.js';
import Template from './template.js';

export default class LeftPanel extends HTMLElement {
    constructor() {
        super();

        this.model = { 
            devices: [ 
                { name: 'Device 1' },
                { name: 'Device 2' },
                { name: 'Device 3' },
                { name: 'Device 4' }
            ]
        };
    
        Spectrum.config.baseURI = './src/style';
        this.attachShadow( { mode: 'open'} );
        StyleShelter.adopt(Spectrum.getComponents(), this.shadowRoot);
        this.render();
    }

    eventCallback(e) {
        console.log(this);
    }

    render() {
        render(Template.render(this.shadowRoot, this.model), this.shadowRoot);
        Map.wire(this.shadowRoot, e => this.eventCallback(e));
    }
}

if (!customElements.get('moovz-left-panel')) {
    customElements.define('moovz-left-panel', Reflect.attach(LeftPanel));
}