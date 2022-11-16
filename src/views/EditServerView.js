import '../components/Home/HomeSideBar'
import '../components/EditServer/EditServer'

class EditServerView {
    constructor(){}

    build(id) {
        const template = /*html*/`
            <side-bar></side-bar>
            <div class="main-content">
                <edit-server server-id="${id}"></edit-server>
            </div>
        `

        return template
    }
}

export default EditServerView