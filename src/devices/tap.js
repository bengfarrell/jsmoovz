/**
* JavaScript project for accessing and normalizing the accelerometer and gyroscope data on mobile devices
*
* @author Doruk Eker <doruk@dorukeker.com>
* @copyright Doruk Eker <http://dorukeker.com>
* @version 2.0.6
* @license MIT License | http://opensource.org/licenses/MIT
* Refactored to ES6 module by Ben Farrell
*/

export default class Tap {
    constructor() {
        /*this.accelerometer = new Accelerometer({frequency: 60});
        this.baseLine = { samples: [], reading: [0, 0, 0] };
        this.accelerometer.addEventListener('reading', e => this.onReading(e) );
        this.accelerometer.start();
        console.log(this.accelerometer)*/
    }

    record() {
    }

    pause() {

    }

    onReading(e) {
        /*
        if (this.baseLine.samples.length < 100) {
            this.baseLine.samples.push( [ this.accelerometer.x, this.accelerometer.y, this.accelerometer.x]);
        } else if (this.baseLine.reading.length === 0) {
            let x = 0, y = 0, z = 0;
            for (let c = 0; c < this.baseLine.samples.length; c++) {
                x += this.baseLine.samples[c][0];
                y += this.baseLine.samples[c][1];
                z += this.baseLine.samples[c][2];
            }
            this.baseLine.reading = [ x/100, y/100, z/100 ];
        }*/

        console.log(
            this.accelerometer.x - this.baseLine.reading[0],
            this.accelerometer.y - this.baseLine.reading[1],
            this.accelerometer.z - this.baseLine.reading[2])

    }
}