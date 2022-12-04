import LocalSession from "../../modules/LocalSession"
import LocalStorageBd from "../../modules/LocalStorageBd"
import Theme from "../../modules/Theme"
import './ProfileRoles'

class ProfileContent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        this.build()
    }

    build() {  
        this.session = new LocalSession('profileSelected')
        this.storage = new LocalStorageBd('localProfileList')
        this.profileById = this.storage.getById(this.session.getSession())
        this.server = new LocalStorageBd('localServerList')
        this.serverById = this.server.getById(this.getAttribute('id'))
        // console.log('ProfileContent:' + this.profileById.nickname)
        // console.log('ProfileContent:' + JSON.stringify(this.serverById.roles))
        
        this.shadow.appendChild(this.style())
        this.shadow.appendChild(this.nameHash())
        this.shadow.appendChild(this.divider())
        this.profileById.aboutMe ? this.shadow.appendChild(this.aboutMe()) : ''
        this.shadow.appendChild(this.sinceBy())
        this.shadow.appendChild(this.profileRoles())
        this.shadow.appendChild(this.profileNotes())
    }

    style() {
        const style = document.createElement('style')
        style.textContent = /*css*/`
            :host {
                display: flex;
                max-height: calc(100vh - 128px);
                margin: ${this.profileById.urlBanner != undefined ? '63px' : '58px'} 16px 16px;
                position: relative;
                background-color: ${Theme.bgTeste(Theme.nitro, this.profileById.theme.style)};
                color: ${this.profileById.theme.style == 'light' ? '#060606' : '#ffffff'};
                border-radius: 8px;
                flex-direction: column;
                overflow: hidden;
            }

            .profile-name {
                /*font-family: "whitneybold","Helvetica Neue",Helvetica,Arial,sans-serif;*/
                font-family: var(--font-primary);
                font-weight: 600;
                font-size: 20px;
                line-height: 24px;
                word-break: break-word;
                white-space: normal;
                padding: 12px 12px 0;
            }

            .profile-hash {
                font-weight: 600;
                color: ${this.profileById.theme.style == 'light' ? '#575758' : '#b9bbbe'};
            }

            .divider {
                margin: 12px 12px 0;
                height: 1px;
                position: sticky;
                top: 0;
                background-color: ${this.profileById.theme.style == 'light' ? '#0000003d' : '#ffffff3d'};
            }
            
            h2 {
                display: flex;
                /*font-family: "whitneybold","Helvetica Neue",Helvetica,Arial,sans-serif;*/
                font-family: var(--font-primary);
                font-size: 12px;
                line-height: 16px;
                font-weight: 700;
                text-transform: uppercase;
                margin-bottom: 6px;
            }

            .since-by,
            .about-me{
                padding: 0 12px 0 12px;
            }

            .about-me-content {
                font-family: var(--font-primary);
                /*font-family: ${this.profileById.theme.style == 'light' ? '"whitneymedium","Helvetica Neue",Helvetica,Arial,sans-serif' : '"whitneylight","whitneymedium","Helvetica Neue",Helvetica,Arial,sans-serif'};*/
                font-size: 14px;
                line-height: 18px;
                font-weight: 400;
                color: ${this.profileById.theme.style == 'light' ? '#333333' : '#dcddde'};
            }

            .profile-date {
                display: flex;
                flex-direction: row;
                align-items: center;
                column-gap: 8px;
            }

            .profile-date > .discord-icon {
                width: 16px;
                height: 16px;
                color: ${this.profileById.theme.style == 'light' ? '#575758' : '#b9bbbe'};
            }

            .profile-date > .profile-since {
                /*font-family: "whitneymedium","Helvetica Neue",Helvetica,Arial,sans-serif;*/
                font-family: var(--font-primary);
                font-size: 14px;
                line-height: 18px;
                color: ${this.profileById.theme.style == 'light' ? '#333333' : '#dcddde'};
            }

            .profile-date > .server-icon {
                width: 16px;
                height: 16px;
                background-image: url(${this.serverById.icon ? this.serverById.icon : '/images/nitro/none-2.svg'});
                background-clip: padding-box;
                background-color: none;
                background-position: 50%;
                background-size: 100% 100%;
                border-radius: 50%;
            }

            .dot-divider {
                height: 4px;
                width: 4px;
                border-radius: 50%;
                background-color: #4f545c;
            }

            .profile-roles {
                padding: 0 12px 0 12px;
            }

            .profile-notes {
                padding: 0 12px 12px 12px;
            }

            .text-box {

            }

            .note-text {
                /*font-family: ${this.profileById.theme.style == 'light' ? '"whitneymedium","Helvetica Neue",Helvetica,Arial,sans-serif' : '"whitneylight","whitneymedium","Helvetica Neue",Helvetica,Arial,sans-serif'};*/
                font-family: var(--font-primary);
                width: 100%;
                height: 36px;
                max-height: 88px;
                background-color: transparent;
                border: none;
                border-radius: 3px;
                color: ${this.profileById.theme.style == 'light' ? '#333333' : '#dddddd'};
                font-size: 12px;
                line-height: 14px;
                padding: 4px;
                resize: none;
                box-sizing: border-box;
                transition: border-color .2s ease-in-out;
            }
            .note-text::placeholder {
                color: ${this.profileById.theme.style == 'light' ? '#333333' : '#dddddd'};
            }

            .note-text:focus::placeholder {
                color: transparent;
            }

            .note-text:focus {
                background-color: ${Theme.bgTeste(Theme.notes, this.profileById.theme.style)};
                border-color: #797a7b;
            }

            .note-text:focus-visible {
                outline: 0;
            }

            img.emoji {
                width: 19px;
                height: 19px;
            }

        `
        return style
    }

    nameHash() {
        const profileName = document.createElement('div')
        profileName.setAttribute('class', 'profile-name')
        profileName.textContent = this.profileById.nickname
        const profileHash = document.createElement('span')
        profileHash.setAttribute('class', 'profile-hash')
        profileHash.textContent = `#${this.profileById.hash}`
        profileName.appendChild(profileHash)

        return profileName
    }

    divider() {
        const divider = document.createElement('div')
        divider.setAttribute('class', 'divider')
        return divider
    }

    aboutMe() {
        const about = document.createElement('div')
        about.setAttribute('class', 'about-me')
        const text = document.createElement('h2')
        text.textContent = 'SOBRE MIM'
        about.appendChild(text)
        about.appendChild(this.aboutMeContent())
        return about
    }

    aboutMeContent() {
        const aboutContent = document.createElement('div')
        aboutContent.setAttribute('class', 'about-me-content')
        aboutContent.innerHTML = this.profileById.aboutMe
        const contentEmoji = twemoji.parse(aboutContent,{folder: 'svg', ext: '.svg'})
        return contentEmoji
    }

    sinceBy() {
        const sinceBy = document.createElement('div')
        sinceBy.setAttribute('class', 'since-by')
        const text = document.createElement('h2')
        text.textContent = 'MEMBRO DESDE'
        sinceBy.appendChild(text)
        sinceBy.appendChild(this.profileDate())
        return sinceBy
    }
    
    profileDate() {
        const profileDate = document.createElement('div')
        profileDate.setAttribute('class', 'profile-date')

        const discordIcon = /*html*/`
            <svg aria-label="Discord" class="discord-icon" aria-hidden="false" role="img" width="28" height="20" viewBox="0 0 28 20">
                <path fill="currentColor" d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0.00546311C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 19.9945C22.6677 19.2689 24.8929 18.1364 26.8828 16.6466H26.8893C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6543 10.994C20.6543 12.4453 19.6184 13.6383 18.3161 13.6383Z"></path>
            </svg>`
        profileDate.innerHTML += discordIcon

        const profileSince = document.createElement('div')
        profileSince.setAttribute('class', 'profile-since')
        profileSince.textContent = this.profileById.sinceDiscord ? this.profileById.sinceDiscord : 'jan 01, 2000'
        profileDate.appendChild(profileSince)

        const dotDivider = document.createElement('div')
        dotDivider.setAttribute('class', 'dot-divider')
        profileDate.appendChild(dotDivider)

        const serverIcon = document.createElement('div')
        serverIcon.setAttribute('class', 'server-icon')
        profileDate.appendChild(serverIcon)

        const serverSince = document.createElement('div')
        serverSince.setAttribute('class', 'profile-since')
        serverSince.textContent = this.serverById.since ? this.serverById.since : 'jan 01, 2000'
        profileDate.appendChild(serverSince)

        return profileDate
    }

    profileRoles() {
        const profileRoles = document.createElement('div')
        profileRoles.setAttribute('class', 'profile-roles')
        const text = document.createElement('h2')
        text.textContent = 'CARGOS'
        profileRoles.appendChild(text)
        profileRoles.innerHTML += /*html*/`<profile-roles server="${this.getAttribute("id")}" theme="${this.profileById.theme.style}"></profile-roles>`
        return profileRoles
    }

    profileNotes() {
        const notes = document.createElement('div')
        notes.setAttribute('class', 'profile-notes')

        const text = document.createElement('h2')
        text.textContent = 'NOTA'
        notes.appendChild(text)

        const textBox = document.createElement('div')
        textBox.setAttribute('class', 'text-box')
        notes.appendChild(textBox)

        const textArea = document.createElement('textarea')
        textArea.setAttribute('class', 'note-text')
        textArea.setAttribute('placeholder', 'Clique para adicionar uma nota')
        textArea.innerHTML = this.profileById.note ? this.profileById.note : ''
        textBox.appendChild(textArea)

        const textEmoji = twemoji.parse(notes, {folder: 'svg', ext: '.svg'})
        return textEmoji
    }
}

window.customElements.define("profile-content", ProfileContent)