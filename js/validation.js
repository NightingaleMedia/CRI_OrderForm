 import * as app from './app.js'
 let sectionsToCheck = ['Order', 'Billing', 'Generator', 'Materials', 'Containers', 'Site']

 const validationArray = {}
 const sections = document.querySelectorAll('div [data-selected="true"]')
 sectionsToCheck.forEach(section => validationArray[section] = false)

 const billingSection = document.querySelector('div [data-name="Billing"]')

 function handleOrder(section){
    switch(section.querySelector('input:checked').value){
        case 'order-type--pickup' :
            console.log('ok pickup!')
            validationArray.Order = true;
            break;
        case 'order-type--delivery' :
            console.log('ok dropoff!')
            validationArray.Order = true;
            //TODO: change site info
            break;
    }
 }
function handleBilling(){
    validationArray.Billing = true;
}
 function handleGenerator(section){
      if (validationArray.Billing) {
          copyInBilling();
          validationArray.Generator = true;
        setTimeout(app.goToNext, 500)
      } else {
          displayError('Generator', 'You need a value first!')
        section.querySelector('#generator-same').checked = false;
      }
   

 }
 function copyInBilling() {
     if (validationArray.Billing) {
        billingSection.querySelectorAll('input')
     } else {
         console.log('cannot copy')
     }

 }
function handleMaterials(sec){

if(sec.querySelectorAll('input:checked').length > 0){
    validationArray.Materials = true;
} else {
    validationArray.Materials = false;
}

}
 function checkInput(input) {
     //lets us know that this input has a verify bar

 }

 function initAutoNextButtons() {
     const autoNextButtons = document.querySelectorAll('.auto-next')
     autoNextButtons.forEach(button => button.addEventListener('change', () => {
         if (button.id == 'no-materials' && button.checked) {
             app.resetMaterials();
            //  handleMaterials();
             setTimeout(app.goToNext, 500)
         } else if (button.id == 'generator-same'){
            return
         } else if (button.checked) {
             setTimeout(app.goToNext, 500)
         } else {
             return
         }
     }))
 }
function displayError(paneName, message){

    let theErrorBox = [...sections]
        .find(section => section.dataset.name === paneName)
        .querySelector('.error-display');

    theErrorBox.innerText = message;
    theErrorBox.classList.add('error-show')
    setTimeout(()=>theErrorBox.classList.remove('error-show'), 1200)

}
 function handleDisplay(section, bool) {
     // change node checkmark
     let matchingLi = [...app.navListMain].find(nav => nav.querySelector('a').innerText == section.dataset.name)
     let d = matchingLi.querySelector('div');
     bool ? d.innerHTML = `<i class = "fas fa-check"></i>` : d.innerHTML = '';
     // make the pane green maybe
 }

 function checkSection(section) {

     const errorDiv = document.createElement('div')
     errorDiv.className = "error-display"
     errorDiv.innerText = "Error"
     section.querySelector('.title-of-section').appendChild(errorDiv)

     // match the section we are checking to our array
     let matching = Object.keys(validationArray).find(key => section.dataset.name === key)
     if (matching !== undefined) {
         switch (section.dataset.name) {
             case 'Order':
                handleOrder(section);
                 break;
             case 'Billing':
                 handleBilling(section)
                 break;
             case 'Generator':

                 handleGenerator(section);
                 break;
             case 'Materials':
                console.log(app.selectedMaterials)
                 handleMaterials(section)
                 break;
             case 'Containers':
                 console.log('this is cont')
                 break;
             case 'Site':
                 console.log('this is site')
                 break;
             default:
                 break;
         }
         handleDisplay(section, validationArray[matching])

     } else {
         console.log('no validation needed')
     }

 }

 function checkSubmit() {
     let falses = Object.values(validationArray).filter((value) => !value);
     // validationArray.map(input => console.log(input))
     return (falses.length == 0) ? true : false;
 }

 export {
     checkSubmit,
     checkInput,
     checkSection,
     initAutoNextButtons
 }