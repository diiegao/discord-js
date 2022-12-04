import LocalStorageBd from "../../modules/LocalStorageBd"

class ServerSideBar extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        this.build()
    }

    build() {
        this.storage = new LocalStorageBd('localServerList')
        
        this.shadow.appendChild(this.style())
        this.shadow.appendChild(this.headerTitle())
        this.shadow.appendChild(this.newServerButton())
        this.renderButtonList()
    }

    style() {
        const style = document.createElement('style')
        style.textContent = /*css*/`
            :host {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;  
                margin-bottom: 25px;
            }

            h2 {
                font-size: 16pt;
                margin: 15px 0;
            }

            .server-button {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                padding: 10px 0;
                margin: 5px 15px;
                border: 1px solid #ffffff50;
                border-radius: 5px;
                color: #fff;
                text-decoration: none;
            }

            .server-button:hover {
                background-color: #363940;
            }

            .new-server {
                color: #1d380e;
                background-color: #9ee37d;
                border: 1px solid #63c132;
                font-weight: bold;
            }

            .new-server:hover {
                background-color: #8bdd63;
            }
        `

        return style
    }

    headerTitle() {
        const header = document.createElement('h2')
        header.textContent = 'Server List'
        return header
    }

    newServerButton() {
        const button = document.createElement('a')
        button.setAttribute('href', '/new-server')
        button.setAttribute('class', 'server-button new-server')
        button.innerText = 'Adicionar Novo Servidor'
        return button
    }

    serverButton(name, id) {
        const link = document.createElement('a')
        link.setAttribute('href', `/profile/${id}`)
        link.setAttribute('class', 'server-button')
        link.innerText = `${name}`
        return link
    }

    renderButtonList() {

        // if(!this.storage.verify()) {
        //     this.storage.setNewData("[]") 
        //     document.location.reload()
        // }

        const list = this.storage.getStorageParse()

        list.forEach(e => {
            this.shadow.appendChild(this.serverButton(e.name, e.id))
        })
    }

}

window.customElements.define("servers-list", ServerSideBar)