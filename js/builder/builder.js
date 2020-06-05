import {
    goToNext,
    goToPrev,
    handleCheck,

} from '../app.js'

import {
    submitForm
} from '../submit-form.js'

import * as el  from './element-builders.js'

function buildSubItems(title) {
    let container = document.createElement('div')
    container.innerHTML = `<li class="sub-item" data-m-name="${title}"><a>${title}</a></li>`;
    return container.innerHTML;
}
function buttons() {
    const buttonz = document.createElement('div')
    const next = new el.buttonMaker("Next", 'btn-next', "next", goToNext)
    const prev = new el.buttonMaker("Previous", 'btn-prev', "prev", goToPrev)

    buttonz.classList.add('button-section')
    buttonz.appendChild(prev.render())
    buttonz.appendChild(next.render())

    return buttonz;
}

function addNextPrev() {
    const container = document.createElement('div')
    const buttonz = document.createElement('div')
    const holder = document.createElement('div')
    container.classList.add('button--wrapper')
    buttonz.classList.add('button-section', 'submit-form--button')
    // buttonz.dataset.operation = 'next-prev-section'

    const next = new el.buttonMaker("Next", 'btn-next', "next", goToNext)
    const prev = new el.buttonMaker("Previous", 'btn-prev', "prev", goToPrev)
    buttonz.appendChild(prev.render())
    buttonz.appendChild(holder)
    buttonz.appendChild(next.render())
    container.appendChild(buttonz)
    return container;
}

function addSubmit() {
    const container = document.createElement('div')
    const buttonz = document.createElement('div')

    container.classList.add('button--wrapper')
    buttonz.classList.add('button-section')

    const submitButton = new el.buttonMaker('Submit', 'btn-submit', 'submit', submitForm)
    const next = new el.buttonMaker("Next", 'btn-next', "next", goToNext)
    const prev = new el.buttonMaker("Previous", 'btn-prev', "prev", goToPrev)

    buttonz.appendChild(prev.render())
    buttonz.appendChild(submitButton.render())
    buttonz.appendChild(next.render())
    container.appendChild(buttonz)
    return container
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
            // console.log("key: " + e.key)
            // itemTitle.value == e.key: itemTitle.name = '';
            if (matchDigit) {
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
        let locationBuilder = new el.locationSelector(location, 'locations', 'radio', `location-label--${location}`)
        locationsArray.push(locationBuilder.render().innerHTML)
    })
    
    return locationsArray;
}


export {
    buildSubItems,
    buttons,
    addVerify,
    addMaterialInputs,
    addSubmit,
    addNextPrev,
    buildMaterialPicker,
    buildLocations
}