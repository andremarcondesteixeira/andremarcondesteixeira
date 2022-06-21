export default class ThemeChanger extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const sun = document.createElement('button');
        sun.classList.add('sun');
        sun.type = 'button';
        sun.title = 'Light Theme';

        const moon = document.createElement('button');
        moon.classList.add('moon');
        moon.type = 'button'
        moon.title = 'Dark Theme';

        const sunContainer = document.createElement('div');
        sunContainer.classList.add('icon-container');
        sunContainer.append(sun);

        const moonContainer = document.createElement('div');
        moonContainer.classList.add('icon-container');
        moonContainer.append(moon);

        sun.addEventListener('click', () => {
            moonContainer.classList.remove('selected');

            if (!sunContainer.classList.contains('selected')) {
                sunContainer.classList.add('selected');
            }

            document.querySelector(':root').classList.remove('black-theme');
        });

        moon.addEventListener('click', () => {
            sunContainer.classList.remove('selected');

            if (!moonContainer.classList.contains('selected')) {
                moonContainer.classList.add('selected');
            }

            if (!document.querySelector(':root').classList.contains('black-theme')) {
                document.querySelector(':root').classList.add('black-theme');
            }
        });

        const wrapper = document.createElement('div');
        wrapper.ariaHidden = true;
        wrapper.classList.add('wrapper');
        wrapper.append(sunContainer);
        wrapper.append(moonContainer);

        const style = document.createElement('style');
        style.textContent = `
            .wrapper {
                text-align: right;
            }
            
            .icon-container {
                border: 1px solid transparent;
                border-radius: var(--default-border-radius);
                display: inline-block;
                padding: 1rem;
            }
            
            .icon-container.selected {
                border: 1px solid #000;
            }
            
            .sun, .moon {
                border: 1px solid #333;
                cursor: pointer;
                display: block;
                border-radius: 100%;
                height: 2rem;
                width: 2rem;
            }
            
            .sun {
                background-color: #ffff75;
            }
            
            .moon {
                background-color: #aaaaaa;
            }
        `;

        this.shadowRoot.append(style, wrapper);
    }
}

customElements.define('theme-changer', ThemeChanger);
