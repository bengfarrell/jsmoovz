// with help from BitView (only needed a small piece) https://github.com/kig/bitview.js/
export default class BufferManipulation {
    constructor(buf) {
        this.buffer = buf;
        this.u8 = new Uint8Array(buf);
        console.log(this.u8);
    }

    readBitRangeAsInteger(from, to) {
        let sum = 0;
        for (let c = from; c <= to; c++) {
            const bit = this.getBit(c);
            const intVal = bit * Math.pow(2, to - c);
            sum += intVal;
        }
        return sum;
    }

    getBit(idx) {
        const v = this.u8[idx >> 3];
        const off = idx & 0x7;
        return (v >> (7-off)) & 1;
    }
}
