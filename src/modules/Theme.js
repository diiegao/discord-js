const Theme = {

    alpha: [
        {style: "dark", color: "#00000099"},
        {style: "light", color: "#ffffff99"},
        {style: "default", color: "#2c2c2c"},
    ],

    nitro: [
        {style: "dark", color: "#00000073"},
        {style: "light", color: "#ffffff73"},
        {style: "default", color: "#1a1a1a"},
    ],
    
    notes: [
        {style: "dark", color: "#0000004D"},
        {style: "light", color: "#ffffff4D"},
        {style: "default", color: "#1a1a1a"},
    ],

    bgTeste(theme, type) {
        let result = ''
        theme.forEach(element => {
            if(element.style == type) result = element.color
        })
        return result
    }

}

export default Theme