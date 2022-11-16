import Theme from "../../modules/Theme"

class AvatarStatus extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        this.build()
    }

    build() {  
        this.getStatus = this.getAttribute('status')
        this.getTheme = this.getAttribute('theme')
        this.getColor = this.getAttribute('color')

        // console.log('status:' + this.getStatus)

        this.shadow.appendChild(this.style())
        this.shadow.appendChild(this.profileStatus())
    }

    style() {
        const style = document.createElement('style')
        style.textContent += /*css*/`
            :host {
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 58px;
                left: 58px;
                width: 20px;
                height: 20px;
                padding: 4px;
                border-radius: 50%;
                background-color: ${this.getColor};
            }

            .status-mask {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 20px;
                height: 20px;
                position: absolute;`
                if(this.getTheme == 'default') {
                    style.textContent += /*css*/`
                    top: -1px;
                    left: -1px;`
                } else {
                    style.textContent += /*css*/`
                    top: 0px;
                    left: 0px;`
                }
                style.textContent += /*css*/`
                padding: 4px;
                border-radius: 50%;
                background-color: ${Theme.bgTeste(Theme.alpha, this.getTheme)};
                `
                if(this.getTheme == "default") {
                style.textContent += /*css*/`
                border: 1px solid ${Theme.bgTeste(Theme.alpha, this.getTheme)};
                `
                }
                style.textContent += /*css*/`
            }

            .status {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 16px;
                height: 16px;
                border-radius: 50%;
            }

            .online {
                background-color: #3ba55d;
            }

            .busy {
                background-color: #ec4245;
            }

            .cut-busy {
                height: 4px;
                width: 12px;
                background-color: ${this.getColor};
                border-radius: 5px;
            }

            .cut-busy-mask {
                height: 4px;
                width: 12px;
                background-color: ${Theme.bgTeste(Theme.alpha, this.getTheme)};
                border-radius: 5px;
            }

            .away {
                background-color: #fba81a;
            }

            .cut-away {
                width: 12px;
                height: 12px;
                position: absolute;
                top: 5px;
                left: 3px;
                background-color: ${this.getColor};
                border-radius: 50%;
            }

            .cut-away-mask {
                width: 12px;
                height: 12px;
                background-color: ${Theme.bgTeste(Theme.alpha, this.getTheme)};
                border-radius: 50%;
            }

            .offline {
                background-color: #737f8d;
            }

            .cut-offline {
                width: 8px;
                height: 8px;
                background-color: ${this.getColor};
                border-radius: 50%;
            }

            .cut-offline-mask {
                width: 8px;
                height: 8px;
                background-color: ${Theme.bgTeste(Theme.alpha, this.getTheme)};
                border-radius: 50%;
            }
        `

        return style
    }

    profileStatus() {
        const status = document.createElement('div')

        const mask = document.createElement('div')
        mask.setAttribute('class', 'status-mask')

        const cut = document.createElement('div')
        const maskCut = document.createElement('div')

        switch(this.getStatus) {
            case "0":
            case "1":
                status.setAttribute('class', 'status online')
                break;
            case "2":
                status.setAttribute('class', 'status busy')
                cut.setAttribute('class', 'cut-busy')
                maskCut.setAttribute('class', 'cut-busy-mask')
                cut.appendChild(maskCut)
                status.appendChild(cut)
                break;
            case "3":
                status.setAttribute('class', 'status away')
                cut.setAttribute('class', 'cut-away')
                maskCut.setAttribute('class', 'cut-away-mask')
                cut.appendChild(maskCut)
                status.appendChild(cut)
                break;
            case "4":
                status.setAttribute('class', 'status offline')
                cut.setAttribute('class', 'cut-offline')
                maskCut.setAttribute('class', 'cut-offline-mask')
                cut.appendChild(maskCut)
                status.appendChild(cut)
                break;
            default:
                status.setAttribute('class', 'status')
                break;
        }
        
        mask.appendChild(status)
        return mask
    }

}

window.customElements.define("profile-status", AvatarStatus)