import ObservableMembrane from '../web_modules/observable-membrane.js';
import Emitter from '../web_modules/chirashi-event-emitter.js';
import DeviceManager from './devices/devicemanager.js';

export default {
    get MODEL_UPDATE() { return 'dataModelUpdate'; },
    get TRACK_SELECTED() { return 'trackSelected'; },

    get emitter() {
        this.init();
        return this._emitter;
    },

    init() {
        if (!this._initialized) {
            this._emitter = Emitter();
            this._membrane = new ObservableMembrane({
                valueMutated: (val) => {
                    this._emitter.emit(this.MODEL_UPDATE);
                }
            });
            this._tracks = [];
            this._initialized = true;
        }
    },

    get selected() {
        return this._selected;
    },

    set selected(val) {
        if (val === null) { val = -1; }
        this._selected = val;
        this._emitter.emit(this.TRACK_SELECTED, { index: val, device: this._tracks[val].device, name: this._tracks[val].name });
    },

    addTrack(name, device) {
        this.init();
        this._tracks.push( { 
            name: name, 
            device: device, markers: []
        });

        device.track = this._tracks.length -1;
        this._emitter.emit(this.MODEL_UPDATE);
    },

    get tracks() {
        this.init();
        return this._membrane.getProxy(this._tracks);
    }
}