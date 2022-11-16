import LocalStorageBd from "../../modules/LocalStorageBd"
import LocalSession from "../../modules/LocalSession"
import Theme from "../../modules/Theme"
import './AvatarStatus'
import './ProfileNitro'

class ProfileBanner extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        this.build()
    }

    build() {    
        this.session = new LocalSession('profileSelected')
        this.storage = new LocalStorageBd('localProfileList')
        this.profileInfo = this.storage.getById(this.session.getSession())

        this.shadow.appendChild(this.style())
        this.shadow.appendChild(this.avatar())
        this.shadow.innerHTML += this.nitro()
        this.shadow.appendChild(this.editBanner())
    }

    style() {
        const style = document.createElement('style')
        style.textContent = /*css*/`
            :host {
                display: flex;
                justify-content: space-between;
                min-width: 340px;`
            
            if(this.profileInfo.urlBanner) {
                style.textContent += /*css*/`
                min-height: 120px;
                background: url(${this.profileInfo.urlBanner});
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                background-color: inherit;
                `
            } else {
                style.textContent += /*css*/`
                height: 90px;
                background-color: ${this.profileInfo.bgBanner != undefined ? this.profileInfo.bgBanner : '#f00'};
                `
            }

            style.textContent += /*css*/`    
                border-radius: 4px 4px 0 0;
            }

            .edit-profile {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 18px;
                height: 18px;
                position: relative;
                top: 10px;
                right: 12px;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                background-color: rgba(0, 0, 0, 0.3);
                transition: background-color .2s ease;
            }

            .edit-profile:hover {
                background-color: rgba(0, 0, 0, 0.6);
            }

            .profile-avatar {
                width: 80px;
                height: 80px;
                position: relative;
                top: ${this.profileInfo.urlBanner ? '76px' : '38px'};
                left: 16px;
                padding: 5px;
                border-radius: 50%;
                background-color: ${this.profileInfo.theme.bgPrimary};
                border: none;
            }

            .avatar-mask {
                width: 80px;
                height: 80px;
                position: absolute;`
                if(this.profileInfo.theme.style == 'default') {
                    style.textContent += /*css*/`
                    top: -1px;
                    left: -1px;`
                } else {
                    style.textContent += /*css*/`
                    top: 0px;
                    left: 0px;`
                }
                style.textContent += /*css*/`
                padding: 5px;
                border-radius: 50%;
                background-color: ${Theme.bgTeste(Theme.alpha, this.profileInfo.theme.style)};
                `
                if(this.profileInfo.theme.style == "default"){
                style.textContent += /*css*/`
                border: 1px solid ${Theme.bgTeste(Theme.alpha, this.profileInfo.theme.style)};
                `
                } else {
                    style.textContent += /*css*/`
                    border: none;
                    `
                }
            style.textContent += /*css*/`
            }

            .profile-avatar-img {
                width: 80px;
                height: 80px;
                background: url(${this.profileInfo.urlAvatar ? this.profileInfo.urlAvatar : '/images/942.png'});
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                border-radius: 50%;
            }
        `
        return style
    }

    editBanner() {
        const edit = document.createElement('div')
        edit.setAttribute('class', 'edit-profile')
        edit.innerHTML = /*html*/`
            <svg aria-label="Editar perfil" aria-hidden="false" role="img" width="18" height="18" viewBox="0 0 24 24">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z" fill="currentColor"></path>
            </svg>
        `
        return edit
    }

    avatar() {
        const avatar = document.createElement('div')
        avatar.setAttribute('class', 'profile-avatar')

        const mask = document.createElement('div')
        mask.setAttribute('class', 'avatar-mask')
        avatar.appendChild(mask)

        const avatarImg = document.createElement('div')
        avatarImg.setAttribute('class', 'profile-avatar-img')
        mask.appendChild(avatarImg)

        const status = /*html*/`<profile-status status="${this.profileInfo.status}" theme="${this.profileInfo.theme.style}" color="${this.profileInfo.theme.bgPrimary}"></profile-status>`
        avatar.innerHTML += status
        return avatar
    }

    nitro() {
        const nitro = /*html*/`<profile-nitro nitro="${this.profileInfo.boost}" month="${this.profileInfo.boostMonth}" theme="${this.profileInfo.theme.style}"></profile-nitro>`
        return nitro
    }
}

window.customElements.define("profile-banner", ProfileBanner)