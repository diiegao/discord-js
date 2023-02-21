import '../components/Home/HomeSideBar'
import '../components/AlertBox/AlertBox'

const template = /*html*/`
    <side-bar></side-bar>
    <div class="main-content" style="justify-content: flex-start; align-items: flex-start;">
        <h1>Aprenda como usar o Discord Profile</h1>
        <div  style="width: 100%; display: flex; justify-content: center; align-items: center;">
            <iframe width="800" height="500" src="https://www.youtube.com/embed/2AkI6kdIvN8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
    </div>
`

const teste = twemoji.parse(template, { folder: 'svg', ext: '.svg' })

export default teste