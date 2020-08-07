import * as app from './app.js'
import {populateConfirmForm} from './submit-form.js'

const pw = 'cs_be5fdc4a026c0907746e421f532e5339785492f1';
const login = 'ck_af44e6bb12c2be4c41f605d8dd22e78686cc36d5';

const api_url = 'https://cleanlites.dev.local/wp-json/gf/v2/forms/11'

const h = new Headers();
h.append("Authorization", "Basic " + btoa(`${login}:${pw}`).toString("base64"));
h.append("Content-Type", "application/json; charset=utf-8");

function getForm() {
    // console.log('get form')
    let uri = api_url;

    const response = fetch(uri, {
        headers: h,
        method: 'GET'
    })
    // .catch(err => app.displayError())
    .then(res => res.json());
    return response;
}

function submitForm(data) {
    document.body.innerHTML = ''
    document.body.innerHTML = JSON.stringify(data)
    let uri = `${api_url}/submissions`;
    fetch(uri, {
            headers: h,
            method: "POST",
            body: JSON.stringify(data)

        })
        .then(result => result.json())
        .then(res => console.log(res))
        // .then(body => location.href = body.confirmation_redirect)
}

//takes the inputs from the form and matches by string
function matchValues(values, fields) {
    console.log(fields)

    //  console.log('match form')
    let submitted = new Object();
    fields.forEach(field => {
        // handles the inputs that have sub-inputs on GF
        if (field.inputs != null) {
            submitted[field.id.toString()] = values[field.label].replace(' ', '').toUpperCase();
            // field.inputs.forEach(input => {
            //     let id = (input.id.toString()).charAt(4)
            //     switch(id){
            //         case "1" :
            //             submitted[input.id] = values[field.label].slice(0,2)
            //             break;
            //         case "2":
            //             submitted[input.id] = values[field.label].slice(3, 5)
            //         break;
            //         case "3":
            //             submitted[input.id] = values[field.label].slice(-2).toUpperCase();
            //         break;
            //     }

            // })
        } else {
            submitted[field.id.toString()] = values[field.label]
        }
    })

    //replaces the 'input_' on the object key
    Object.keys(submitted).forEach(function (key) {
        let newKey = `input_${key.replace('.', '_')}`
        submitted[newKey] = submitted[key]
        delete submitted[key];
    })

    console.log(submitted)
   
    return submitted;
  
}

function submitToMatch(formValues) {
    //  console.log('submit to match form')
    //  console.info(formValues)
    getForm()
        .then(result => submitForm(matchValues(formValues, result.fields)))

}


export {
    getForm,
    submitForm,
    submitToMatch,
    matchValues
}