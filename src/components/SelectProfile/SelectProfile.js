import './SelectProfileBox'
import LocalStorageBd from '../../modules/LocalStorageBd'
import '../../components/AlertBox/AlertBox'

class SelectProfile extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        this.build()
    }

    build() {
        this.storageProfile = new LocalStorageBd('localProfileList')

        this.shadow.appendChild(this.style())
        this.shadow.innerHTML += this.selectProfile()
        this.shadow.addEventListener('click', function (e) {

            if(e.target.classList.contains("create-profile")) {
                this.createNewProfile()
            }       

        }.bind(this))
    }

    style() {
        const style = document.createElement('style')
        style.textContent = /*css*/`
            :host {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                max-width: 840px;
                flex-wrap: wrap;
            }

            :host::-webkit-scrollbar {
                width: 2px;
            }
            
            :host::-webkit-scrollbar-track {
                box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            }
            
            :host::-webkit-scrollbar-thumb {
                background-color: #363940;
                outline: 1px solid #363940;
            }

            .create-new-profile {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                min-width: 200px;
                max-height: 163.39px;
                margin: 5px;
                background-color: #2a2b2f;
                border: 1px solid #363940;
                border-radius: 5px;
                box-sizing: border-box;
                margin-bottom: 10px;
                padding-top: 10px;
                margin-top: 10px;
            }

            .create-new-profile:hover {
                background-color: #363940;
                cursor: pointer;
            }

            .create-new-profile:hover .icon-circle {
                border: 1px solid #2a2b2f;
            }

            .create-new-profile-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                margin-bottom: 10px;
                margin-top: 10px;
                padding-top: 10px;
            }

            .icon-circle {
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                border: 1px solid #363940;
                font-size: 80px;
                width: 80px;
                height: 80px;
            }

            .create-new-profile-text {
                font-family: "whitneybold","Helvetica Neue",Helvetica,Arial,sans-serif;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 15px 0 10px 0;
            }
        `
        return style
    }

    selectProfile() {
        const profileList = this.storageProfile.getStorageParse()
        
        // if(!this.storageProfile.verify()) {
        //     this.storageProfile.setNewData("[]") 
        //     document.location.reload()
        // }

        let htmlProfile = ''

        profileList.forEach(e => {
            const imgAvatar = e.urlAvatar ? e.urlAvatar : "/images/942.png"
            htmlProfile += /*html*/`
            <profile-box avatar="${imgAvatar}" name="${e.nickname}" profile-id="${e.id}"></profile-box>
            `
        });
        
        htmlProfile += /*html*/`
            <div class="create-profile create-new-profile">
                <div class="create-profile create-new-profile-icon">
                    <div class="create-profile icon-circle">+</div>
                    <div class="create-profile create-new-profile-text">Criar Novo Profile</div>
                </div>
            </div>
        `

        return htmlProfile
    }

    monthName(day, month, year) {
        const textMonth = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
        return `${textMonth[month]} ${day}, ${year}`
    }

    generateId(range) {
        const newId = this.storageProfile.generateNewID(range)
        const filter = this.storageProfile.filterID(this.storageProfile.getStorageParse(), newId) != '' ? this.generateId(range) : newId
        return filter
    }

    createNewProfile() {
        const newProfileId = this.generateId(100)
        const profileList = this.storageProfile.getStorageParse()
        const newProfile = {
            id: newProfileId,
            nickname: "Novo Profile",
            hash: "0001",
            status: 1,
            boost: false,
            boostMonth: 0,
            sinceDiscord: this.monthName("01", 0, 2000),
            theme: {
                style: "default",
                bgPrimary: "#000000",
                bgSecondary: "#000000"
            },
        }
        
        const newProfileList = new Array()
        profileList.forEach(e => {
            newProfileList.push(e)
        })
        newProfileList.push(newProfile)

        const stringifyProfileList = JSON.stringify(newProfileList)
        this.storageProfile.setNewData(stringifyProfileList)
        document.body.innerHTML += `<alert-box text="Profile criado com sucesso. Atualizando a página..." type="sucess"></alert-box>`
        setTimeout(() => document.location.reload(), 1000);
        // document.location.reload()
        
        console.log('Create New Profile')
        return 
    }

}

window.customElements.define("select-profile", SelectProfile)