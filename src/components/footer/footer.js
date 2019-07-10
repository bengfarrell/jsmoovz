import {Register} from '../../../web_modules/attrocity.js';
import DataModel from '../../datamodel.js';
import Template from './template.js';
import KeyboardSettings from './device-settings/keyboard/keyboard.js';
import DeviceManager from '../../devices/devicemanager.js';
import {Mixins} from '../mixins.js';
import Keyboard from '../../devices/keyboard.js';

export default class Footer extends HTMLElement {
    constructor() {
        super();
        this.init(Template, {
            currentDeviceIsValid: false,
            currentDeviceName: null,
            currentDeviceType: '',
            editMode: false,
            devices: [
               // { name: 'Tap' },
                { name: 'Keyboard', value: Keyboard.type },
               // { name: 'Moovz' }    
            ]
        });

        this.addEventListener(KeyboardSettings.VALID_CHANGE, e => {
            this.model.currentDeviceIsValid = e.detail.valid;
            this.render();
        });

        DeviceManager.emitter.on('beat', track => this.onBeat(track));
        DataModel.emitter.on(DataModel.TRACK_SELECTED, track => {
            this.model.editMode = (track.index !== -1);
            if (track.index !== -1) {
                this.model.currentDeviceType = track.device.type;
                this.model.currentDeviceIsValid = true;
                this.model.currentDeviceName = track.name;
            }
            this.render();
            this.dom.devicesettings.device = track.device;
        });
    }

    onAddTrack() {
        DataModel.addTrack( this.model.currentDeviceName, this.dom.devicesettings.device);
        this.model.currentDeviceType = '';
        this.model.currentDeviceIsValid = false;
        this.model.currentDeviceName = null;
        this.render();
    }

    onDeviceNameChange(e) {
        this.model.currentDeviceName = e.target.value;
    }

    onBeat(track) {
        if (track === -1 ||
            (this.dom.devicesettings.device && track === this.dom.devicesettings.device.track)) {
            this.dom.beatindicator.classList.toggle('pulse', true);
            setTimeout( () => {
                this.dom.beatindicator.classList.toggle('pulse', false);
            }, 250);
        }
    }

    onSelectMenuItem(e) {
        this.model.currentDeviceType = e.target.value;
        this.render();
        this.dom.devicesettings.device = DeviceManager.create(e.target.value, true);
    }
}

Register('moovz-footer', Footer, Mixins);