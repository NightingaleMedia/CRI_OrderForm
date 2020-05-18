import {goToNext, goToPrev} from '../cri_form.js' 

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

  function buildSubItems(title) {
      let container = document.createElement('div')
      container.innerHTML = `<li class="sub-item" data-m-name="${title}"><a>${title}</a></li>`;
      return container.innerHTML;
  }

  function buttons() {
      const buttonz = document.createElement('div')
      const next = new buttonMaker("Next", 'btn-next', "next", goToNext)
      const prev = new buttonMaker("Previous", 'btn-prev', "prev", goToPrev)

      buttonz.classList.add('button-section')
      buttonz.appendChild(prev.render())
      buttonz.appendChild(next.render())

      return buttonz;
  }

  function addNextPrev() {
    const buttonz = document.createElement('div')
    const holder = document.createElement('div')
    buttonz.classList.add('button-section', 'submit-form--button')
    buttonz.dataset.operation = 'next-prev-section'
    const next = new buttonMaker("Next", 'btn-next', "next", goToNext)
    const prev = new buttonMaker("Previous", 'btn-prev', "prev", goToPrev)
    buttonz.appendChild(prev.render())
    buttonz.appendChild(holder)
    buttonz.appendChild(next.render())

    return buttonz;

  }

  function addSubmit(){
    const buttonz = document.createElement('div')
    let submitButton = document.createElement('button')
    submitButton.classList.add('submit-form')
    submitButton.innerText = 'Submit Form'
    submitButton.id = 'submit-form'
    buttonz.classList.add('button-section', 'submit-form--button')
    const next = new buttonMaker("Next", 'btn-next', "next", goToNext)
    const prev = new buttonMaker("Previous", 'btn-prev', "prev", goToPrev)
    buttonz.appendChild(prev.render())
    buttonz.appendChild(submitButton)
    buttonz.appendChild(next.render())
  
    return buttonz
  }


  function addVerify(input) {
      const wrapper = document.createElement('div')
      const verify = document.createElement('div')
      verify.className = 'verify'
      let newNode = input.parentElement.insertBefore(wrapper, input)
      newNode.appendChild(input)
      newNode.appendChild(verify)
      return newNode;
  }
function addUnitSelector(item) {
    const inputType = document.createElement('div');
    inputType.classList.add('units--holder')
    inputType.innerHTML = `<input type="checkbox" id="units--${item}" name="unit-type--${item}">
    
      <label for="units--${item}">Units</label>   
        <span></span>`;
    return inputType;
}
  const addMaterialInputs = () => {
      const allUnitSelected = document.querySelectorAll('.label-input-quantity')
      allUnitSelected.forEach(item => {
          let itemTitle = item.querySelector('input');
          let itemSelector = item.appendChild(addUnitSelector(itemTitle.name))
          let newInput = []
          itemTitle.addEventListener('keyup', function (e) {

              matchDigit = new RegExp('^[0-9]+$').test(e.key)
              //   console.log("key: " + e.key)
              // itemTitle.value == e.key: itemTitle.name = '';
              if (matchDigit) {
                  keyPressed = e.key
                  newInput.push(e.key)
              }
              if (e.key == 'Backspace') {
                  this.value = '';
                  newInput = [];
              } else {
                  this.value = newInput.join('');
              }
          })
          let labelTitle = itemSelector.querySelector('label')
          itemSelector.querySelector('input').addEventListener('change', function () {
              labelTitle.innerText = this.checked ? "Lbs" : "Units"
          })
      })
  }

  export{buttonMaker, 
    inputMaker, 
    buildSubItems, 
    buttons, 
    addVerify, 
    addMaterialInputs, 
    addSubmit,
addNextPrev}