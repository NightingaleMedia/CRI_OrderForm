import * as grav from './gravity-form-api.js'
import {
    LoadingPage
} from './builder/element-builders.js'

import {
    RenderedForm
} from './builder/render-form.js'



function populateConfirmForm(form_object) {

    const stylesheet = document.querySelector('#main-style')
    stylesheet.href = 'css/style-rendered.css'
    let renderedForm = new RenderedForm(form_object)

    document.body.innerHTML = ``;
    document.body.appendChild(renderedForm.render())

    const submitButton = document.querySelector('#submit-form')
    let inputs = document.querySelectorAll('input, select')


    inputs.forEach(input => {
        input.value = form_object[input.name]
        input.setAttribute('disabled', 'disabled')
    })


    submitButton.onclick = function () {

        grav.submitToMatch(form_object)
        const mainForm = document.querySelector('.main-form')
        mainForm.innerHTML = ``;

        let load = new LoadingPage('Submitting Your Form ...')
        mainForm.appendChild(load.render())


    }

}

function collateInputs() {

    const allSection = document.querySelectorAll('.single-pane');

    let date = new Date();
    let formObject = [];

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
            let inputs = section.querySelectorAll('input, select')

            inputs.forEach(input => {
                if (input.type === 'select-one') {
                    formObject[input.name] = input[input.selectedIndex].innerText

                } else if (input.type === 'radio') {
                    input.checked ? (formObject[input.name] = input.value) : null;

                } else formObject[input.name] = input.value
            })
        }
    })
    let load = new LoadingPage('Checking Your Form . . .')
    let pane = document.querySelector('.current-pane')
    pane.innerHTML = ``;
    pane.appendChild(load.render());
    setTimeout(() => {
        populateConfirmForm(formObject)
    }, 1000)
    // grav.submitToMatch(formObject)

}
export {
    collateInputs,
    populateConfirmForm
}