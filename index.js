class Popcorn{
    constructor(DOMWrapper=false, initialState = {}){
        this.DOMWrapper = DOMWrapper;
        this.DOMTrackers = {};
        if(typeof DOMWrapper === 'object' || DOMWrapper === false)
            initialState = DOMWrapper
        this.state = initialState;

        /**
         * Triggers the willBeRendered function
         * right before rendering is to take place
         */
        if(this.willBeRendered)
            this.willBeRendered();

        /**
         * Checks if the render() method exists
         */
        if(this.render)
            this.Render = this.render();
        else
            throw "Fatal: Every component needs to have a render method";

        /**
         * Checks if the render() method returns anything useful or at all
         */
        if(this.Render){
            this.createDOM();
        }else throw "Fatal: Every render needs to return an interface";
        
        /**
         * Triggers the hasRendered() method if found
         */
        if(this.hasRendered)
            this.hasRendered();
    }

    createDOM(){
        let toRender = `<popcornDOM>${this.Render}</popcornDOM>`;

        if(typeof this.DOMWrapper === 'object' || this.DOMWrapper === false){
            return toRender;
        }else{
            let DOMs = document.querySelectorAll(this.DOMWrapper);
            for(let i=0; i<DOMs.length; i++){
                DOMs[i].innerHTML = toRender;
            }   
        }
    }

    initiateState(states){
        /**
         * This method only allow state creation when states are empty
         */
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

        /**
         * To rerender after setState
         */
        this.Render = this.render();
        this.createDOM();
    }
}