import LocalStorageBd from "../../modules/LocalStorageBd"

class ProfileRoles extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        this.build()
    }

    build() {   
        this.server = new LocalStorageBd("localServerList")
        this.serverById = this.server.getById(this.getAttribute("server"))
        this.getTheme = this.getAttribute("theme")
        
        this.shadow.appendChild(this.style())
        this.roles()
        // this.shadow.innerHTML += this.serverById.name
    }

    style() {
        const style = document.createElement('style')
        style.textContent = /*css*/`
            :host {
                display: flex;
                flex-wrap: wrap;
            }

            .role {
                font-family: ${this.getTheme == 'light' ? '"whitneymedium","Helvetica Neue",Helvetica,Arial,sans-serif' : '"whitneylight","whitneymedium","Helvetica Neue",Helvetica,Arial,sans-serif'};
                display: flex;
                justify-content: center;
                align-items: center;
                height: 22px;
                margin: 0 4px 4px 0;
                padding: 4px;
                font-size: 12px;
                font-weight: 500;
                background-color: ${this.getTheme == 'light' ? '#ffffff80' : '#292b2f80'};
                `

                if(this.getTheme == "default" || this.getTheme == undefined) {
                style.textContent += /*css*/`
                border: none;
                `
                } else {
                style.textContent += /*css*/`
                border: 1px solid ${this.getTheme == 'light' ? '#292b2f33' : '#ffffff33'};
                `
                }

            style.textContent += /*css*/`
                border-radius: 4px;
                box-sizing: border-box;
            }

            .role-color {
                width: 12px;
                height: 12px;
                padding: 0;
                margin: 0 4px;
                border-radius: 50%;
            }

            .icon-img {
                display: inline-block;
                object-fit: contain;
                margin-right: 4px;
            }

            .role-name {
                max-width: 200px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                margin-right: 4px;
            }
        `
        return style
    }

    roles() {
        const getRoles = this.serverById.roles
        getRoles.forEach(e => {
            let roleText = /*html*/`
                <div class="role">
                <span class="role-color" style="background-color: ${e.color};"></span>
            `
            if(e.icon != '') {
                e.icon.forEach(i => {
                    const icon = i.trim()
                    roleText += `<img src="${icon}" class="icon-img" width="16" height="16">`
                })
            }

            roleText += `<div class="role-name">${e.name}</div>`

            this.shadow.innerHTML += roleText
        })
    }

}

window.customElements.define("profile-roles", ProfileRoles)