export default class ThemeChanger extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const lightThemeButton = document.createElement('button');
        lightThemeButton.classList.add('light-theme-button');
        lightThemeButton.type = 'button';
        lightThemeButton.title = 'Light Theme';
        lightThemeButton.innerText = 'A';

        const darkThemeButton = document.createElement('button');
        darkThemeButton.classList.add('dark-theme-button');
        darkThemeButton.type = 'button'
        darkThemeButton.title = 'Dark Theme';
        darkThemeButton.innerText = 'A';

        const lightThemeButtonContainer = document.createElement('div');
        lightThemeButtonContainer.classList.add('icon-container');
        lightThemeButtonContainer.append(lightThemeButton);

        const darkThemeButtonContainer = document.createElement('div');
        darkThemeButtonContainer.classList.add('icon-container');
        darkThemeButtonContainer.append(darkThemeButton);

        lightThemeButton.addEventListener('click', () => {
            darkThemeButtonContainer.classList.remove('selected');

            if (!lightThemeButtonContainer.classList.contains('selected')) {
                lightThemeButtonContainer.classList.add('selected');
            }

            document.querySelector(':root').classList.remove('dark-theme');
        });

        darkThemeButton.addEventListener('click', () => {
            lightThemeButtonContainer.classList.remove('selected');

            if (!darkThemeButtonContainer.classList.contains('selected')) {
                darkThemeButtonContainer.classList.add('selected');
            }

            if (!document.querySelector(':root').classList.contains('dark-theme')) {
                document.querySelector(':root').classList.add('dark-theme');
            }
        });

        const wrapper = document.createElement('div');
        wrapper.ariaHidden = true;
        wrapper.classList.add('wrapper');
        wrapper.append(lightThemeButtonContainer);
        wrapper.append(darkThemeButtonContainer);

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
                border: 1px solid var(--text-color);
            }
            
            .light-theme-button, .dark-theme-button {
                border: 1px solid var(--text-color);
                cursor: pointer;
                display: block;
                border-radius: 100%;
                height: 3rem;
                text-align: center;
                width: 3rem;
            }
            
            .light-theme-button {
                background-color: var(--light-theme-background-color);
                color: var(--light-theme-text-color);
            }
            
            .dark-theme-button {
                background-color: var(--dark-theme-background-color);
                color: var(--dark-theme-text-color);
            }
        `;

        this.shadowRoot.append(style, wrapper);
    }
}

customElements.define('theme-changer', ThemeChanger);
