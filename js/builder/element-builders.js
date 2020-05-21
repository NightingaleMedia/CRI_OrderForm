class buttonMaker {
    constructor(text, id, type, action) {
        this.button = document.createElement('button');
        this.button.innerText = text;
        this.button.id = id;
        this.button.type = type;
        this.button.addEventListener('click', action)
    }
    render() {
        return this.button;
    }
}

class inputMaker {
    constructor(id, className) {
        this.container = document.createElement('div')
        this.container.classList.add(`${className}`)
        this.input = document.createElement('input')
        this.input.type = "checkbox"
        this.input.id = id;
        this.label = document.createElement('label')
        this.label.htmlFor = id;
    }
    labelText(txt) {
        this.label.innerHTML = txt;
        return this;
    }
    render() {
        this.container.appendChild(this.input)
        this.container.appendChild(this.label)
        return this.container
    }
}

class locationSelector{
    constructor(title ,name, inputType, labelId){
        this.outer = document.createElement('div')
        this.wrapper = document.createElement('div')
        this.wrapper.className = 'form-button1'

        this.input = document.createElement('input')
        this.input.type = inputType
        this.input.id = labelId
        this.input.name = name

        this.label = document.createElement('label')
        this.label.htmlFor = labelId
        this.label.innerHTML = `<h2>${title}</h2>`


        // this.h2 = document.createElement('h2')
        // this.h2.innerText = title;
    }
    
    render(){
        this.wrapper.appendChild(this.input)
        this.wrapper.appendChild(this.label)
        // this.wrapper.appendChild(this.h2)
        this.outer.appendChild(this.wrapper)
        return this.outer;
    }

}
export {inputMaker, buttonMaker, locationSelector}