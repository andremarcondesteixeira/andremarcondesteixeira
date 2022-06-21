export default class ThemeChanger extends HTMLElement {
    constructor() {
        super();

        const wrapper = this.createDOMTree();
        const style = this.createStyleNode();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(style, wrapper);
    }

    createDOMTree() {
        const lang = this.getAttribute("lang");

        const lightThemeButton = document.createElement('button');
        lightThemeButton.classList.add('light-theme-button');
        lightThemeButton.type = 'button';
        lightThemeButton.title = lang === 'pt-BR' ? 'Tema Claro' : 'Light Theme';
        lightThemeButton.innerText = 'A';

        const darkThemeButton = document.createElement('button');
        darkThemeButton.classList.add('dark-theme-button');
        darkThemeButton.type = 'button';
        darkThemeButton.title = lang === 'pt-BR' ? 'Tema Escuro' : 'Dark Theme';
        darkThemeButton.innerText = 'A';

        this.lightThemeButtonContainer = document.createElement('div');
        this.lightThemeButtonContainer.classList.add('icon-container');
        this.lightThemeButtonContainer.append(lightThemeButton);

        this.darkThemeButtonContainer = document.createElement('div');
        this.darkThemeButtonContainer.classList.add('icon-container');
        this.darkThemeButtonContainer.append(darkThemeButton);

        lightThemeButton.addEventListener('click', this.handleLightThemeButtonClick.bind(this));
        darkThemeButton.addEventListener('click', this.handleDarkThemeButtonClick.bind(this));

        const wrapper = document.createElement('div');
        wrapper.ariaHidden = true;
        wrapper.classList.add('wrapper');
        wrapper.append(this.lightThemeButtonContainer);
        wrapper.append(this.darkThemeButtonContainer);

        return wrapper;
    }

    handleDarkThemeButtonClick() {
        this.lightThemeButtonContainer.classList.remove('selected');

        if (!this.darkThemeButtonContainer.classList.contains('selected')) {
            this.darkThemeButtonContainer.classList.add('selected');
        }

        if (!document.querySelector(':root').classList.contains('dark-theme')) {
            document.querySelector(':root').classList.add('dark-theme');
        }
    }

    handleLightThemeButtonClick() {
        this.darkThemeButtonContainer.classList.remove('selected');

        if (!this.lightThemeButtonContainer.classList.contains('selected')) {
            this.lightThemeButtonContainer.classList.add('selected');
        }

        document.querySelector(':root').classList.remove('dark-theme');
    }

    createStyleNode() {
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
        return style;
    }
}

customElements.define('theme-changer', ThemeChanger);
