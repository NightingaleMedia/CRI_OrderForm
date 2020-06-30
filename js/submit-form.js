import * as app from './app.js'
import * as build from './builder/builder.js'
import { submitToMatch } from './create-form.js'



function collateInputs() {
    const allSection = document.querySelectorAll('.single-pane');
 
        let date = new Date().getTime();
        let formObject = [];
        formObject["Cleanlites Order Form"] = date;
        
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
                    } else {
                        formObject[input.name] = input.value 
                    }
                })
            }
        })
 
        submitToMatch(formObject)
    
}
export{ collateInputs }
