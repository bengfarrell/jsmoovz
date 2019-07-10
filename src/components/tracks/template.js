import {html} from '../../../web_modules/lit-html.js';
import DataModel from '../../datamodel.js';
import {ifDefined} from '../../../node_modules/lit-html/directives/if-defined.js';
export default {
    render(scope, model) {
        return html`${this.css()}
                    ${this.html(scope, model)}`;
    },

    html(scope) {
        const model = DataModel;
        return html`${model.tracks.map(track => 
            html`<div class="track">${track.markers.map(marker => 
            html`<div class="marker spectrum-Slider-handle" style="left: ${marker}px"></div>`
            )}</div>`)}`;
    },

    css() {
        return html`<style>
            :host { 
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
                overflow: scroll;
            }

            .track {
                display: inline-block;
                position: relative;
                height: 42px;
                border-bottom-style: solid;
                border-bottom-width: 1px;
                border-bottom-color: var(--spectrum-alias-border-color);
            }

            .marker {
                display: inline-block;
                position: absolute;
                height: 40px;
                width: 10px;
                background-color: red;
            }
        </style>`;
    }
}