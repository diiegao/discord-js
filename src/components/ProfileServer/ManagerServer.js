import LocalStorageBd from "../../modules/LocalStorageBd";
import '../../components/AlertBox/AlertBox'

class ManagerServer extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        this.build()
    }

    build() { 
        this.storage = new LocalStorageBd('localServerList')
        this.getId = this.getAttribute('profile-id')
        this.serverById = this.storage.getById(this.getId)

        this.shadow.appendChild(this.style())
        this.shadow.appendChild(this.editButton())
        this.shadow.appendChild(this.removeButton())
        this.shadow.addEventListener('click', function(e){
            if(e.path[0].classList.contains('remove')){
                console.log('Remover Server ' + this.getId)
                const confirmRemove = confirm(`Deseja excluir o server: (${this.getId}) - ${this.serverById.name}`)
                confirmRemove ? this.removeServer() : ''
                return
            }
        }.bind(this))
    }

    style() {
        const style = document.createElement('style')
        style.textContent = /*css*/`
            :host {
                display: flex;
                flex-direction: row;
                column-gap: 15px;
                position: absolute;
                top: 20px;
                left: 330px;
                font-weight: bold;
            }

            .button {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 15px 20px;
                text-decoration: none;
                border-radius: 5px;
            }

            .edit {
                color: #fff;
                background-color: #0a7902;
                border: 1px solid #05b11a;
            }

            .edit:hover {
                background-color: #05b11a;
            }
            
            .remove {
                font-family: "whitneylight", "Helvetica Neue", Helvetica, Arial, sans-serif;
                color: #fff;
                background-color: #870305;
                border: 1px solid #f8060a;
                font-weight: bold;
                font-size: 16px;
            }

            .remove:hover {
                background-color: #6d0506;
            }
        `

        return style
    }

    editButton() {
        const editButton = document.createElement('a')
        editButton.setAttribute('href', `/edit-server/${this.getAttribute('profile-id')}`)
        editButton.setAttribute('class', 'button edit')
        editButton.textContent = 'Editar Server'

        return editButton
    }
    
    removeButton() {
        const removeButton = document.createElement('button')
        removeButton.setAttribute('class', 'button remove')
        removeButton.textContent = 'Excluir Server'

        return removeButton
    }

    removeServer() {
        const storage = this.storage.getStorageParse()
        const newList = new Array()
        storage.filter(e => e.id != this.getId ? newList.push(e) : '')

        const newListStringify = JSON.stringify(newList)
        this.storage.setNewData(newListStringify)
        this.shadow.innerHTML += `<alert-box text="Server removido com sucesso. Atualizando a página..." type="sucess"></alert-box>`
        setTimeout(() => document.location = '/', 3000);
        // document.location = '/'
    }
}

window.customElements.define("manager-server", ManagerServer)