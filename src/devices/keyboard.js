import BaseDevice from './basedevice.js';

export default class Keyboard extends BaseDevice {
    static get type() { return 'keyboard'; }
    
    start() {
        super.start();
        this.options = { keys: [] };
        this.keylistener = event => {
            if (event.repeat === true) { return; }
            if (this.options.keys.indexOf(String.fromCharCode(event.keyCode).toLowerCase()) !== -1) {
                this.trigger();
            }
        }

        document.addEventListener('keydown', this.keylistener);
    }

    stop() {
        super.stop();
        document.removeEventListener('keydown', this.keylistener);
    }
}