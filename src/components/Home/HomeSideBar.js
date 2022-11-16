import './ProfileSideBar'
import './ServerSideBar'

class HomeSideBar extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        this.build()
    }

    build() {
        this.shadow.appendChild(this.style())
        this.shadow.appendChild(this.profileSettings())
        this.shadow.appendChild(this.serverList())
    }

    style() {
        const style = document.createElement('style')
        style.textContent = /*css*/`

            :host {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 300px;
                height: 100vh;
                padding: 0 10px;
                position: fixed;
                background-color: #2a2b2f;
                border-right: 1px solid #363940;
                box-sizing: border-box;
                overflow: auto;
            }

            :host::-webkit-scrollbar {
                width: 2px;
            }
            
            :host::-webkit-scrollbar-track {
                box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            }
            
            :host::-webkit-scrollbar-thumb {
            background-color: #363940;
            outline: 1px solid #363940;
            }

        `

        return style
    }

    profileSettings() {
        const settings = document.createElement('profile-settings')

        return settings
    }

    serverList() {
        const list = document.createElement('servers-list')

        return list
    }
}

window.customElements.define("side-bar", HomeSideBar)