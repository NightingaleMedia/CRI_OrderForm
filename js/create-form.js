function getForm() {
    let pw = 'cs_be5fdc4a026c0907746e421f532e5339785492f1';
    let login = 'ck_af44e6bb12c2be4c41f605d8dd22e78686cc36d5'
    let uri = 'https://cleanlites.dev.local/wp-json/gf/v2/forms/11';
    let h = new Headers();
    h.append('Authorization', 'Basic ' + btoa(`${login}:${pw}`).toString('base64'));
    h.append('Content-Type', 'application/json; charset=utf-8');

    const response = fetch(uri, {
        headers: h,
        method: 'GET'
    }).then(res => res.json());
    return response;
}


function matchValues(values ,fields){
    console.log(values)
    let submitted = new Object();

    fields.forEach((field) => { 
        values.forEach((value) => {
            if(field.label === value.name){
                console.log(field.id + ' value: ' + value.value)
            }
        })
    })
}

function submitToMatch(formValues) {

    getForm()
    .then(result => 
        matchValues(formValues, result.fields))




}

async function createForm(data) {
    let pw = "cs_be5fdc4a026c0907746e421f532e5339785492f1";
    let login = "ck_af44e6bb12c2be4c41f605d8dd22e78686cc36d5"
    let uri = "https://cleanlites.dev.local/wp-json/gf/v2/forms/11/submissions";
    let h = new Headers();
    h.append("Authorization", "Basic " + btoa(`${login}:${pw}`).toString("base64"));
    h.append("Content-Type", "application/json; charset=utf-8");

    await fetch(uri, {
            headers: h,
            method: "POST",
            body: JSON.stringify(data)

        })
        .then(result => result.json())
        .then(body => console.log(body))

}









export {
    createForm,
    submitToMatch
}