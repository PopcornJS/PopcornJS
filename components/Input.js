class Input extends Popcorn{
    loadCSS(){
        return {
            ".input": {
                "font-size": "30px",
                "border-color": "white"
            }
        }
    }

    loadKernel(){
        return {
            inputFn: (text) => {
                console.log(text);
            },
        }
    }
    
    render(){
        
        return `<input class='${this.classes.input}' oninput="kernel.inputFn(this.value)">`
    }
}