class LocalStorageBd {

    constructor(storageName) {
        this.storageName = storageName
    }

    verify = () => localStorage.getItem(this.storageName)

    getStorageParse() {
        if(this.verify(this.storageName)) return JSON.parse(localStorage.getItem(this.storageName))
        
        this.setNewData("[]")
        console.log('falha getitem' + this.storageName)
        document.location.reload()
        
    }

    // getById(id) {
    //     if(this.verify(this.storageName)) {
    //         const list = this.getStorageParse()
    //         const cb = (acc, cur) => {
    //             acc[cur.id] = cur
    //             return acc
    //         }
    //         const initial = {}
    //         const result = list.reduce(cb, initial)
    //         return result[id]
    //     } else {
    //         this.setNewData("[]")
    //         document.location.reload()
    //         console.log('falha getById' + this.storageName)
    //     }
    // }

    // getById(id) {
    //     if(this.verify(this.storageName)) {
    //         const list = this.getStorageParse()

    //         const result = list.reduce((acc, value) => {
    //             if(value.id === Number(id)) acc = value
    //             return acc
    //         })
    //     }
    // }

    getById(id) {
        if(this.verify(this.storageName)) {
            const list = this.getStorageParse()
            const result = this.filterID(list, Number(id))
            return result[0]
        }
    }

    filterID = (arr, value) => arr.filter(e => e.id === value)

    generateNewID = range => parseInt(Math.floor((Math.random() * range)))

    setNewData = data => localStorage.setItem(this.storageName, data)
}

export default LocalStorageBd