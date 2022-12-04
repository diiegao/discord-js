import LocalStorageBd from "../../modules/LocalStorageBd"
import LocalSession from "../../modules/LocalSession"
import Theme from "../../modules/Theme"
import './ProfileBanner'
import './ProfileContent'

class ProfileServer extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        this.build()
    }

    build() {
        this.storageProfile = new LocalStorageBd('localProfileList')
        this.storageServer = new LocalStorageBd('localServerList')
        this.sessionProfile = new LocalSession('profileSelected')
        this.profileId = this.getAttribute('profile-id')
        this.profileById = this.storageProfile.getById(Number(this.sessionProfile.getSession()))
        this.serverById = this.storageServer.getById(Number(this.getAttribute('profile-id')))
        this.bgPrimary = this.profileById.theme.bgPrimary ? this.profileById.theme.bgPrimary : '#2c2c2c'
        this.bgSecondary = this.profileById.theme.bgSecondary ? this.profileById.theme.bgSecondary : '#2c2c2c'

        this.shadow.appendChild(this.style())
        this.shadow.appendChild(this.profile())
    }

    style() {
        const style = document.createElement('style')

        style.textContent = /*css*/`
            :host {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 340px;
                padding: 4px;`
            if(this.profileById.theme.style != "default") {
                style.textContent += /*css*/`
                background: linear-gradient(0deg, ${this.bgSecondary}/*Secondary*/ 0, ${this.bgPrimary}/*Primary*/ 80%);
                box-shadow: 0 8px 16px rgba(0,0,0,0.24);`
            }

            style.textContent += /*css*/`  
                position: relative;  
                border-radius: 8px;
            }

            .profile-body {
                display: flex;
                flex-direction: column;
                height: 100%;
                width: 100%;
                border-radius: 4px;
                background-color: ${Theme.bgTeste(Theme.alpha, this.profileById.theme.style)};
            }
        `
        return style
    }

    profile() {
        const profile = document.createElement('div')
        profile.setAttribute('class', 'profile-body')
        const banner = document.createElement('profile-banner')
        profile.appendChild(banner)
        const content = /*html*/`<profile-content id="${this.getAttribute('profile-id')}"></profile-content>`
        profile.innerHTML += content
        return profile
    }

}

window.customElements.define("profile-server", ProfileServer)