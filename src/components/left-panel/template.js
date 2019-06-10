import {html} from '../../../node_modules/lit-html/lit-html.js';
import Icons from '../../style/icons.js';

export default {
    render(scope, model) {
        return html`${this.css()}
                    ${this.html(scope, model)}`;
    },

    html(scope, model) {
        return html`<button @click=${scope.eventCallback} class="spectrum-Button spectrum-Button--cta">
            <svg class="spectrum-Icon spectrum-Icon--sizeS" focusable="false" aria-hidden="true" aria-label="Edit">
                ${Icons.AddCircle}
            </svg>
            <span class="spectrum-ActionButton-label">&nbsp;Add</span>
        </button>

        <div class="spectrum-Accordion" role="region">
            ${model.devices.map( device => html`
            <div class="spectrum-Accordion-item" role="presentation" @click=${this.onAccordionToggle}>
                <h3 class="spectrum-Accordion-itemHeading">
                    <button class="spectrum-Accordion-itemHeader" type="button" id="spectrum-accordion-item-0-header" aria-controls="spectrum-accordion-item-0-content" aria-expanded="true">${device.name}</button>
                    <svg class="spectrum-Icon spectrum-UIIcon-ChevronRightMedium spectrum-Accordion-itemIndicator" focusable="false" aria-hidden="true">
                        ${Icons.ChevronRightMedium}
                    </svg>
                </h3>
                <div class="spectrum-Accordion-itemContent" role="region" id="spectrum-accordion-item-0-content" aria-labelledby="spectrum-accordion-item-0-header">Item 1</div>
            </div>
        </div>`)}`;
    },

    css() {

    },

    onAccordionToggle(e) {
        e.currentTarget.classList.toggle('is-open');
    }
}