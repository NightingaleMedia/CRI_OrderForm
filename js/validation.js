 import * as app from './app.js'
 import * as build from './builder/builder.js'

 let sectionsToCheck = ['Order', 'Billing', 'Generator', 'Materials', 'Containers', 'Site']

 const validationArray = {}
 const sections = document.querySelectorAll('div [data-selected="true"]')
 sectionsToCheck.forEach(section => validationArray[section] = false)

 const billingSection = document.querySelector('div [data-name="Billing"]')
 const genSection = document.querySelector('div [data-name="Generator"]')


function handleErrorArray(e){
    let m = []
    for (let k in validationArray){
        if (!validationArray[k]) m.push(k)
    }
    app.displayError(e, `Sections Incomplete: ${m.join(', ')}`)
}

 const checkNotNull = (arrayToCheck) => {
     let result;
     for (let i = 0; i < arrayToCheck.length; i++) {
         if (arrayToCheck[i].value === '') {
             result = false
             break;
         } else {
             result = true
         }
     }
     return result
 }


 function handleOrder(section) {

     switch (section.querySelector('input:checked').value) {
         case 'Pickup':
             validationArray.Order = true;
             section.querySelector('.locations-area').innerHTML = ``;
             setTimeout(app.goToNext, 500)

             break;
         case 'Delivery':
            validationArray.Order = true;
            section.querySelector('.locations-area').innerHTML = build.buildLocations().join('')
            let locations = section.querySelectorAll('.location-selector')

            locations.forEach(location => location.addEventListener('change', function(){
                if(this.firstElementChild.checked){ 
                setTimeout(app.goToNext, 500)
                }
                else{
                    return;
                }
            }))
             //TODO: change site info
             break;
         default:
             validationArray.Order = false;
     }

 }

 function handleBilling(e) {
     
    let billingInputs = e.querySelectorAll('input:not(.poNumber)')
    validationArray.Billing = checkNotNull(billingInputs);
 }

 function handleSite(e, section) {
    
    const weight = section.querySelector('#estWeight')
    const pallets = section.querySelector('#noPallets')

    let siteArray = [weight, pallets]

    if ((!weight.value == '') && (!pallets.value == '')){
        validationArray.Site = true;
    }
    else {
        validationArray.Site = false;

        if (e.target != weight) { 
        pallets.classList.add('invalid')
        weight.classList.add('invalid')
        setTimeout(()=>{
            pallets.classList.remove('invalid')
            weight.classList.remove('invalid')
        }, 1000)
    }
    }

 }

 function handleGenerator(e, section) {
     const selector = section.querySelector('#generator-same')
     const inputs = section.querySelectorAll('input[type="text"]')
     if ((e.type == 'click') && (e.target.id == 'generator-same')) {
         if (validationArray.Billing) {
             copyInBilling();
             validationArray.Generator = true;
             setTimeout(app.goToNext, 1000)
         } else {
             app.displayError(e, 'The Billing Section incomplete!')
            // handleErrorArray();
             selector.checked = false;
         }
     }
     if (checkNotNull(inputs)) {
         validationArray.Generator = true;
     } else {
         validationArray.Generator = false;
     }
 }

 function handleContainers(e, section) {
     const inputs = section.querySelectorAll('input[type="text"]')

     let anyText = [...inputs].filter(input => input.value != '');
     const next = section.querySelector('.auto-next')
     if (e.target.id == 'no-containers') {
         if (next.checked) {
             validationArray.Containers = true;
             setTimeout(app.goToNext, 1000)
         }
     } else if (anyText.length > 0) {
         validationArray.Containers = true;
     } else {
         validationArray.Containers = false;
     }
 }

 function copyInBilling() {

     let bil = {};
     const billingInputs = billingSection.querySelectorAll('input')
     billingInputs.forEach(input => bil[input.name] = input.value)

     const g = genSection.querySelectorAll('input')
     g[1].value = bil.billingCompany
     g[2].value = bil.billingAddress
     g[3].value = bil.billingCity
     g[4].value = bil.billingState
     g[5].value = bil.billingZip
     g[6].value = bil.billingContactName
     g[7].value = bil.billingPhone
 }

 function handleMaterials(sec) {
     const selectors = sec.querySelectorAll('.material-picker--selector > input:checked')
     const next = sec.querySelector('.auto-next')

     next.onchange = () => {
         validationArray.Materials = true;
         app.resetMaterials();
         handleDisplay(sec, true);
         setTimeout(app.goToNext, 500)
     }
     if (selectors.length > 0) {
         validationArray.Materials = true;
     } else {
         validationArray.Materials = false;
     }
 }

 function handleDisplay(section, bool) {

     // change node checkmark
     let matchingLi = [...app.navListMain].find(nav => nav.querySelector('a').innerText == section.dataset.name)

     let d = matchingLi.querySelector('div');
     if (bool) {
         matchingLi.classList.add('pop')
         d.innerHTML = `<i class = "fas fa-check"></i>`
     } else {
         d.innerHTML = '';
         matchingLi.classList.remove('pop')
     }
 }

 function checkSection(e, section) {


     // match the section we are checking to our array
     let matching = Object.keys(validationArray)
                          .find(key => section.dataset.name === key)

     if (matching !== undefined) {
         switch (section.dataset.name) {
             case 'Order':
                 handleOrder(section);
                 break;
             case 'Billing':
                 handleBilling(section)
                 break;
             case 'Generator':
                 handleGenerator(e, section);
                 break;
             case 'Materials':
                 handleMaterials(section)
                 break;
             case 'Containers':
                 handleContainers(e, section)
                 break;
             case 'Site':
                 handleSite(e, section)

                 break;
             default:
                 break;
         }
         handleDisplay(section, validationArray[matching])
     }

 }

 function checkSubmit() {
     let falses = Object.values(validationArray).filter((value) => !value);
     return (falses.length == 0) ? true : false;
 }

 export {
     checkSubmit,
     checkSection,
     handleErrorArray
 }