import EventListener from './eventlistener.js';

export default class BluetoothConnection extends EventListener {
    static get ERROR_EVENT() { return 'onError'; }
    static get NOTIFICATION_EVENT() { return 'onNotification'; }
    static get STATUS_EVENT() { return 'onStatus'; }

    static get SOUNDMOOVZ_SENSOR_SERVICE() { return 'e89efdda-ad17-43d5-8ca9-08024534606d'; }
    static get SOUNDMOOVZ_NOTIFICATION_CHARACTERISTIC() { return '6bca21d1-521d-4548-bf0b-208cf8cc8e9f'; }
    static get SOUNDMOOVZ_NAME_PREFIX() { return 'BMZ001'; }

    connect() {
        navigator.bluetooth.requestDevice( {
            optionalServices: [BluetoothConnection.SOUNDMOOVZ_SENSOR_SERVICE],
            filters: [{
                namePrefix: BluetoothConnection.SOUNDMOOVZ_NAME_PREFIX
            }],
        }).then(device => {
                const ce = new CustomEvent(BluetoothConnection.STATUS_EVENT, { detail: { status: 'device requested: ' + device.name }});
                this.triggerEvent(ce);
                return device.gatt.connect();
            })
            .then(server => {
                const ce = new CustomEvent(BluetoothConnection.STATUS_EVENT, { detail: { status: 'device connected' }});
                this.triggerEvent(ce);
                return server.getPrimaryService(BluetoothConnection.SOUNDMOOVZ_SENSOR_SERVICE);
            })
            .then(service => {
                const ce = new CustomEvent(BluetoothConnection.STATUS_EVENT, { detail: { status: 'service recieved' }});
                this.triggerEvent(ce);
                return service.getCharacteristic(BluetoothConnection.SOUNDMOOVZ_NOTIFICATION_CHARACTERISTIC);
            })
            .then(ch => {
                const ce = new CustomEvent(BluetoothConnection.STATUS_EVENT, { detail: { status: 'characteristic received' }});
                this.triggerEvent(ce);
                ch.addEventListener('characteristicvaluechanged', e => {
                    const ce = new CustomEvent(BluetoothConnection.NOTIFICATION_EVENT, { detail: { buffer: e.target.value.buffer }});
                    this.triggerEvent(ce);
                });
                return ch;
            }).then(ch => {
                const ce = new CustomEvent(BluetoothConnection.STATUS_EVENT, { detail: { status: 'start notifications' }});
                this.triggerEvent(ce);
                return ch.startNotifications()
            })
            .catch(error => {
                console.log('error', error.message)
                const ce = new CustomEvent(BluetoothConnection.ERROR_EVENT, { detail: { error }});
                this.triggerEvent(ce);
            });
    }
}
