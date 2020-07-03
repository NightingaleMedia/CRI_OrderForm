import {
    goToNext,
    goToPrev,
    handleCheck,
    displayError    

} from '../app.js'

import {
     collateInputs
} from '../submit-form.js'

import * as el  from './element-builders.js'
import { handleErrorArray } from '../validation.js';

function buildSubItems(title) {
    let container = document.createElement('div')
    container.innerHTML = `<li class="sub-item" data-m-name="${title}"><a>${title}</a></li>`;
    return container.innerHTML;
}

function buttons() {
    const container = document.createElement('div')
    const next = new el.buttonMaker("Next", 'btn-next', "next", goToNext)
    const prev = new el.buttonMaker("Previous", 'btn-prev', "prev", goToPrev)

    container.classList.add('button-section')
    container.appendChild(prev.render())
    container.appendChild(next.render())

    return buttonz;
}

function addNextPrev() {
    const prev_next_container = document.createElement('div')
    const buttonz = document.createElement('div')

    prev_next_container.classList.add('button--wrapper')
    buttonz.classList.add('button-section', 'submit-form--button')
    // buttonz.dataset.operation = 'next-prev-section'

    const next = new el.buttonMaker("Next", 'btn-next', "next", goToNext)
    const fakeSubmit = new el.buttonMaker('Submit', 'btn-submit--grey', 'submit', handleErrorArray)
    const prev = new el.buttonMaker("Previous", 'btn-prev', "prev", goToPrev)
    buttonz.appendChild(prev.render())
    buttonz.appendChild(fakeSubmit.render())
    buttonz.appendChild(next.render())
    prev_next_container.appendChild(buttonz)
    return prev_next_container;
}

function addSubmit() {
    const submit_container = document.createElement('div')
    const buttonz = document.createElement('div')

    submit_container.classList.add('button--wrapper')
    buttonz.classList.add('button-section')

    const submitButton = new el.buttonMaker('Finalize', 'btn-submit', 'submit', collateInputs)
    const next = new el.buttonMaker("Next", 'btn-next', "next", goToNext)
    const prev = new el.buttonMaker("Previous", 'btn-prev', "prev", goToPrev)

    buttonz.appendChild(prev.render())
    buttonz.appendChild(submitButton.render())
    buttonz.appendChild(next.render())
    submit_container.appendChild(buttonz)
    return submit_container
}


function addVerify(input) {
    const wrapper = document.createElement('div')
    wrapper.className = 'input-wrapper'
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

            let matchDigit = new RegExp('^[0-9]+$').test(e.key)
       
            if (matchDigit) {
                newInput.push(e.key)
            }
            if((!matchDigit) && (e.key !='Backspace')){
                displayError(e, 'Value must be numbers only.  Use the \'Units\' box to select unit type')

            }
            if (e.key == 'Backspace') {
                // this.value = '';
                // newInput = [];
                newInput.pop()
                this.value = newInput.join('');
            } else {
                this.value = newInput.join('');
                
            }

        })
        let labelTitle = itemSelector.querySelector('label')
        let labelInput = itemSelector.querySelector('input')
        labelInput.value = labelInput.checked ? "Lbs" : "Units"

        labelInput.addEventListener('change', function () {
            labelTitle.innerText = this.checked ? "Lbs" : "Units"
            labelInput.value = labelInput.checked ? "Lbs" : "Units"
            
        })
    })
}

function buildMaterialPicker() {
    const allSinglePanesArray = [...document.querySelectorAll('.single-pane')]
    let matPane = document.querySelector(`[data-name="Materials"]`)
    let matPaneInner = matPane.querySelector('.form-values')
    let allMaterialPanes = allSinglePanesArray.filter(pane => pane.hasAttribute('data-material'))

    allMaterialPanes.map(pane => {
        let icon = pane.querySelector('.divide > h2')

        let picker = new el.inputMaker(pane.dataset.material, 'material-picker--selector')
            .labelText(`${icon.parentElement.innerHTML}`)
        matPaneInner.appendChild(picker.render());
        picker.input.addEventListener('change', function () {
            handleCheck(this, pane)
        })
    })
}
function buildLocations() {
 
    const locations = ['Cincinnati Anthony Wayne', 'South Carolina', 'Minnesota', 'Michigan', 'Cincinnati Northland', 'Not Sure']
    let locationsArray = [];
    locations.forEach(location => {
        let locationBuilder = new el.locationSelector(location, 'CleanlitesFacility', 'radio', `location-label--${location}`)
        locationsArray.push(locationBuilder.render().innerHTML)
    })
    
    return locationsArray;
}

function addErrorBox(section){
         const errorDiv = document.createElement('div')
         errorDiv.className = "error-display"
         errorDiv.innerText = "Error"
         section.querySelector('.title-of-section').appendChild(errorDiv)
}


export {
    buildSubItems,
    buttons,
    addVerify,
    addMaterialInputs,
    addSubmit,
    addNextPrev,
    buildMaterialPicker,
    buildLocations,
    addErrorBox
}