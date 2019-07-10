import Spectrum from '../style/constructable-spectrum.js';
import StyleShelter from '../../web_modules/style-shelter.js';
import {render, directive} from '../../web_modules/lit-html.js';
import {LitMap} from '../../web_modules/attrocity.js';

Spectrum.config.baseURI = './src/style';

export const Mixins = function(clazz) { return [
    {
        name: 'init',
        fn: function(template, model) {
            this.dom = {};
            this.model = model ? model : {};
            this.template = template;
            this.attachShadow( { mode: 'open' } );
            StyleShelter.adopt(Spectrum.getComponents(template.CSSComponents), this.shadowRoot);
            this.render();
        }
    }, {
        name: 'render',
        fn: function() {
            render(this.template.render(this, this.model), this.shadowRoot);
        }
    }]
};