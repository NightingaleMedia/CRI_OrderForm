import * as grav from './gravity-form-api.js'
import {
    LoadingPage
} from './builder/element-builders.js'

const submitButton = document.querySelector('#submit-form')
let formObject = [];


submitButton.onclick = function () {
    console.log('submitting')
    collateInputs();
}

function collateInputs() {

    const allSection = document.querySelectorAll('section');

    let date = new Date();
    formObject["submitDate"] = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} `;
    formObject["submitTime"] = `${date.getUTCHours()}:${date.getUTCMinutes()}`
    allSection.forEach(section => {

        if (section.hasAttribute('data-material')) {
            //new array for each material
            let inputs = section.querySelectorAll('.input-wrapper input');
            let valueSelectors = section.querySelectorAll('.units--holder input')

            inputs.forEach(item => {
                // find the matching unit selector
                // valueSelectors.forEach(value => console.log(value.name.slice(11)));
                let theItemUnit = [...valueSelectors].find(v => item.name == v.name.slice(11))
                formObject[item.name] = item.value ? (item.value + ' ' + theItemUnit.value) : null
            })

        } else {

            let inputs = document.querySelectorAll('input, select, textarea')

            inputs.forEach(input => {
              
                if (input.type === 'select-one') {

                    formObject[input.name] = input[input.selectedIndex].innerText

                } else if (input.type === 'radio') {
                    input.checked ? (formObject[input.name] = input.value) : null;

                } else if (input.type === 'checkbox') {
                    input.checked ? (formObject[input.name] = 'true') : (formObject[input.name]) = 'false'
                } else if (input.type === 'file') {
                    input.type = 'text'
                    input.value = input.value
                    input.placeholder = ''
                    formObject[input.name] = input.dataset.url
                } else formObject[input.name] = input.value

            })
        }

    })
    let load = new LoadingPage('Submitting Your Form . . .')
    console.log(formObject)
    document.body.innerHTML = ``;
    document.body.appendChild(load.render());
    setTimeout(() => {
        
        grav.submitToMatch(formObject)
    }, 10000)
    // grav.submitToMatch(formObject)

}
export {
    collateInputs
}