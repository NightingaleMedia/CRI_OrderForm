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
    let inputs = document.querySelectorAll('input, select, textarea')

    inputs.forEach(input => {

        input.value = form_object[input.name]
        input.checked = form_object[input.name.checked]
   
        input.addEventListener('change', () => {
            form_object[input.name] = input.value
        })

        if ((input.type == 'checkbox') && (form_object[input.name] == 'true')) {
            // console.log(input.name)
            input.checked = true;
            input.checked = 'checked'
            input.setAttribute('checked', 'true')      
        }

        if (form_object[input.name] == 'Delivery' && input.id == 'radioTwo') {
             input.checked = true;
        
        } else {
            input.id == 'radioOne' ? input.checked = true : null
        }

        // makes it so you can't edit the form
        // input.setAttribute('disabled', 'disabled')
    })


    submitButton.onclick = function () {
        console.log('submitting')
        grav.submitToMatch(form_object)
        const mainForm = document.querySelector('.main-form')
        document.querySelector('main').style.minHeight = '0px';
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
         
            let inputs = section.querySelectorAll('input, select, textarea')

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