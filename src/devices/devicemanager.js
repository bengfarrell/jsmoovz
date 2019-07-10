import Keyboard from './keyboard.js';
import Emitter from '../../web_modules/chirashi-event-emitter.js';

export default {
    create(name, autostart) {
        if (!this._devices) { 
            this._devices = [];
        }
        switch (name.toLowerCase()) {
            case Keyboard.type:
                const d = new Keyboard(autostart);
                this._devices.push(d);
                d.emitter.on('beat', () => {
                   this.onBeat(d.track);
                });
                return d;
        }
    },

    get emitter() {
        if (!this._emitter) {
            this._emitter = Emitter();
        }
        return this._emitter;
    },

    onBeat(track) {
        if (this._emitter) {
            this._emitter.emit('beat', track);
        }
    }
}