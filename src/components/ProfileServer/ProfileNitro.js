import Theme from "../../modules/Theme";

class ProfileNitro extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        this.build()
    }

    build() {    
        this.getNitro = this.getAttribute('nitro')
        this.getNitroMonth = this.getAttribute('month')
        this.getTheme = this.getAttribute('theme')

        if(this.getNitro == "true") {
            this.shadow.appendChild(this.style())
            this.shadow.appendChild(this.nitro())
            if(this.getNitroMonth > 0) {
                this.shadow.appendChild(this.nitroMonth())
            }
        }
    }

    style() {
        const style = document.createElement('style')
        style.textContent = /*css*/`
            :host {
                display: flex;
                flex-direction: row;  
                align-self: flex-end;
                max-width: 190px;
                position: relative;
                column-gap: 2px;
                top: 42px;
                left: ${this.getNitroMonth > 0 ? '96px' : '108px'};
                padding: 4px;
                background-color: ${Theme.bgTeste(Theme.nitro, this.getTheme)};
                border-radius: 8px;
            }

            img {
                display: block;
                width:22px;
                height:22px;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: 50%;
            }

        `
        return style
    }

    nitro() {
        const nitro = document.createElement('img')
        nitro.setAttribute('src', '/images/nitro/nitro.svg')
        return nitro
    }
    
    nitroMonth() {
        const nitro = document.createElement('img')
        nitro.setAttribute('src', `/images/nitro/boost${this.getNitroMonth}month.svg`)
        return nitro
    }
}

window.customElements.define("profile-nitro", ProfileNitro)