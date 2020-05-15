// var fs = require('fs')
var sampleObject = {
    
}

const submit = document.querySelector('#submit-form');
const form = document.querySelector('form');

const allSection = document.querySelectorAll('section');
const materialsSection = document.querySelectorAll('.section--material input')


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let date = new Date();
    let newJson = [];
    newJson["Cleanlites Order Form"] = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} at ${date.getUTCHours()}:${date.getUTCMinutes()} UTC`;
    allSection.forEach(section => {
        sectionArrays = [];

        if(section.dataset.name == 'materials'){
            //new array for each material
            let materialJson = [];
            newJson["Material"] = materialJson;
            let materials = section.querySelectorAll('div:not(.material--title)');

            materials.forEach(material => {
                const materialDetailArray = [] 
                materialJson[material.dataset.name] = materialDetailArray
                 //get the inputs from each material
                let i = material.querySelectorAll('input')
                i.forEach(item =>  materialDetailArray[item.name] = materialDetailArray[item.value] ?? '0')
            sectionArrays.push(materialJson)
            })
   
        } else { 
            let inputs = section.querySelectorAll('input, select')
            newJson[section.dataset.name] = sectionArrays;
            inputs.forEach(input => {
                // console.log(input.type) 
                if(input.type === 'select-one'){
                    sectionArrays[input.name] = input[input.selectedIndex].innerText        
                } else{ 
                sectionArrays[input.name] = section[input.value] ?? 'n/a'
                }
            })
        }
    })
    // newJson.map(e => console.log(newJson))
   
    sampleObject = newJson;
    console.log(sampleObject)




})


