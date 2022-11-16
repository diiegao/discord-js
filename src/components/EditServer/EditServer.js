import LocalStorageBd from "../../modules/LocalStorageBd"
import '../../components/AlertBox/AlertBox'

class EditServer extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        this.build()
    }

    build() {    
        this.storage = new LocalStorageBd('localServerList')
        this.getId = this.getAttribute('server-id')
        this.serverInfo = this.storage.getById(this.getId)

        this.shadow.appendChild(this.style())
        this.shadow.appendChild(this.header())
        this.shadow.appendChild(this.content())

        this.shadow.addEventListener('click', function(e) {
            /*BUTTON SAVE SERVER*/
            if(e.path[0].classList.contains('save-server')){
                // this.createNewServer()
                this.editServer()
                return
            }

            /*BUTTON REMOVE GROUP ROLE*/
            else if(e.path[0].classList.contains('button-remove-role')){
                this.removeGroupRole(e)
                return
            }

            /*BUTTON ADD NEW ROLE*/
            else if(e.path[0].classList.contains('button-add-role')){
                this.addNewRole()
                return
            }

        }.bind(this))
    }

    style() {
        const style = document.createElement('style')
        style.textContent = /*css*/`
            :host {
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                flex-direction: column;
                width: 100%;
                height: 100%;
            }

            h2 {
                margin: 0 0 10px 0;
            }

            .form-content {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: 1fr;
                width: 100%;
            }

            .form-left {
                display: flex;
                justify-content: flex-end;
                margin-right: 40px;
            }

            .form-right {
                display: flex;
                justify-content: flex-start;
                flex-direction: column;
                align-items: flex-start;
                margin-left: 40px;
            }

            .form-left-content,
            .form-right-content,
            .add-new-role {
                min-width: 400px;
                max-width: 400px;
            }

           

            .input-bg-color {
                display: flex;
                background-color: #363940;
                column-gap: 5px;
                border-radius: 5px;
            }

            .input-bg-color > .text-box {
                width: 100%;
                color: #ccc;
                background: transparent;
                border: none;
                padding: 10px;
            }
            
            .text-box:focus-visible {
                outline: 0;
            }

            .input-bg-color > .textarea-box {
                display: block;
                width: 100%;
                height:30px; 
                color: #ccc;
                background: transparent;
                border: none;
                padding: 10px;
                resize: none;
            }

            .textarea-box::-webkit-scrollbar {
                width: 2px;
            }
            
            .textarea-box::-webkit-scrollbar-track {
                box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            }
            
            .textarea-box::-webkit-scrollbar-thumb {
                background-color: #363940;
                outline: 1px solid #363940;
            }

            .divisor {
                width: 100%;
                height: 1px;
                background-color: #363940;
                margin: 10px 0;
            }

            .box-no-bg {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;  
                column-gap: 10px;
                margin-top: 5px;
                padding: 10px;
                border: 1px solid #2a2b2f;
                border-radius: 5px;
            }

            .only-box {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;  
                column-gap: 10px;
                margin-top: 5px;
                padding: 10px;
                border-radius: 5px;
            }

            .button-remove-role {
                max-width: 23px;
                min-width: 23px;
                border: 1px solid #f00;
                background-color: #d75d5f;
                color: #fff;
                border-radius: 0 5px 5px 0;
            }

            .button-remove-role:hover {
                background-color: #EB2D30;
            }

            .button-add-role {
                padding: 10px 20px;
                color: #1d380e;
                background-color: #9ee37d;
                border: 1px solid #63c132;
                border-radius: 5px;
            }

            .button-add-role:hover {
                background-color: #8bdd63;
            }

            .warning-upload {
                display: flex;
                flex-direction: column;
                padding: 10px;
                margin-bottom: 10px;
                background-color: #EF5350;
                border: 1px solid #c62828;
                border-radius: 5px;
            }

            .warning-upload > p {
                margin-top: 0;
            }

            .warning-upload > span > a{
                color: #fff;
                text-decoration: underline;
                margin-right: 5px;
            }
        `
        return style
    }

    getElement(element) {
        const box = this.shadow.querySelector(element)
        return box
    }

    header() {
        const header = document.createElement('h2')
        header.textContent = `Editar Server - (${this.getId}) ${this.serverInfo.name}`
        return header
    }

    content() {
        const content = document.createElement('div')
        content.setAttribute('class', 'form-content')

        content.appendChild(this.formLeft())
        content.appendChild(this.formRight())
        
        return content
    }

    formLeft() {
        const formLeft = document.createElement('div')
        formLeft.setAttribute('class', 'form-left')

        formLeft.appendChild(this.formLeftContent())

        return formLeft
    }
    
    formRight() {
        const formRight = document.createElement('div')
        formRight.setAttribute('class', 'form-right')

        formRight.appendChild(this.formRightContent())

        formRight.innerHTML += /*html*/`
            <div class="add-new-role" style="margin: 10px 0 20px 0;">
                <div class="only-box" style="justify-content: flex-end; padding: 0;">
                    <button class="button-add-role">Novo Grupo</button>
                </div>
            </div>`

        return formRight
    }

    formLeftContent() {
        const leftContent = document.createElement('div')
        leftContent.setAttribute('class', 'form-left-content')
        
        leftContent.innerHTML += /*html*/`
            <div class="warning-upload">
                <p>Não é possível fazer upload de imagem nesse site, então segue abaixo alguns sites para usar o upload de imagem e usar o link direto nos campos abaixo.</p>
                <span>
                    <a href="https://postimages.org/" target="_blank">PostImage</a>
                    <a href="https://imgbb.com/" target="_blank">ImgBB</a>
                </span>
            </div>`

        leftContent.innerHTML += /*html*/`
            <div class="server-name">
                <span style="display: block; margin-bottom: 5px;">Nome do Server</span>
                <div class="input-bg-color"> 
                    <input type="text" id="server-name" name="server-name" class="text-box" style="width:250px;" placeholder="Nome do Server" value="${this.serverInfo.name}">
                </div>
            </div>`

        const getSinceServer = this.serverInfo.since ? this.serverInfo.since : 'jan 01, 2000'
        const textMonth = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
        const getSinceMonth = getSinceServer.substring(0, 3)
        const getSinceDay = getSinceServer.substring(4, 6) < 10 ? getSinceServer.substring(5, 6) : getSinceServer.substring(4, 6)
        const getSinceYear = getSinceServer.substring(8)
        const getMonthTextId = new Array()
        textMonth.forEach((e, i) => e === getSinceMonth ? getMonthTextId.push(i) : '')

        leftContent.innerHTML += /*html*/`
            <div class="join-server" style="margin-top: 10px;">
                <span style="display: block; margin-bottom: 5px;">Membro Desde</span>
                <div class="input-bg-color"> 
                    <input type="text" id="server-since-day" name="server-since-day" class="text-box" style="border-right: 1px solid #40454b;" placeholder="Dia" value="${getSinceDay < 10 ? '0' + getSinceDay : getSinceDay}">
                    <input type="text" id="server-since-month" name="server-since-month" class="text-box" style="border-right: 1px solid #40454b;" placeholder="Mês" value="${getMonthTextId[0] < 9 ? '0' + (getMonthTextId[0] + 1) : (getMonthTextId[0] + 1)}">
                    <input type="text" id="server-since-year" name="server-since-year" class="text-box" placeholder="Ano" value="${getSinceYear}">
                </div>
            </div>`

        leftContent.innerHTML += /*html*/`
            <div class="icon-server" style="margin-top: 10px;">
                <span style="display: block; margin-bottom: 5px;">Link do Ícone do Server</span>
                <div class="input-bg-color"> 
                    <input type="text" id="server-icon" name="server-icon" class="text-box" placeholder="Link do Ícone do Server" value="${this.serverInfo.icon}">
                </div>
            </div>`

        leftContent.innerHTML += /*html*/`
            <div class="save-new-server" style="margin-top: 10px;">
                <div class="only-box" style="padding: 0; margin-top: 20px;">
                    <button class="save-server button-add-role" style="width: 100%;">Salvar Mudanças</button>
                </div>
            </div>`

        return leftContent
    }

    formRightContent() {
        const rightContent = document.createElement('div')
        rightContent.setAttribute('class', 'form-right-content')

        rightContent.innerHTML += /*html*/`
            <div class="roles-infos" style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span>Nome do Grupo</span>
                <span>Cor do Grupo</span>
            </div>`

        const getRoles = this.serverInfo.roles

        const setRoleID = () => parseInt(Date.now() * Math.random())
        const tryRoleID = new Array()

        getRoles.forEach((role, i) => {
            tryRoleID[i] = setRoleID()

            rightContent.innerHTML += /*html*/`
                <div class="roles-content" id="role-group-${tryRoleID[i]}">
                <div class="divisor"></div>
                    <div class="input-bg-color">
                        <input type="text" id="server-role-name" name="server-role-name" class="text-box" style="width:250px;" placeholder="Nome do Grupo" value="${role.name}">
                        <input type="text" id="server-role-color" name="server-role-color" class="text-box" style="width:100px; border-left: 1px solid #40454b;" placeholder="Cor do Grupo" value="${role.color}">
                        <button class="button-remove-role" role-id="${tryRoleID[i]}">X</button>
                    </div>
                    <div class="input-bg-color" style="margin-top: 5px;">
                        <textarea id="server-role-icons" name="server-role-icons" class="textarea-box" placeholder="Ícones separado por virgula.. exemplo: \nhttp://test.com, http://www.test.com">${role.icon}</textarea>
                    </div>
                </div>
            `
        })

        return rightContent
    }

    monthName(day, month, year) {
        const textMonth = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
        return `${month[0] == 0 && month < 10 ? textMonth[month[1]] : textMonth[month]} ${day < 10 ? day[0] != 0 ? '0' + day : day : day}, ${year}`
    }

    generateId(range) {
        const newId = this.storage.generateNewID(range)
        const filter = this.storage.filterID(this.storage.getStorageParse(), newId) != '' ? this.generateId(range) : newId
        return filter
    }

    editServer() {
        if(this.shadow.querySelector('#server-name').value == '' ||
        this.shadow.querySelector('#server-since-day').value == '' ||
        this.shadow.querySelector('#server-since-month').value == '' ||
        this.shadow.querySelector('#server-since-year').value == '' ||
        this.shadow.querySelector('#server-icon').value == '') {
            // alert('Preencha os campos para adicionar um novo server.')
            this.shadow.innerHTML += `<alert-box text="Preencha os campos para adicionar um novo server." type="error"></alert-box>`
            return
        }

        const dateSince = this.monthName(
            this.shadow.querySelector('#server-since-day').value != "" ? this.shadow.querySelector('#server-since-day').value : '01', 
            this.shadow.querySelector('#server-since-month').value != "" ? (this.shadow.querySelector('#server-since-month').value - 1) : '00', 
            this.shadow.querySelector('#server-since-year').value != "" ? this.shadow.querySelector('#server-since-year').value : '2000')
        const serverId = this.getId
        const getRoles = this.shadow.querySelectorAll('.roles-content')
        const roles = new Array()
        getRoles.forEach(role => {

            const roleIcon = role.querySelector('#server-role-icons').value
            const iconLink = new Array()
            const getIconLink = roleIcon.split(',')
            const removeBreakLine = text => text.replace(/\n\r?/g, '')

            getIconLink.forEach(icon => {
                iconLink.push(removeBreakLine(icon))
            })

            const rolesObj = {
                name: role.querySelector('#server-role-name').value,
                color: role.querySelector('#server-role-color').value,
                icon: iconLink
            }

            roles.push(rolesObj)
        })

        const newServer = {
            id: serverId,
            name: this.shadow.querySelector('#server-name').value,
            since: dateSince,
            icon: this.shadow.querySelector('#server-icon').value,
            roles: roles
        }

        // const newList = new Array()
        // const storage = this.storageProfile.getStorageParse()
        // storage.filter(e => e.id != this.session.getSession() ? newList.push(e) : newList.push(changeProfile))
        // const newListStringify = JSON.stringify(newList)
        // this.storageProfile.setNewData(newListStringify)
        // document.location.reload()

        const newList = new Array()
        const storageParse = this.storage.getStorageParse()
        storageParse.filter(e => e.id != serverId ? newList.push(e) : newList.push(newServer))
        const newListStringify = JSON.stringify(newList)
        this.storage.setNewData(newListStringify)
        this.shadow.innerHTML += `<alert-box text="Server editado com sucesso. Atualizando a página..." type="sucess"></alert-box>`
        setTimeout(() => document.location.reload(), 2000);

        // const newList = new Array()
        // this.serverInfo.forEach(server => {
        //     newList.push(server)
        // })
        // newList.push(newServer)
        // const listString = JSON.stringify(newList)
        // this.storage.setNewData(listString)
        // document.location.reload()

        // console.log(newList)
    }

    addNewRole() {
        const setRoleID = () => parseInt(Date.now() * Math.random())
        const tryRoleID = new Array()
        tryRoleID.push(setRoleID())
        const content = /*html*/`
            <div class="divisor"></div>
            <div class="input-bg-color">
                <input type="text" id="server-role-name" name="server-role-name" class="text-box" style="width:250px;" placeholder="Nome do Grupo">
                <input type="text" id="server-role-color" name="server-role-color" class="text-box" style="width:100px; border-left: 1px solid #40454b;" placeholder="Cor do Grupo">
                <button class="button-remove-role" role-id="${tryRoleID[0]}">X</button>
            </div>
            <div class="input-bg-color" style="margin-top: 5px;">
                <textarea id="server-role-icons" name="server-role-icons" class="textarea-box" placeholder="Ícones separado por virgula.. exemplo: \nhttp://test.com, http://www.test.com"></textarea>
            </div>`

        const newDiv = document.createElement('div')
        newDiv.setAttribute('class', 'roles-content')
        newDiv.setAttribute('style', 'margin-top: 10px;')
        newDiv.setAttribute('id', `role-group-${tryRoleID[0]}`)
        newDiv.innerHTML = content

        const getAppend = this.shadow.querySelector('.form-right-content')
        getAppend.appendChild(newDiv)
        return newDiv
    }

    removeGroupRole(e) {
        const getId = e.path[0].getAttribute("role-id")
        const getGroup = this.shadow.getElementById(`role-group-${getId}`)
        const countInput = this.shadow.querySelectorAll('.roles-content')
        if(countInput.length <= 1) {
            return
        } else {
            getGroup.remove()
        }
    }

}

window.customElements.define("edit-server", EditServer)