import Emitter from '../../web_modules/chirashi-event-emitter.js';

export default class BaseDevice {
    constructor(autostart) {
        this._emitter = Emitter();
        this.options = {};

        if (autostart) {
            this.start();
        }

        this._track = -1;
    }

    get type() {
        return this.constructor.type;
    }

    set track(val) {
        this._track = val;
    }

    get track() {
        return this._track;
    }

    get emitter() {
        return this._emitter;
    }

    toggle() {
        this._listening = !this._listening;
    }

    start() {
        this._listening = true;
    }

    pause() {
        this._listening = false;
    }    

    stop() {
        this._listening = false;
    }

    trigger() {
        if (this._listening) {
            this._emitter.emit('beat', this.track);
        }
    }
}