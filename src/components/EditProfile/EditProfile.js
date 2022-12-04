import LocalSession from "../../modules/LocalSession"
import LocalStorageBd from "../../modules/LocalStorageBd"
import ImgBB from "../../modules/ImgBB"
import '../../components/AlertBox/AlertBox'

class EditProfile extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        this.build()
    }

    build() {    
        this.storageProfile = new LocalStorageBd('localProfileList')
        this.session = new LocalSession('profileSelected')
        const api = new ImgBB()

        this.profileInfo = this.storageProfile.getById(this.session.getSession())

        this.shadow.appendChild(this.style())
        this.shadow.appendChild(this.header())
        this.shadow.appendChild(this.content())
        this.shadow.addEventListener('click', function(e) {
            if(e.target.classList.contains('edit-button')) {
                this.sendNewProfile()
                return
            }
        }.bind(this))

        this.shadow.addEventListener('change', async function(e) {
            if(e.target.classList.contains('img-avatar')) {
                const avatarImgInput = this.shadow.querySelector('#avatar-img')

                avatarImgInput.value = 'enviando...'
                const response = await api.generateLinkImg(e.target.files[0], 'profile-avatar')
                console.log('avatar', response)
                avatarImgInput.value = response
                return
            }

            if(e.target.classList.contains('img-banner')) {
                const bannerImgInput = this.shadow.querySelector('#banner-img')

                bannerImgInput.value = 'enviando...'
                const response = await api.generateLinkImg(e.target.files[0], 'profile-banner')
                console.log('banner', response)
                bannerImgInput.value = response
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
                margin-left: 40px;
            }

            .form-left-content,
            .form-right-content {
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

            .divisor {
                width: 100%;
                height: 1px;
                background-color: #363940;
                margin: 20px 0;
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

            /* */

            .status {
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

            .circle {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                position: relative;
                cursor: pointer;
            }

            .online-color {
                background-color: #3ba55d;
            }

            .busy-color {
                background-color: #ec4245;
            }

            .busy-cut {
                height: 6px;
                width: 14px;
                background-color: #2a2b2f;
                border-radius: 5px;
            }

            .away-color {
                background-color: #fba81a;
            }

            .away-cut {
                width: 13px;
                height: 13px;
                position: absolute;
                top: 0;
                left: 0;
                background-color: #2a2b2f;
                border-radius: 50%;
            }

            .offline-color {
                background-color: #737f8d;
            }

            .offline-cut {
                width: 10px;
                height: 10px;
                background-color: #2a2b2f;
                border-radius: 50%;
            }

            .boost-option,
            .theme-style-option,
            .nitro-option,
            .select-status {
                display: none;
            }

            .select-status + .circle {
                border: 5px solid #2a2b2f;
            }

            .select-status:checked + .circle {
                border: 5px solid #40454b;
                box-shadow: 1px 1px 8px 2px rgba(64,69,75,0.74);
            }

            .select-status:checked + .circle > .busy-cut{
                background-color: #40454b;
            }

            .select-status:checked + .circle > .away-cut {
                background-color: #40454b;
            }

            .select-status:checked + .circle > .offline-cut {
                background-color: #40454b;
            }

            .status-nitro {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;  
                column-gap: 15px;
                margin-top: 5px;
                padding: 8px;
                border: 1px solid #2a2b2f;
                border-radius: 5px;
            }

            .nitro-circle {
                display: flex;
                justify-content: center;
                align-items: center;
                max-height: 25px;
                border-radius: 5px;
                cursor: pointer;
                border: 1px solid #2a2b2f;
                padding: 5px 10px;
            }

            .nitro-option:checked + .nitro-circle {
                background-color: rgba(64,69,75,0.74);
                border: 1px solid rgba(64,69,75,0.74);
                box-shadow: 1px 1px 8px 2px rgba(64,69,75,0.74);
            }

            .boost-option + .boost-button {
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #212226;
                cursor: pointer;
            }

            .boost-option:checked + .boost-button {
                background-color: rgba(64,69,75,0.74);
                border: 1px solid rgba(64,69,75,0.74);
                border-radius: 5px;
                box-shadow: 1px 1px 8px 2px rgba(64,69,75,0.74);
            }

            .theme-style-option + .theme-style-button {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px 20px;
                border: 1px solid #2a2b2f;
                border-radius: 5px;
                cursor: pointer;
            }

            .theme-style-option:checked + .theme-style-button {
                background-color: rgba(64,69,75,0.74);
                border: 1px solid rgba(64,69,75,0.74);
                border-radius: 5px;
                box-shadow: 1px 1px 8px 2px rgba(64,69,75,0.74);
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

            .color-box {
                border: 1px solid rgba(64,69,75,0.74);
                width: 80px;
                background-color: transparent;
                border-radius: 5px;
                margin-left: 5px;
            }

            .box-w {
                height: 50px;
            }

            .edit-button {
                width: 100%;
                margin-top: 20px;
                padding: 10px 20px;
                color: #1d380e;
                background-color: #9ee37d;
                border: 1px solid #63c132;
                border-radius: 5px;
            }

            .edit-button:hover {
                background-color: #8bdd63;
            }

            img.emoji {
                width: 19px;
                height: 19px;
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
        header.textContent = 'Editar Profile'
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

        return formRight
    }

    formLeftContent() {
        const leftContent = document.createElement('div')
        leftContent.setAttribute('class', 'form-left-content')

        leftContent.innerHTML = /*html*/`
            <div class="edit-name-hash">
                <span style="display: block; margin-bottom: 5px;">Nome de Usuário</span>
                <div class="input-bg-color"> 
                    <input type="text" id="profile-name" name="profile-name" class="text-box" style="width:250px;" placeholder="Nickname" value="${this.profileInfo.nickname ? this.profileInfo.nickname : ''}">
                    <input type="text" id="profile-hash" name="profile-hash" class="text-box" style="width:100px; border-left: 1px solid #40454b;" placeholder="Hash" value="${this.profileInfo.hash ? this.profileInfo.hash : ''}">
                </div>
            </div>`

        const getSinceProfile = this.profileInfo.sinceDiscord
        const textMonth = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
        const getSinceMonth = getSinceProfile.substring(0, 3)
        const getSinceDay = getSinceProfile.substring(4, 6) < 10 ? getSinceProfile.substring(5, 6) : getSinceProfile.substring(4, 6)
        const getSinceYear = getSinceProfile.substring(8)
        const getMonthTextId = new Array()
        textMonth.forEach((e, i) => e === getSinceMonth ? getMonthTextId.push(i) : '')
        
        leftContent.innerHTML += /*html*/`
            <div class="since-profile">
                <span style="display: block; margin-bottom: 5px; margin-top: 10px;">Membro Discord Desde</span>
                <div class="input-bg-color"> 
                    <input type="text" id="discord-since-day" name="discord-since-day" class="text-box" style="border-right: 1px solid #40454b;" placeholder="Dia" value="${getSinceDay < 10 ? '0' + getSinceDay : getSinceDay}">      
                    <input type="text" id="discord-since-month" name="discord-since-month" class="text-box" style="border-right: 1px solid #40454b;" placeholder="Mês" value="${getMonthTextId[0] < 9 ? '0' + (getMonthTextId[0] + 1) : (getMonthTextId[0] + 1)}">      
                    <input type="text" id="discord-since-year" name="discord-since-year" class="text-box" placeholder="Ano" value="${getSinceYear}">      
                </div>
            </div>`
        
        leftContent.innerHTML += /*html*/`    
            <div class="about-me">
                <span style="display: block; margin-bottom: 5px; margin-top: 10px;">Sobre Mim</span>
                <div class="input-bg-color"> 
                    <textarea id="about-me" name="about-me" class="text-box" style="width:100%; height:50px; resize: none;" placeholder="Sobre Mim">${this.profileInfo.aboutMe ? this.breakLineReverse(this.profileInfo.aboutMe) : ''}</textarea>    
                </div>
            </div>`

        leftContent.innerHTML += /*html*/` 
            <div class="note-profile">
                <span style="display: block; margin-bottom: 5px; margin-top: 10px;">Nota</span>
                <div class="input-bg-color"> 
                    <input type="text" id="profile-note" name="profile-note" class="text-box" style="width:100%;" placeholder="Nota" value="${this.profileInfo.note ? this.breakLineReverse(this.profileInfo.note) : ''}">      
                </div>
            </div>

            <div class="divisor"></div>`

        leftContent.innerHTML += /*html*/` 
            <div class="status-profile">
                <span style="display: block;">Status</span>
                <div class="status">
                    <label for="online">
                        <input type="radio" name="status-profile" id="online" class="select-status" value="1" ${this.profileInfo.status <= 1 ? 'checked' : ''}>
                        <div class="circle online-color"></div>
                    </label>

                    <label for="busy">
                        <input type="radio" name="status-profile" id="busy" class="select-status" value="2" ${this.profileInfo.status == 2 ? 'checked' : ''}>
                        <div class="circle busy-color">
                            <div class="busy-cut"></div>
                        </div>
                    </label>

                    <label for="away">
                        <input type="radio" name="status-profile" id="away" class="select-status" value="3" ${this.profileInfo.status == 3 ? 'checked' : ''}>
                        <div class="circle away-color">
                            <div class="away-cut"></div>
                        </div>
                    </label>

                    <label for="offline">
                        <input type="radio" name="status-profile" id="offline" class="select-status" value="4" ${this.profileInfo.status == 4 ? 'checked' : ''}>
                        <div class="circle offline-color">
                            <div class="offline-cut"></div>
                        </div>
                    </label>
                </div>
            </div>`

            leftContent.innerHTML += /*html*/`
                <div class="discord-nitro">
                    <span style="display: block; margin-bottom: 5px; margin-top: 10px;">Nitro</span>
                    <div class="status-nitro">
                        <label for="non-nitro">
                            <input type="radio" name="profile-nitro" id="non-nitro" class="nitro-option" value="0" ${this.profileInfo.boost == 0 ? 'checked' : ''}>
                            <div class="nitro-circle">
                                <img src="/images/nitro/none-2.svg" draggable="false" alt="nitro" width="25" height="25" class="nitro-img" style="margin: 0 10px 0 -5px;">
                                Comum
                            </div>
                        </label>

                        <label for="nitro-acc">
                            <input type="radio" name="profile-nitro" id="nitro-acc" class="nitro-option" value="1" ${this.profileInfo.boost == 1 ? 'checked' : ''}>
                            <div class="nitro-circle">
                                <img src="/images/nitro/nitro.svg" draggable="false" alt="nitro" width="30" height="30" class="nitro-img" style="margin: 0 10px 0 -5px;">
                                Nitro
                            </div>
                        </label>
                    </div>
                </div>
            `

            leftContent.innerHTML += /*html*/`
                <div class="server-boost">
                    <span style="display: block; margin-bottom: 5px; margin-top: 10px;">Server Boost</span>
                    <div class="status" style="column-gap: 8px;">
                        <label for="boost-none">
                            <input type="radio" name="boost-month" id="boost-none" class="boost-option" value="0" ${this.profileInfo.boostMonth <= 0  ? 'checked' : ''}>
                            <div class="boost-button" style="">
                                <img src="/images/nitro/none-2.svg" draggable="false" alt="nitro" width="25" height="25" style="padding: 2px;">
                            </div>
                        </label>

                        <label for="boost-1">
                            <input type="radio" name="boost-month" id="boost-1" class="boost-option" value="1" ${this.profileInfo.boostMonth == 1  ? 'checked' : ''}>
                            <div class="boost-button">
                                <img src="/images/nitro/boost1month.svg" draggable="false" alt="nitro" width="30" height="30">
                            </div>
                        </label>

                        <label for="boost-2">
                            <input type="radio" name="boost-month" id="boost-2" class="boost-option" value="2" ${this.profileInfo.boostMonth == 2  ? 'checked' : ''}>
                            <div class="boost-button">
                                <img src="/images/nitro/boost2month.svg" draggable="false" alt="nitro" width="30" height="30">
                            </div>
                        </label>

                        <label for="boost-3">
                            <input type="radio" name="boost-month" id="boost-3" class="boost-option" value="3" ${this.profileInfo.boostMonth == 3  ? 'checked' : ''}>
                            <div class="boost-button">
                                <img src="/images/nitro/boost3month.svg" draggable="false" alt="nitro" width="30" height="30">
                            </div>
                        </label>

                        <label for="boost-6">
                            <input type="radio" name="boost-month" id="boost-6" class="boost-option" value="6" ${this.profileInfo.boostMonth == 6  ? 'checked' : ''}>
                            <div class="boost-button">
                                <img src="/images/nitro/boost6month.svg" draggable="false" alt="nitro" width="30" height="30">
                            </div>
                        </label>

                        <label for="boost-9">
                            <input type="radio" name="boost-month" id="boost-9" class="boost-option" value="9" ${this.profileInfo.boostMonth == 9  ? 'checked' : ''}>
                            <div class="boost-button">
                                <img src="/images/nitro/boost9month.svg" draggable="false" alt="nitro" width="30" height="30">
                            </div>
                        </label>

                        <label for="boost-12">
                            <input type="radio" name="boost-month" id="boost-12" class="boost-option" value="12" ${this.profileInfo.boostMonth == 12  ? 'checked' : ''}>
                            <div class="boost-button">
                                <img src="/images/nitro/boost12month.svg" draggable="false" alt="nitro" width="30" height="30">
                            </div>
                        </label>

                        <label for="boost-15">
                            <input type="radio" name="boost-month" id="boost-15" class="boost-option" value="15" ${this.profileInfo.boostMonth == 15  ? 'checked' : ''}>
                            <div class="boost-button">
                                <img src="/images/nitro/boost15month.svg" draggable="false" alt="nitro" width="30" height="30">
                            </div>
                        </label>

                        <label for="boost-18">
                            <input type="radio" name="boost-month" id="boost-18" class="boost-option" value="18" ${this.profileInfo.boostMonth == 18  ? 'checked' : ''}>
                            <div class="boost-button">
                                <img src="/images/nitro/boost18month.svg" draggable="false" alt="nitro" width="30" height="30">
                            </div>
                        </label>

                        <label for="boost-24">
                            <input type="radio" name="boost-month" id="boost-24" class="boost-option" value="24" ${this.profileInfo.boostMonth == 24  ? 'checked' : ''}>
                            <div class="boost-button">
                                <img src="/images/nitro/boost24month.svg" draggable="false" alt="nitro" width="30" height="30">
                            </div>
                        </label>
                    </div>
                </div>
            `
    
        return leftContent
    }

    formRightContent() {
        const rightContent = document.createElement('div')
        rightContent.setAttribute('class', 'form-right-content')

        rightContent.innerHTML += /*html*/`
            <div class="warning-upload">
                <p>Não é possível fazer upload de imagem nesse site, então segue abaixo alguns sites para usar o upload de imagem e usar o link direto nos campos abaixo.</p>
                <span>
                    <a href="https://postimages.org/" target="_blank">PostImage</a>
                    <a href="https://imgbb.com/" target="_blank">ImgBB</a>
                    <a href="https://jpg.church/" target="_blank">jpgChurch</a>
                </span>
            </div>`

        rightContent.innerHTML += /*html*/`
            <div class="edit-avatar">
                <span style="display: block; margin-bottom: 5px;">Avatar</span>
                <div class="input-bg-color"> 
                    <input type="text" id="avatar-img" name="avatar-img" class="text-box" placeholder="Link da imagem do avatar." value="${this.profileInfo.urlAvatar ? this.profileInfo.urlAvatar : ''}">
                    <label for="img-avatar" class="send-img-api">Upload</label>
                    <input type="file" name="img-avatar" id="img-avatar" class="img-avatar" accept="image/*" style="display: none;">
                </div>
            </div>`

        rightContent.innerHTML += /*html*/`
            <div class="edit-banner-img" style="margin-top: 10px;">
                <span style="display: block; margin-bottom: 5px;">Banner</span>
                <div class="input-bg-color"> 
                    <input type="text" id="banner-img" name="banner-img" class="text-box" placeholder="Link da imagem do banner." value="${this.profileInfo.urlBanner ? this.profileInfo.urlBanner : ''}">
                    <label for="img-banner" class="send-img-api">Upload</label>
                    <input type="file" name="img-banner" id="img-banner" class="img-banner" accept="image/*" style="display: none;">
                </div>
            </div>`

        rightContent.innerHTML += /*html*/`
            <div class="edit-banner-color" style="margin-top: 20px;">
                <div class="input-bg-color" style="display: flex; align-items: center; padding: 5px 10px;"> 
                    <span>Banner Cor de Fundo</span>
                    <input type="color" id="banner-color" name="banner-color" class="color-box" value="${this.profileInfo.bgBanner ? this.profileInfo.bgBanner : '#ffffff'}">
                    <!-- <input type="text" id="banner-color" name="banner-color" class="text-box" placeholder="Link da imagem do banner." value="${this.profileInfo.urlBanner ? this.profileInfo.urlBanner : ''}"> -->
                </div>
            </div>
            <div class="divisor"></div>`

        rightContent.innerHTML += /*html*/`
            <div class="edit-banner-img" style="margin-top: 10px;">
                <span style="display: block; margin-bottom: 5px;">Tema do Profile</span>
                <div class="status" style="column-gap: 8px;">
                    <label for="theme-style-default">
                        <input type="radio" name="theme-style-color" id="theme-style-default" class="theme-style-option" value="default" ${this.profileInfo.theme.style == "default"  ? 'checked' : ''}>
                        <div class="theme-style-button">Default</div>
                    </label>
                    <label for="theme-style-dark">
                        <input type="radio" name="theme-style-color" id="theme-style-dark" class="theme-style-option" value="dark" ${this.profileInfo.theme.style == "dark"  ? 'checked' : ''}>
                        <div class="theme-style-button">Dark</div>
                    </label>
                    <label for="theme-style-light">
                        <input type="radio" name="theme-style-color" id="theme-style-light" class="theme-style-option" value="light" ${this.profileInfo.theme.style == "light"  ? 'checked' : ''}>
                        <div class="theme-style-button">Light</div>
                    </label>
                </div>
            </div>`

        rightContent.innerHTML += /*html*/`
            <div class="edit-banner-img" style="margin-top: 10px;">
                <span style="display: block; margin-bottom: 5px;">Alterar Cor do Fundo do Profile</span>
                <div class="status" style="display: flex; align-items: flex-start; justify-content: center; flex-direction: row; padding: 5px 10px;"> 
                <span style="display: flex; align-items: center; justify-content: center; flex-direction: column; padding: 5px 10px;">
                    <input type="color" id="profile-bg-color-primary" name="profile-bg-color" class="color-box box-w" value="${this.profileInfo.theme.bgPrimary ? this.profileInfo.theme.bgPrimary : '#ffffff'}"> 
                    Cor Primária
                </span>           
                <span style="display: flex; align-items: center; justify-content: center; flex-direction: column; padding: 5px 10px;">
                    <input type="color" id="profile-bg-color-secondary" name="profile-bg-color" class="color-box box-w" value="${this.profileInfo.theme.bgSecondary ? this.profileInfo.theme.bgSecondary : '#ffffff'}"> 
                    Cor Realce
                </span>           
                </div>
            </div>`

        rightContent.innerHTML += /*html*/`
            <button class="edit-button">Salvar Mudanças</button>
        `

        return rightContent
    }

    breakLine = text => text.replace(/\n\r?/g, '<br>')
    breakLineReverse = text => text.replace(/<br\s*\/?>/ig, "\r\n")

    monthName(day, month, year) {
        const textMonth = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
        return `${month[0] == 0 && month < 10 ? textMonth[month[1]] : textMonth[month]} ${day < 10 ? day[0] != 0 ? '0' + day : day : day}, ${year}`
    }

    sendNewProfile() {
        const oldProfile = this.profileInfo
        const aboutMeText = this.breakLine(this.getElement('#about-me').value)
        const noteText = this.breakLine(this.getElement('#profile-note').value)
        const sinceProfile = this.monthName(this.getElement('#discord-since-day').value != "" ? this.getElement('#discord-since-day').value : "01", 
            this.getElement('#discord-since-month').value != "" ? (this.getElement('#discord-since-month').value - 1) : '00', 
            this.getElement('#discord-since-year').value != "" ? this.getElement('#discord-since-year').value : '2000')
        const changeProfile = {
            id: oldProfile.id,
            nickname: this.getElement('#profile-name').value != "" ? this.getElement('#profile-name').value : oldProfile.nickname,
            hash: this.getElement('#profile-hash').value != "" ? this.getElement('#profile-hash').value : oldProfile.hash,
            status: this.getElement('.select-status:checked').value != oldProfile.status ? this.getElement('.select-status:checked').value : oldProfile.status,
            boost: this.getElement('.nitro-option:checked').value != oldProfile.boost ? this.getElement('.nitro-option:checked').value == 0 ? false : true : oldProfile.boost == 0 ? false : true,
            boostMonth: this.getElement('.boost-option:checked').value != oldProfile.boostMonth ? this.getElement('.boost-option:checked').value : oldProfile.boostMonth,
            aboutMe: aboutMeText != oldProfile.aboutMe ? aboutMeText : oldProfile.aboutMe,
            sinceDiscord: sinceProfile != "" ? sinceProfile : oldProfile.sinceDiscord,
            note: noteText != oldProfile.note ? noteText : oldProfile.note,
            // playing: {
            //     game: "",
            //     time: "",
            //     icon: ""
            // },
            theme: {
                style: this.getElement('.theme-style-option:checked').value != "" ? this.getElement('.theme-style-option:checked').value : oldProfile.theme.style,
                bgPrimary: this.getElement('#profile-bg-color-primary').value != "" ? this.getElement('#profile-bg-color-primary').value : oldProfile.theme.bgPrimary,
                bgSecondary: this.getElement('#profile-bg-color-secondary').value != "" ? this.getElement('#profile-bg-color-secondary').value : oldProfile.theme.bgSecondary,
                bgAvatar: oldProfile.theme.bgAvatar
            },
            urlAvatar: this.getElement('#avatar-img').value != oldProfile.urlAvatar ? this.getElement('#avatar-img').value : oldProfile.urlAvatar,
            urlBanner: this.getElement('#banner-img').value != oldProfile.urlBanner ? this.getElement('#banner-img').value : oldProfile.urlBanner,
            bgBanner: this.getElement('#banner-color').value != "" ? this.getElement('#banner-color').value : oldProfile.bgBanner
        }

        /*--------------------------------------------------------------*/
        const newList = new Array()
        const storage = this.storageProfile.getStorageParse()
        storage.filter(e => e.id != this.session.getSession() ? newList.push(e) : newList.push(changeProfile))
        const newListStringify = JSON.stringify(newList)
        this.storageProfile.setNewData(newListStringify)
        document.body.innerHTML += `<alert-box text="Profile editado com sucesso. Atualizando a página..." type="sucess"></alert-box>`
        setTimeout(() => document.location.reload(), 1000);
        // document.location.reload()
        return

        // console.log('Old: ' + JSON.stringify(oldProfile) + ' - ' + 'New: ' + JSON.stringify(moldeProfile))
        
    }

}

window.customElements.define("edit-profile", EditProfile)