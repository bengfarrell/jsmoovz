import {html} from '../../../node_modules/lit-html/lit-html.js';
import LeftPanel from '../left-panel/leftpanel.js';
export default {
    render() {
        return html`${this.css()}
                    ${this.html()}`;
    },

    html() {
        return html`<moovz-left-panel></moovz-left-panel>`;
    },

    css() {

    }
}