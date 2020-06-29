import * as app from './app.js'
import * as build from './builder/builder.js'
import {submitToMatch} from './create-form.js'


// function submitForm(){
//     let values = [];
//     const allSections = document.querySelectorAll('.single-pane');
//     allSections.forEach(subsection => {
//         let inputs = subsection.querySelectorAll('input')
//             inputs.forEach(input => {
//                 values.push(input)
//             })
//     })
//     submitToMatch(values)
// }

// function submitForm() {
//     const allSection = document.querySelectorAll('.single-pane');
 
//         let date = new Date();
//         let newJson = [];
//         newJson["Cleanlites Order Form"] = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} at ${date.getUTCHours()}:${date.getUTCMinutes()} UTC`;
        
//         let materialJson = [];
//         newJson["Material"] = materialJson;
//         allSection.forEach(section => {
//             let sectionArrays = [];

//             if (section.hasAttribute('data-material')) {
//                 //new array for each material
            
//                 let materialDetailArray = []
//                 materialJson[section.dataset.material] = materialDetailArray
//                 let inputs = section.querySelectorAll('.input-wrapper input');
//                 let valueSelectors = section.querySelectorAll('.units--holder input')

//                 inputs.forEach(item => {
//                     // find the matching unit selector
//                     // valueSelectors.forEach(value => console.log(value.name.slice(11)));
//                     let theItemUnit = [...valueSelectors].find(v => item.name == v.name.slice(11))
//                     materialDetailArray[item.name] = item.value ? (item.value + ' ' + theItemUnit.value) : '0'
//                 })

//             } else {
//                 let inputs = section.querySelectorAll('input, select')
                
//                 newJson[section.dataset.name] = sectionArrays;
//                 inputs.forEach(input => {
                  
//                     if (input.type === 'select-one') {
//                         sectionArrays[input.name] = input[input.selectedIndex].innerText
//                     } else {
//                         sectionArrays[input.name] = input.value 
//                     }
//                 })
//             }
//         })
 
//         submitToMatch(newJson)
    
//         // sampleObject = newJson;
// }

export { submitForm }