import {html} from '../../../web_modules/lit-html.js';
import LeftPanel from '../left-panel/leftpanel.js';
import Tracks from '../tracks/tracks.js';
import Footer from '../footer/footer.js';

export default {
    render(scope) {
        return html`${this.css()}
                    ${this.html(scope)}`;
    },

    html(scope) {
        return html`<section>
                        <moovz-left-panel></moovz-left-panel>
                        <moovz-tracks></moovz-tracks>
                    </section>
            
                    <moovz-footer></moovz-footer>`;
    },

    css() {
        return html`<style>
            :host { 
                display: flex;
                flex-direction: column;
                height: 100%;
            }

            section {
                display: flex;
                width: 100%;
            }

            moovz-left-panel {
                width: 150px;
            }

            moovz-tracks {
                flex: 1;
            }

            moovz-footer {
                margin-top: auto;
            }
        </style>`;
    }
}