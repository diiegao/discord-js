
class AlertBox extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        this.build()
        setTimeout(() => this.remove(), 5000);
    }

    build() {   
        this.alertText = this.getAttribute('text')
        this.alertType = this.getAttribute('type')

        this.shadow.appendChild(this.style())
        this.shadow.appendChild(this.alert())
    }

    style() {
        const style = document.createElement('style')
        style.textContent = /*css*/`
            :host {
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                position: fixed;
                right: 0;
                bottom: 0;
                z-index: 9999;
                min-width: 250px;
                max-width: 250px;
                margin: 10px;
            }

            .alert-box {
                width: 100%;
                padding: 10px 10px;
                font-weight: bold;
            }

            .sucess {
                color: #1d380e;
                background-color: #9ee37d;
                border: 1px solid #63c132;
            }

            .error {
                color: #fff;
                background-color: #EF5350;
                border: 1px solid #c62828;
            }
        `
        return style
    }

    alert() {
        const alert = document.createElement('div')
        alert.setAttribute('class', `alert-box ${this.alertType == "sucess" ? 'sucess' : 'error'}`)
        alert.innerHTML = this.alertText
        return alert
    }

}

window.customElements.define("alert-box", AlertBox)