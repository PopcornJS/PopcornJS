class ParentComponent extends Popcorn{
    render(){
        let list = "";
        for(let i=0; i<this.state.data.length; i++){
            list += `<li>${this.state.data[i]}</li>`
        }
        return(
            `
            ${new ChildComponent(this.state).createDOM()}
            <ul>
                ${list}
            </ul>
            `
        )
    }
}