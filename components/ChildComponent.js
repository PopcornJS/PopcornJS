class ChildComponent extends Popcorn{
    render(){
        return(
            `
            <p>Hello ${this.state.message}</p>
            `
        )
    }
}