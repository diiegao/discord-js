import LocalStorageBd from "../../modules/LocalStorageBd"
import '../../components/AlertBox/AlertBox'
import ImgBB from "../../modules/ImgBB"

class NewServer extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        this.build()
    }

    build() {    
        this.storage = new LocalStorageBd('localServerList')
        this.serverInfo = this.storage.getStorageParse()
        this.groupRolesCount = 0
        const api = new ImgBB()

        this.shadow.appendChild(this.style())
        this.shadow.appendChild(this.header())
        this.shadow.appendChild(this.content())

        this.shadow.addEventListener('click', function(e) {
            /*BUTTON SAVE SERVER*/
            if(e.target.classList.contains('save-server')){
                this.createNewServer()
                return
            }

            /*BUTTON REMOVE GROUP ROLE*/
            else if(e.target.classList.contains('button-remove-role')){
                this.removeGroupRole(e)
                return
            }

            /*BUTTON ADD NEW ROLE*/
            else if(e.target.classList.contains('button-add-role')){
                this.addNewRole()
                return
            }

        }.bind(this))

        this.shadow.addEventListener('change', async function(e){
            if(e.target.classList.contains('img-server')) {
                const inputServerIcon = this.shadow.querySelector('#server-icon')

                inputServerIcon.value = 'enviando...'
                const response = await api.generateLinkImg(e.target.files[0], 'server-icon')
                inputServerIcon.value = response
                return
            }

            if(e.target.classList.contains('upload-role-icons')) {
                const getTextArea = e.target.parentElement.querySelector('textarea[class=textarea-box]')
                const getLabel = e.target.parentElement.querySelector('label')
                const filesLink = new Array()
                getLabel.innerHTML = 'Enviando...'
                for(let file of e.target.files) { 
                    const response = await api.generateLinkImg(file, `role-icon`)
                    filesLink.push(response)
                }

                const textAreaToArray = getTextArea.value.split(',')
                textAreaToArray.forEach(t => t !== '' ? filesLink.push(t.trim()) : '')
                getTextArea.value = filesLink
                getLabel.innerHTML = 'Upload'
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

            label.send-img-api {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 35px;
                padding: 0 10px;
                font-weight: 500;
                background-color: #9ee37d;
                color: #1d380e;
                border-left: 1px solid #63c132;
                border-radius: 0 5px 5px 0;
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

            .label-button {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 50px;
                padding: 0px 10px;
                color: #1d380e;
                font-weight: 500;
                background-color: #9ee37d;
                border-left: 1px solid #63c132;
                border-radius: 0 5px 5px 0;
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
        header.textContent = 'Adicionar Novo Servidor'
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
                    <a href="https://jpg.church/" target="_blank">jpgChurch</a>
                </span>
            </div>`

        leftContent.innerHTML += /*html*/`
            <div class="server-name">
                <span style="display: block; margin-bottom: 5px;">Nome do Server</span>
                <div class="input-bg-color"> 
                    <input type="text" id="server-name" name="server-name" class="text-box" style="width:250px;" placeholder="Nome do Server" required>
                </div>
            </div>`

        leftContent.innerHTML += /*html*/`
            <div class="join-server" style="margin-top: 10px;">
                <span style="display: block; margin-bottom: 5px;">Membro Desde</span>
                <div class="input-bg-color"> 
                    <input type="text" id="server-since-day" name="server-since-day" class="text-box" style="border-right: 1px solid #40454b;" placeholder="Dia" required>
                    <input type="text" id="server-since-month" name="server-since-month" class="text-box" style="border-right: 1px solid #40454b;" placeholder="Mês" required>
                    <input type="text" id="server-since-year" name="server-since-year" class="text-box" placeholder="Ano" required>
                </div>
            </div>`

        leftContent.innerHTML += /*html*/`
            <div class="icon-server" style="margin-top: 10px;">
                <span style="display: block; margin-bottom: 5px;">Link do Ícone do Server</span>
                <div class="input-bg-color" style="justify-content: space-between; align-items: center;"> 
                    <input type="text" id="server-icon" name="server-icon" class="text-box" style="width:250px;" placeholder="Link do Ícone do Server" required>
                    <label for="img-server" class="send-img-api">Upload</label>
                    <input type="file" name="img-server" id="img-server" class="img-server" accept="image/*" style="display: none;">
                </div>
            </div>`

        leftContent.innerHTML += /*html*/`
            <div class="save-new-server" style="margin-top: 10px;">
                <div class="only-box" style="padding: 0; margin-top: 20px;">
                    <button class="save-server button-add-role" style="width: 100%;">Salvar Server</button>
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

        rightContent.innerHTML += /*html*/`
            <div class="roles-content">
                <div class="input-bg-color" style="justify-content: space-between; align-items: center;">
                    <input type="text" id="server-role-name" name="server-role-name" class="text-box" style="width:230px;" placeholder="Nome do Grupo" required>
                    <input type="text" id="server-role-color" name="server-role-color" class="text-box" style="width:128px; border-left: 1px solid #40454b;" placeholder="Cor do Grupo" required>
                </div>
                <div class="input-bg-color" style="margin-top: 5px; display: flex; justify-content: space-between; align-items: center;">
                    <textarea id="server-role-icons" name="server-role-icons" class="textarea-box" placeholder="Ícones separado por virgula.. exemplo: \nhttp://test.com, http://www.test.com" required></textarea>
                    <label for="upload-role-icons" class="label-button">Upload</label>
                    <input type="file" name="upload-role-icons" id="upload-role-icons" class="upload-role-icons" style="display: none;" accept="image/*" multiple>
                </div>
            </div>`

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

    createNewServer() {
        if(this.shadow.querySelector('#server-name').value == '' ||
        this.shadow.querySelector('#server-since-day').value == '' ||
        this.shadow.querySelector('#server-since-month').value == '' ||
        this.shadow.querySelector('#server-since-year').value == '' ||
        this.shadow.querySelector('#server-icon').value == '') {
            // alert('Preencha os campos para adicionar um novo server.')
            document.body.innerHTML += `<alert-box text="Preencha os campos para adicionar um novo server." type="error"></alert-box>`
            return
        }

        const dateSince = this.monthName(this.shadow.querySelector('#server-since-day').value, this.shadow.querySelector('#server-since-month').value, this.shadow.querySelector('#server-since-year').value)
        const serverId = this.generateId(200)
        const getRoles = this.shadow.querySelectorAll('.roles-content')
        const roles = new Array()
        getRoles.forEach(role => {

            const roleIcon = role.querySelector('#server-role-icons').value
            const iconLink = new Array()
            const getIconLink = roleIcon.split(',')

            getIconLink.forEach(icon => {
                iconLink.push(icon.trim())
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

        const newList = new Array()
        this.serverInfo.forEach(server => {
            newList.push(server)
        })
        newList.push(newServer)
        const listString = JSON.stringify(newList)
        this.storage.setNewData(listString)
        document.body.innerHTML += `<alert-box text="Server adicionado com sucesso. Atualizando a página..." type="sucess"></alert-box>`
        setTimeout(() => document.location.reload(), 1000);

        // console.log(newList)
    }

    testeChange(e) {
        console.log(e)
    }

    addNewRole() {
        this.groupRolesCount++
        const content = /*html*/`
            <div class="divisor"></div>
            <div class="input-bg-color">
                <input type="text" id="server-role-name" name="server-role-name" class="text-box" style="width:250px;" placeholder="Nome do Grupo">
                <input type="text" id="server-role-color" name="server-role-color" class="text-box" style="width:100px; border-left: 1px solid #40454b;" placeholder="Cor do Grupo">
                <button class="button-remove-role">X</button>
            </div>
            <div class="input-bg-color" style="margin-top: 5px; display: flex; justify-content: space-between; align-items: center;">
                <textarea id="server-role-icons" name="server-role-icons" class="textarea-box" placeholder="Ícones separado por virgula.. exemplo: \nhttp://test.com, http://www.test.com"></textarea>
                <label for="upload-role-icons-${this.groupRolesCount}" class="label-button">Upload</label>
                <input type="file" name="upload-role-icons" id="upload-role-icons-${this.groupRolesCount}" class="upload-role-icons" style="display: none;" accept="image/*" multiple>
            </div>`

        const newDiv = document.createElement('div')
        newDiv.setAttribute('class', 'roles-content')
        newDiv.setAttribute('style', 'margin-top: 10px;')
        newDiv.innerHTML = content

        
        const getAppend = this.shadow.querySelector('.form-right-content')
        getAppend.appendChild(newDiv)

        // const inputChange = this.shadowRoot.querySelector(`#upload-role-icons-${this.groupRolesCount}`)
        // console.log(inputChange)
        // inputChange.addEventListener('change', function(e) {
        //     console.log(e)
        // }.bind(this))

        return newDiv
    }

    removeGroupRole(e) {
        const getGroupParent = e.target.parentElement.parentElement
        getGroupParent.remove()
    }

}

window.customElements.define("new-server", NewServer)