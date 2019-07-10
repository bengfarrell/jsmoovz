import {html, directive} from '../../../web_modules/lit-html.js';
import {LitMap} from '../../../web_modules/attrocity.js';
import Icons from '../../style/icons.js';
import DataModel from '../../datamodel.js';

const Map = directive(LitMap);

export default {
    render(scope, model) {
        return html`${this.css()}
                    ${this.html(scope, model)}`;
    },

    html(scope) {
        const model = DataModel;
        return html`${model.tracks.map( (track, index) => html`
            <div class="track ${model.selected === index ? 'selected' : ''}" 
                track=${index} 
                map=${Map(scope.dom, 'tracks.' + index)}
                @click=${e => scope.onSelect(e)}>
                <button track=${index} @click=${e => scope.onToggleRecord(e)} 
                        class="spectrum-ActionButton ${track.recording ? 'is-selected' : ''}">
                    <svg class="spectrum-Icon spectrum-Icon--sizeS" focusable="false" aria-hidden="true" aria-label="Circle">
                        ${Icons.Circle}
                    </svg>
                    <span class="spectrum-ActionButton-label">Record</span>
                </button>
                <span class="label">${track.name}</span>
            </div>`)}`;
    },

    css() {
        return html`<style>
        :host {
            cursor: pointer;
        }

        .track {
            padding: 5px;
            background-color: var(--spectrum-alias-highlight-active);
            border-bottom-style: solid;
            border-bottom-width: 1px;
            border-bottom-color: var(--spectrum-alias-border-color-dark);
        }

        .track.selected {
            background-color: var(--spectrum-global-color-gray-500);
            color: var(--spectrum-global-color-gray-100);
        }

        .track.pulse {
            background-color: var(--spectrum-global-color-red-500);
        }

        .track button {
            vertical-align: middle;
        }

        .track button.is-selected,
        .track button.is-selected svg {
            color: var(--spectrum-global-color-red-500);
        }

        .track .label {
            font-weight: bold;
            font-size: 14px;
        }
    </style>`;
    }
}