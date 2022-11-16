class LocalSession {
    constructor(session) {
        this.sessionName = session
    }

    verify() {
        const lclSession = sessionStorage.getItem(this.sessionName) ? true : false
        return lclSession
    }

    getSession() {
        if(this.verify()) {
            const lclSession = sessionStorage.getItem(this.sessionName)
            return lclSession
        } else {
            console.log('falha getitem' + this.sessionName)
        }    
    }

    setSession(id) {
        const session = sessionStorage.setItem(this.sessionName, id)
        // return session
    }
}

export default LocalSession