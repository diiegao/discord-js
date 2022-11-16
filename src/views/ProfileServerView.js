import '../components/Home/HomeSideBar'
import '../components/ProfileServer/ProfileServer'
import '../components/ProfileServer/ManagerServer'

class ProfileServerView {
    constructor(){}

    build(id) {
        const template = /*html*/`
            <side-bar></side-bar>
            <div class="main-content">
                <manager-server profile-id="${id}"></manager-server>
                <profile-server profile-id="${id}"></profile-server>
            </div>
        `

        return template
    }
}

export default ProfileServerView