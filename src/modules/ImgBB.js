class ImgBB {
    constructor() {}

    setNewForm(image, name = undefined) {
        const data = new FormData()
        data.append('key', 'e7f269fa87b18cfa82fa5122fe7e6647')
        data.append('image', image)
        data.append('expiration', 15552000)
        if(name) data.append('name', name)
        return data
    }

    async sendImgToHost(data) {
        try {
            const response = await fetch('https://api.imgbb.com/1/upload', {
                method: "POST",
                body: data
            })
            const resp = await response.json()
            return {status: resp.status, url: resp.data.url, delete_url: resp.data.delete_url}
        } catch(e) {
            console.log(e)
            return e
        }
    }

    async generateLinkImg(image, name = undefined) {
        const data = this.setNewForm(image, name)
        const response = await this.sendImgToHost(data)
        if (response.status === 200) return response.url
        return 'error...'
    }
}

export default ImgBB