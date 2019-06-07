# PopcornJS

PopcornJS is a mini JavaScript library that is aimed at tackling lightweight reactive UI components. How will you benefit from PopcornJS? Imagine all the big libraries or frameworks out there running on webpacks, with NodeJS services running on the backend; would you really need those for a simple application? Or, would you really like to rewrite your entire application's frontend just for some added features?

Guess not, hence you stumble upon this library.

### Introduction

Let's get started. How do you use PopcornJS? Simple.

1. Download the zip of this git. Extract it.
2. Get index.js into your project.
3. Get popping.

## Creating a component

#### Firstly, create a simple Popcorn component
```javascript
class ExampleComponent extends Popcorn{
    render(){
        return(
            `
            <p>Hello ${this.state.message}</p>
            `
        )
    }
}
```

#### Next, get it into your `<script>`
```html
<html>
  <body>
    <div class="content"></div>
    
    <script>
      let input = new ExampleComponent('.content');
    </script>
  </body>
</html>
```
Your component is now ready and rendered into your HTML page.

#### That's it. Yeah, yeah I know. This shouldn't be just it. There's more. Keep reading.

## Functions? Events? How??

If you want to get event-triggered functions, it will be slightly different from the usual convention. You would need to use kernels. A popcorn's prior state is a kernel... get it? So first off, get your kernel ready, before you can start popping.

#### Loading Kernels
```javascript
class Input extends Popcorn{
    loadKernel(){
        return {
            inputFn: (text) => {
                console.log(text);
            },
        }
    }
    
    render(){
        return `<input oninput="kernel.inputFn(this.value)">`
    }
}
```
Load up the `loadKernel` method, and return object-based functions with it. Take note how the oninput is written to include the kernels. Now it's ready. Give it a try yourself.

## What? We have states?
Yes! Else how would it be reactive?

#### Initialise a component's state(s)
You can choose to, or not to. Entirely up to you, really. Do so if you need initial states for some magic.
```javascript
let exampleComponent = new ExampleComponent('.content',{
    message: 'Hello World',
    data: ['This', 'Is', 'PopcornJS']
});
```

#### Accessing states
Really simple. Everything is in `this.state`.
```javascript
class ExampleComponent extends Popcorn{
    render(){
        let dataStr;
        for(var i=0; i<this.state.data.length; i++){
            dataStr += `${this.state.data[i]} `
        }
        return(
            `
            <p>Hello ${this.state.message}</p>
            <p>${dataStr}</p>
            `
        )
    }
}
```

#### Setting states
```javascript
exampleComponent.setState({
    message: "Bye World",
    data: ['I', 'Shall', 'Sleep']
})
```

## Multi-tiered Components
What if you need components, within a component? Just get it in, what else?

Things to take note:
- The `createDOM()` method
- Passing states to child

#### Parrent Component:
```javascript
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
```
Take note on how you can pass the states to the child component(s).

#### Child Component:
```javascript
class ChildComponent extends Popcorn{
    render(){
        return(
            `
            <p>Hello ${this.state.message}</p>
            `
        )
    }
}
```

## Loading Unique CSS?
Ever find the usefulness of compartmentalised JS? To keep it completely separated from each other, that is.
To do so, we should also split our CSS and contain them to its own components, or not. It is entirely up to you really.

### LoadCSS()
Things to take note:
- `this.classes` is used to assign class names to each element
- `loadCSS()` method, and how it is written in JSON.

```javascript
class Input extends Popcorn{
    loadCSS(){
        return {
            ".input": {
                "font-size": "30px",
                "border-color": "white"
            }
        }
    }
    
    render(){
        return `<input class='${this.classes.input}'>`
    }
}
```

## Popcorn Listeners
At times you may want to trigger some actions on component load status. These are built in and is as such:
- `willBeRendered()` (Fired just as the component is ready to load the UI)
- `hasRendered()` (Fired after UI is pushed to the view)
- `willRerender()` (Fired when states are about to get updated)
- `hasRerendered()` (Fired after states got updated)

```javascript
class Input extends Popcorn{
    willBeRendered(){
        alert('I am about to be rendered');
    }
    
    hasRendered(){
        alert('I am rendered');
    }
    
    willRerender(){
        alert('My state has just been changed, and I will be rerendered');
    }
    
    hasRerendered(){
        alert('I have rerendered');
    }
    
    render(){
        return `<input class='${this.classes.input}'>`
    }
}
```
