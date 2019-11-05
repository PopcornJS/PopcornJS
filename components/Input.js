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
            inputFn: (e) => {
                this.thisInput = e.value;
                console.log(this.thisInput);
            },
        }
    }
    
    render(){
        return `<input class='${this.classes.input}' oninput="${this.kernels.inputFn('this')}">`
    }
}