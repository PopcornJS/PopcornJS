class Popcorn{
    constructor(DOMWrapper, initialState = {}){
        this.DOMWrapper = DOMWrapper;
        this.DOMTrackers = {};
        this.state = initialState;

        this.Render = this.render();
        this.createDOM();
    }

    createDOM(){
        let toRender = `<popcornDOM>${this.Render}</popcornDOM>`;

        let DOMs = document.querySelectorAll(this.DOMWrapper);
        for(let i=0; i<DOMs.length; i++){
            DOMs[i].innerHTML = toRender;
        }

        if(this.hasRendered)
            this.hasRendered();
    }


    initiateState(states){
        let isEmpty = true;
        for(var prop in this.state) {
            if(this.state.hasOwnProperty(prop)) {
                isEmpty = false;
                break;
            }
        }

        if(isEmpty){
            this.state = {
                ...states
            }
        }
    }

    setState(states){
        for(var prop in states) {
            this.state[prop] = states[prop];
        }
        this.Render = this.render();
        
        this.createDOM();
    }

    render(){
        console.log("Render not found");
    }
}