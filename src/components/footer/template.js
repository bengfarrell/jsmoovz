import {html} from '../../../web_modules/lit-html.js';
import Icons from '../../style/icons.js';
import Spectrum from '../../style/constructable-spectrum.js';
import KeyboardSettings from './device-settings/keyboard/keyboard.js';
import {LitMap} from '../../../web_modules/attrocity.js';
import {directive} from '../../../web_modules/lit-html.js';

const Map = directive(LitMap);

export default {

    render(scope, model) {
        return html`${this.css()}
                    ${this.html(scope, model)}`;
    },

    html(scope, model) {
        return html`
            <button @click=${ e => scope.classList.toggle('expanded')} class="expand spectrum-ActionButton">
                <svg class="up spectrum-Icon spectrum-Icon--sizeS" focusable="false" aria-hidden="true" aria-label="Edit">
                    ${Icons.ChevronUpSmall}
                </svg>
                <svg class="down spectrum-Icon spectrum-Icon--sizeS" focusable="false" aria-hidden="true" aria-label="Edit">
                    ${Icons.ChevronDownSmall}
                </svg>
            </button>

            <div id="device-details">
                <div class="spectrum-Form-item">
                    ${this.renderToolbar(scope, model)}

                    <button class="spectrum-ActionButton">
                        <svg map=${Map(scope.dom, 'beatindicator')} class="spectrum-Icon spectrum-Icon--sizeS" focusable="false" aria-hidden="true" aria-label="Circle">
                            ${Icons.Circle}
                        </svg>
                    </button>
                </div>
                <hr class="spectrum-Rule spectrum-Rule--small">
                <span id="settings" class="spectrum-Well">
                    ${this.renderSettingsView(scope, model.currentDeviceType)}
                </span>
            </div>`;
    },

    renderToolbar(scope, model) {
        if (model.editMode) {
            return html`<input @change=${e => scope.onDeviceNameChange(e)} type="text"
                value=${model.currentDeviceName}
                placeholder="Name of Device" 
                class="spectrum-Textfield">`;
        } else {
            return html`<button @click=${ e => scope.onAddTrack(e)} ?disabled=${!model.currentDeviceIsValid} class="spectrum-Button spectrum-Button--cta spectrum-SplitButton-action">
                <svg class="spectrum-Icon spectrum-Icon--sizeS" focusable="false" aria-hidden="true" aria-label="Edit">
                    ${Icons.AddCircle}
                </svg>
                <span class="spectrum-ActionButton-label">&nbsp;Add Device</span>
            </button>

            <input @change=${e => scope.onDeviceNameChange(e)} type="text"
                ?value=${model.currentDeviceName}
                placeholder="Name of Device" 
                class="spectrum-Textfield">

            <div class="spectrum-Dropdown">
                <select class="spectrum-FieldButton spectrum-Dropdown-trigger" @change=${e => scope.onSelectMenuItem(e)}>
                    <option disabled ?selected="${model.currentDeviceType === ''}" value>type of device</option>
                    ${model.devices.map(device => html`<option ?selected="${model.currentDeviceType === device.name}" value="${device.value}">${device.name}</option>` )}
                </select>
                <svg class="spectrum-Icon spectrum-UIIcon-ChevronDownMedium spectrum-Dropdown-icon">
                    ${Icons.ChevronDownMedium}
                </svg>
            </div>`;
        }
    },

    renderSettingsView(scope, name) {
        switch (name) {
            case 'keyboard':
                return html`<moovz-settings-keyboard map=${Map(scope.dom, 'devicesettings')} id="devicesettings"></moovz-settings-keyboard>`;

            default: 
                return html``;
        }
    },

    css() {
        return html`<style>
            :host { 
                display: flex;
                position: relative;
                padding: 10px;
                height: 15px;
                background-color: white !important;
                padding-top: 20px;
                border-top-style: solid;
                border-top-width: 1px;
                border-top-color: var(--spectrum-alias-border-color);
            }

            .expand.spectrum-ActionButton {
                position: absolute;
                left: 50%;
                top: -15px;
                border-radius: 20px;
            }

            .expand.spectrum-ActionButton svg.spectrum-Icon {
                position: absolute;
                left: calc(50% - 4px);
                top: calc(50% - 4px);
            }

            :host(.expanded) {
                height: 50%;
            }

            :host(.expanded) .expand.spectrum-ActionButton svg.up {
                display: none;
            }

            :host .expand.spectrum-ActionButton svg.down {
                display: none;
            }

            :host(.expanded) .expand.spectrum-ActionButton svg.down {
                display: initial;
            }

            #device-details {
                width: 100%;
                height: calc(100% - 30px);
                padding-top: 30px;
                display: flex;
                flex-direction: column;
                text-align: center;
            }

            #settings {
                flex: 1;
            }

            :host .spectrum-ActionButton .spectrum-Icon.pulse {
                color: var(--spectrum-global-color-red-500);
            }
        </style>`;
    }
}