import '../components/Home/HomeSideBar'
import '../components/EditProfile/EditProfile'

class EditProfileView {
    constructor(){}

    build() {
        const template = /*html*/`
            <side-bar></side-bar>
            <div class="main-content">
                <edit-profile></edit-profile>
            </div>
        `

        return template
    }
}

export default EditProfileView