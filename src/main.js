import './scss/main.scss'
import Router from 'vanilla-router'
import HomeView from './views/homeView'
import SelectProfileView from './views/selectProfileView'
import ProfileServerView from './views/ProfileServerView'
import EditProfileView from './views/EditProfileView'
import EditServerView from './views/EditServerView'
import NewServerView from './views/NewServerView'
import LocalSession from './modules/LocalSession'

const profileServer = new ProfileServerView()
const editProfile = new EditProfileView()
const editServer = new EditServerView()
const newServer = new NewServerView()

const router = new Router({
    mode: 'history',
    page404: function (path) {
        console.log('"/' + path + '" Page not found');
    }
})

const session = new LocalSession('profileSelected')

router.add('', function () {
    if(session.verify()) {
        document.querySelector('#app').innerHTML = HomeView
    } else {
        router.navigateTo('select-profile')
    }
    console.log('/')
})
    .add('select-profile', function () {
        document.querySelector('#app').innerHTML = SelectProfileView
        console.log('Select Profile')
    })
    .add('edit-profile', function () {
        document.querySelector('#app').innerHTML = editProfile.build()
        console.log('Edit Profile')
    })
    .add('profile/{id}', function (id) {
        document.querySelector('#app').innerHTML = profileServer.build(id)
        console.log('Profile')
    })
    .add('new-server', function (id) {
        document.querySelector('#app').innerHTML = newServer.build()
        console.log('New Server')
    })
    .add('edit-server/{id}', function (id) {
        document.querySelector('#app').innerHTML = editServer.build(id)
        console.log('Edit Server')
    })
    .check()
    .addUriListener()