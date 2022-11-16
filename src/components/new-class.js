
class ClassName extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        this.build()
    }

    build() {    
        this.shadow.appendChild(this.style())
    }

    style() {
        const style = document.createElement('style')
        style.textContent = /*css*/`
            :host {
                
            }
        `
        return style
    }

}

window.customElements.define("name-component", ClassName)