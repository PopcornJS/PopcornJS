class Popcorn {
    constructor(DOMWrapper = false, initialState = {}) {
        this.DOMWrapper = DOMWrapper;
        this.DOMTrackers = {};
        if (typeof DOMWrapper === 'object' || DOMWrapper === false)
            initialState = DOMWrapper
        this.state = initialState;
        this.classes = {};
        this.kernels = {};

        /**
         * Load CSS from JSON Function
         */
        this.LoadCSSJSON = function(cssjson){

            /**
             * Parse JSON into CSS
             */
            var styleStr = "";
            for (var i in cssjson) {
                /** Appending class names with token for uniqueness */
                let generated = i+"_"+Math.random().toString(36).substr(2);
                /** Populate this.classes for usage */
                this.classes[i.split('.').join("")] = generated.split('.').join("");

                /** Begin populating style block */
                styleStr += generated + " {\n"
                for (var j in cssjson[i]) {
                    /**
                     * Allow for inherit methods.
                     * CSS of another class can be inherited to the next
                     * Example:
                     *  ".class": {
                     *      "INHERIT":".class-to-inherit",
                     *  }
                     */
                    if (j == "INHERIT") {
                        for (var k in cssjson[cssjson[i][j]]) {
                            styleStr += "\t" + k + ":" + cssjson[cssjson[i][j]][k] + ";\n"
                        }
                    } else {
                        styleStr += "\t" + j + ":" + cssjson[i][j] + ";\n"
                    }
                }
                styleStr += "}\n"
            }
    
            /**
             * Pump CSS to header in Style block
             */
            var element = document.createElement('style');
            element.setAttribute('type', 'text/css');
    
            if ('textContent' in element) {
                element.textContent = styleStr;
            } else {
                element.styleSheet.cssText = styleStr;
            }
    
            document.getElementsByTagName('head')[0].appendChild(element);
        }

        /**
         * Load Kernels function
         */
        this.LoadKernelToWindow = function(kernel){
            if (!window.kernel)
                window.kernel = {};

            window.kernel = {
                ...window.kernel,
                ...kernel
            }
        }

        /**
         * Triggers the willBeRendered function
         * right before rendering is to take place
         */
        if (this.willBeRendered)
            this.willBeRendered();

        /**
         * If loadCSS exist, load the CSS
         */
        if(this.loadCSS)
            this.LoadCSSJSON(this.loadCSS());
        
        /**
         * If loadKernel exist, load the kernels into window
         */
        if(this.loadKernel){
            let kernels = this.loadKernel();
            let newKernels = {};
            for(var k in kernels){ 
                let token = k+"_"+Math.random().toString(36).substr(2);
                newKernels[token] = kernels[k];

                this.kernels[k] = function() {
                    let params = "(";
                    for (var i = 0; i < arguments.length; i++) {
                        if(i !== 0){
                            $params += ',';
                        }
                        params += arguments[i];
                    }
                    params += ")";
                    return "window.kernel."+token+params;
                }
            }
            this.LoadKernelToWindow(newKernels);
        }

        /**
         * Checks if the render() method exists
         */
        if (this.render)
            this.Render = this.render();
        else
            throw "Fatal: Every component needs to have a render method";

        /**
         * Checks if the render() method returns anything useful or at all
         */
        if (this.Render) {
            this.createDOM();
        } else throw "Fatal: Every render needs to return an interface";

        /**
         * Triggers the hasRendered() method if found
         */
        if (this.hasRendered)
            this.hasRendered();
    }

    createDOM() {
        let classes = this.classes;
        let toRender = `<popcornDOM>${this.Render}</popcornDOM>`;

        if (typeof this.DOMWrapper === 'object' || this.DOMWrapper === false) {
            return toRender;
        } else {
            let DOMs = document.querySelectorAll(this.DOMWrapper);
            for (let i = 0; i < DOMs.length; i++) {
                DOMs[i].innerHTML = toRender;
            }
        }
    }

    initiateState(states) {
        /**
         * This method only allow state creation when states are empty
         */
        let isEmpty = true;
        for (var prop in this.state) {
            if (this.state.hasOwnProperty(prop)) {
                isEmpty = false;
                break;
            }
        }

        if (isEmpty) {
            this.state = {
                ...states
            }
        }
    }

    setState(states) {
        for (var prop in states) {
            this.state[prop] = states[prop];
        }
        /**
         * To rerender after setState
         */
        if (this.willRerender)
            this.willRerender();

        this.Render = this.render();
        this.createDOM();

        if (this.hasRerendered)
            this.hasRerendered();
    }
}