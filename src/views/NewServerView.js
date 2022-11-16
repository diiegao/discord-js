import '../components/Home/HomeSideBar'
import '../components/NewServer/NewServer'

class NewServerView {
    constructor(){}

    build() {
        const template = /*html*/`
            <side-bar></side-bar>
            <div class="main-content">
                <new-server></new-server>
            </div>
        `

        return template
    }
}

export default NewServerView