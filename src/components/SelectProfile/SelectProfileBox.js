import LocalStorageBd from '../../modules/LocalStorageBd'
import LocalSession from '../../modules/LocalSession'

class SelectProfileBox extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        this.build()

    }

    build() {
        this.storageProfile = new LocalStorageBd('localProfileList')
        this.shadow.appendChild(this.style())
        this.shadow.appendChild(this.removeButton(this.getAttribute('profile-id')))
        this.shadow.appendChild(this.profileAvatar(this.getAttribute('avatar')))
        this.shadow.appendChild(this.profileName(this.getAttribute('name')))
        
        this.shadow.addEventListener('click', function (e) {

            if(e.target.classList.contains('remove-button')){
                const profileById = this.storageProfile.getById(this.getAttribute('profile-id'))
                const confirmRemove = confirm(`Deseja remover o profile: (${this.getAttribute('profile-id')}) - ${profileById.nickname}`)
                confirmRemove ? this.removeProfile(this.getAttribute('profile-id')) : ''
                return
            }

            this.profileClick()

        }.bind(this))
    }

    style() {
        const style = document.createElement('style')
        style.textContent = /*css*/`
            :host {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                min-width: 200px;
                margin: 5px;
                background-color: #2a2b2f;
                border: 1px solid #363940;
                border-radius: 5px;
                box-sizing: border-box;
            }

            :host(:hover) {
                background-color: #363940;
                cursor: pointer;
            }

            .profile-avatar {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                margin-bottom: 10px;
                padding-top: 10px;
            }  

            .profile-avatar > img {
                border-radius: 50%;
            }

            .profile-name {
                font-family: "whitneybold","Helvetica Neue",Helvetica,Arial,sans-serif;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                padding-bottom: 20px;
            }

            .remove-button {
                position: relative;
                top: -10px;
                right: -10px;
                align-self: flex-end;
                padding: 3px 6px;
                border-radius: 50%;
                border: 1px solid #f00;
                background-color: #d75d5f;
                color: #fff;
                z-index: 99;
            }
        `

        return style
    }

    profileAvatar(url) {
        const box = document.createElement('div')
        box.setAttribute('class', 'profile-avatar')
        const boxImg = document.createElement('img')
        boxImg.setAttribute('src', url)
        boxImg.setAttribute('width', '80')
        boxImg.setAttribute('height', '80')
        box.appendChild(boxImg)

        return box
    }

    profileName(name) {
        const box = document.createElement('div')
        box.setAttribute('class', 'profile-name')
        box.textContent = name

        return box
    }

    removeButton(id) {
        const button = document.createElement('button')
        button.setAttribute('class', 'remove-button')
        button.setAttribute('data-profile-id', id)
        button.innerText = 'X'

        return button
    }

    profileClick() {
        const session = new LocalSession('profileSelected')
        session.setSession(this.getAttribute('profile-id'))
        document.location = '/'
    }

    removeProfile(id) {
        console.log('Click remove-button', id)

        const storage = this.storageProfile.getStorageParse()
        const newList = new Array()
        storage.filter(e => e.id != id ? newList.push(e) : '')

        const newListStringify = JSON.stringify(newList)
        this.storageProfile.setNewData(newListStringify)
        document.body.innerHTML += `<alert-box text="Profile removido com sucesso. Atualizando a página..." type="sucess"></alert-box>`
        setTimeout(() => document.location.reload(), 1000);
        // document.location.reload()
        return
    }
}

window.customElements.define("profile-box", SelectProfileBox)