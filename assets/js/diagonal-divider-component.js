export default class DiagonalDivider extends HTMLElement {
    constructor() {
        super();

        const wrapper = this.createDOMTree();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(style, wrapper);
    }

    createDOMTree() {

    }
}

customElements.define('diagonal-divider', DiagonalDivider);
