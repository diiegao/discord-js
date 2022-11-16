import LocalSession from "../../modules/LocalSession"
import LocalStorageBd from "../../modules/LocalStorageBd"

class ProfileSideBar extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        this.build()
    }

    build() {
        this.session = new LocalSession('profileSelected')
        this.storage = new LocalStorageBd('localProfileList')
        this.profileById = this.storage.getById(this.session.getSession())

        this.shadow.appendChild(this.style())
        this.shadow.appendChild(this.profileButtons())
        this.shadow.appendChild(this.profileAvatar())
        this.shadow.appendChild(this.profileName())      
    }

    style() {
        const style = document.createElement('style')
        style.textContent = /*css*/`
            :host {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;  
                border-bottom: 1px solid #ffffff50;
                padding-bottom: 20px;
            }

            .profile-buttons {
                display: flex;
                justify-content: space-between;
                width: 100%;
                position: absolute;
                top: 20px;
                padding: 10px 20px;
                box-sizing: border-box;
                z-index: 9999;
            }

            .button-edit-profile,
            .button-change-profile {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 5px 5px 2px 5px;
                background-color: rgba(0, 0, 0, 0.3);
                border-radius: 50%;
            }

            .button-edit-profile:hover,
            .button-change-profile:hover {
                background-color: rgba(0, 0, 0, 0.6);
            }
      
            .button-edit-profile > a,
            .button-change-profile > a {
                color: #f5f8f6;
                text-decoration: none;
            }
            
            .profile-avatar {
                background-image: url(${this.profileById.urlAvatar ? this.profileById.urlAvatar : '/images/942.png'});
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                width: 150px;
                height: 150px;
                border: 10px solid #18191d;
                border-radius: 50%;
                margin-top: 20px;
            }
            
            .profile-name {
                font-family: "whitneybold","Helvetica Neue",Helvetica,Arial,sans-serif;
                font-size: 16pt;
                font-weight: bold;
                margin-top: 10px;
                text-decoration: none;
                color: #fff;
            }
        `

        return style
    }

    profileButtons() {
        const content = document.createElement('div')
        content.setAttribute('class', 'profile-buttons')

        const buttonEdit = document.createElement('div')
        buttonEdit.setAttribute('class', 'button-edit-profile')
        buttonEdit.innerHTML = /*html*/`
            <a href="/edit-profile">
                <svg aria-label="Editar perfil" aria-hidden="false" role="img" width="25" height="25" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z" fill="currentColor"></path>
                </svg>
            </a>
        `

        const buttonChange = document.createElement('div')
        buttonChange.setAttribute('class', 'button-change-profile')
        buttonChange.innerHTML = /*html*/`
            <a href="/select-profile">
                <svg aria-hidden="true" role="img" width="25" height="25" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.4996 0H6.72144C6.62254 1.34004e-06 6.52586 0.0293272 6.44363 0.0842743C6.36141 0.139221 6.29733 0.217322 6.25949 0.308693C6.22165 0.400063 6.21176 0.500602 6.23106 0.597595C6.25037 0.694589 6.298 0.783679 6.36794 0.8536L7.63564 2.1213C7.82317 2.30884 7.92853 2.56319 7.92853 2.8284C7.92853 3.09361 7.82317 3.34796 7.63564 3.5355L6.22144 4.9498C5.65884 5.51241 5.34277 6.27546 5.34277 7.0711C5.34277 7.86674 5.65884 8.62979 6.22144 9.1924C6.40897 9.37993 6.66331 9.48528 6.92853 9.48528C7.19374 9.48528 7.4481 9.37993 7.63564 9.1924L9.75703 7.0711C10.1321 6.69603 10.6408 6.48533 11.1712 6.48533C11.7017 6.48533 12.2104 6.69603 12.5854 7.0711L13.146 7.6317C13.2159 7.70164 13.305 7.74927 13.402 7.76858C13.499 7.78788 13.5996 7.77799 13.6909 7.74015C13.7823 7.70231 13.8604 7.63823 13.9154 7.556C13.9703 7.47377 13.9996 7.37709 13.9996 7.2782V0.5C13.9996 0.367392 13.9469 0.240214 13.8532 0.146446C13.7594 0.052678 13.6322 0 13.4996 0Z" fill="currentColor"></path>
                    <path d="M4.5 17.9999H11.2782C11.3771 17.9999 11.4738 17.9706 11.556 17.9157C11.6382 17.8607 11.7023 17.7826 11.7401 17.6912C11.778 17.5999 11.7879 17.4993 11.7686 17.4023C11.7493 17.3053 11.7016 17.2163 11.6317 17.1463L10.364 15.8786C10.1765 15.6911 10.0711 15.4367 10.0711 15.1715C10.0711 14.9063 10.1765 14.652 10.364 14.4644L11.7782 13.0501C12.3408 12.4875 12.6569 11.7245 12.6569 10.9288C12.6569 10.1332 12.3408 9.37014 11.7782 8.80753C11.5907 8.62 11.3363 8.51465 11.0711 8.51465C10.8059 8.51465 10.5515 8.62 10.364 8.80753L8.2426 10.9288C7.86753 11.3039 7.35883 11.5146 6.8284 11.5146C6.29797 11.5146 5.78927 11.3039 5.4142 10.9288L4.85361 10.3682C4.78369 10.2983 4.69459 10.2507 4.5976 10.2314C4.5006 10.2121 4.40006 10.2219 4.30869 10.2598C4.21731 10.2976 4.13922 10.3617 4.08427 10.4439C4.02933 10.5262 4 10.6228 4 10.7217V17.4999C4 17.6325 4.05269 17.7597 4.14645 17.8535C4.24022 17.9473 4.36739 17.9999 4.5 17.9999Z" fill="currentColor"></path>
                </svg>
            </a>
        `

        content.appendChild(buttonEdit)
        content.appendChild(buttonChange)

        return content
    }

    profileAvatar() {
        const avatar = document.createElement('div')
        avatar.setAttribute('class', 'profile-avatar')
        return avatar
    }

    profileName() {
        const name = document.createElement('a')
        name.setAttribute('href', '/')
        name.setAttribute('class', 'profile-name')
        name.textContent = this.profileById.nickname
        return name
    }
}

window.customElements.define("profile-settings", ProfileSideBar)