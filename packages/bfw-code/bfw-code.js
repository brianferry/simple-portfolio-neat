import { LitElement, html } from "lit";
import 'prismjs/prism.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

class BfwCode extends LitElement {
    static properties(){
        return {
            theme: String,
            __styles: String,
        }
    }

    constructor() {
        super();
        this.__styles = "";
        this.theme = "";
    }

    connectedCallback(){
        super.connectedCallback();
        if(theme === null){
            this.setAttribute('theme', 'default');
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case 'theme': 
                let body = {};
                body[name] = newValue;
                this.fetchStyles(body).then(styles => {
                    this.__styles = html`${unsafeHTML(styles)}`
                })
        }
    }

    async fetchStyles({ theme }) {
        const theme_file = `prism-${theme}.css`;
        const resource = `../node_modules/prismjs/themes/${theme_file}`;
        const fetchStyles = await fetch(resource).then(async response => await response.text()).catch(e => '');
        return `<style>
        :host {
            display: block;
        }
        ${fetchStyles}
        </style>`;
    }

    updated() {
        Prism.highlightAllUnder(this.shadowRoot);
    }

    render() {
        return html`
            ${this.__styles}
            <code>
                p { color: red }
                article: { background-color: blue; }
            </code>
        `
    }
}

window.customElements.define('bfw-code', BfwCode);