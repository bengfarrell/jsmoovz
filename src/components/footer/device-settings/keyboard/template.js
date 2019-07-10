import {html} from '../../../../../web_modules/lit-html.js';
import Icons from '../../../../style/icons.js';
import Spectrum from '../../../../style/constructable-spectrum.js';
export default {

    get adoptedStyle() {
        return Spectrum.getComponents([Spectrum.TEXTFIELD]);
    },

    render(scope, model) {
        return html`${this.css()}
                    ${this.html(scope, model)}`;
    },

    html(scope, model) {
        return html`<label class="spectrum-FieldLabel">Keys to trigger beat</label>
                    <input type="text" 
                        @input=${e => scope.processInput(e)}
                        value=${model.device ? model.device.options.keys : ''}
                        placeholder="Keys to watch" 
                        name="field" 
                        class="spectrum-Textfield"
                        required>
        `;
    },

    css() {
        return html`<style>
        </style>`;
    }
}