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
function replaceBody(text){
    document.body.innerHTML = text;
}
function submitForm(data) {
    let pw = "cs_be5fdc4a026c0907746e421f532e5339785492f1";
    let login = "ck_af44e6bb12c2be4c41f605d8dd22e78686cc36d5"
    let uri = "https://cleanlites.dev.local/wp-json/gf/v2/forms/11/submissions";
    let h = new Headers();
    h.append("Authorization", "Basic " + btoa(`${login}:${pw}`).toString("base64"));
    h.append("Content-Type", "application/json; charset=utf-8");

    fetch(uri, {
            headers: h,
            method: "POST",
            body: JSON.stringify(data)

        })
        .then(result => result.json())
        .then(body => replaceBody(body.confirmation_message))
}

export {
    getForm,
    submitForm
}