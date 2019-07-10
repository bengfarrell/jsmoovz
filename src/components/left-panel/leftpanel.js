import {Register} from '../../../web_modules/attrocity.js';
import {Mixins} from '../mixins.js';
import DataModel from '../../datamodel.js';
import DeviceManager from '../../devices/devicemanager.js';
import Template from './template.js';

export default class LeftPanel extends HTMLElement {
    constructor() {
        super();
        this.init(Template);
        DataModel.emitter.on(DataModel.MODEL_UPDATE, () => this.render() );
        DeviceManager.emitter.on('beat', track => this.onBeat(track));
    }

    onBeat(track) {
        if (track > -1) {
            this.dom.tracks[track].classList.toggle('pulse', true);
            setTimeout( () => {
                this.dom.tracks[track].classList.toggle('pulse', false);
            }, 250);
        }
    }

    onToggleRecord(e) {
        e.preventDefault();
        e.stopPropagation();
        const indx = parseInt(e.currentTarget.getAttribute('track'));
        DataModel.tracks[indx].recording = !DataModel.tracks[indx].recording;
        this.render();
    }

    onSelect(e) {
        const indx = parseInt(e.currentTarget.getAttribute('track'));
        if (DataModel.selected === indx) {
            DataModel.selected = null;
        } else {
            DataModel.selected = indx;
        }
        this.render();
    }
}

Register('moovz-left-panel', LeftPanel, Mixins);