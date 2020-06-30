import * as grav from './gravity-form-api.js';

function matchValues(values, fields) {
   
    let submitted = new Object();

    fields.forEach(field => {
        if (field.inputs != null) {
            field.inputs.forEach(input => {
             
                // submitted[input.id] = 'test'
            })
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

    grav.submitForm(submitted)
}

function submitToMatch(formValues) {

    grav.getForm()
        .then(result =>
            matchValues(formValues, result.fields))

}

export { submitToMatch }