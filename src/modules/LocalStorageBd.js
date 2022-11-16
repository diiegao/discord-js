class LocalStorageBd {

    constructor(storageName) {
        this.storageName = storageName
    }

    verify = () => localStorage.getItem(this.storageName) ? true : false

    getStorageParse() {
        if(this.verify(this.storageName)) {
            return JSON.parse(localStorage.getItem(this.storageName))
        } else {
            console.log('falha getitem' + this.storageName)
        }
    }

    getById(id) {
        if(this.verify(this.storageName)) {
            const list = this.getStorageParse()
            const cb = (acc, cur) => {
                acc[cur.id] = cur
                return acc
            }
            const initial = {}
            const result = list.reduce(cb, initial)
            return result[id]
        } else {
            console.log('falha getById' + this.storageName)
        }
    }

    filterID = (arr, value) => arr.filter(e => e.id === value)

    generateNewID = range => parseInt(Math.floor((Math.random() * range)))

    setNewData = data => localStorage.setItem(this.storageName, data)
}

export default LocalStorageBd