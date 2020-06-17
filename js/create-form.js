function createForm(data){
    const formMap = {
            "form_id" : "11",
            "input_88" : data.Billing.billingCompany,
            // "input_10" : data.Billing,
            "input_10_1": data.Billing.billingAddress,
         
            "input_10_3": data.Billing.billingCity,
            "input_10_4": data.Billing.billingState,
            "input_10_5": data.Billing.billingZip,
            "input_10_6": "null",
            "input_139": data.Billing.billingContactName,
            "input_5": data.Billing.billingPhone,
            "input_15": data.Order.orderType,
            "input_87": data.Generator.generatorCompany,
            "input_9_1": data.Generator.generatorAddress ,
            "input_9_2": data.Generator.generatorAddress ,
            "input_9_3": data.Generator.generatorCity,
            "input_9_4": data.Generator.generatorState,
            "input_9_5": data.Generator.generatorZip,
            "input_9_6": "null",
            "input_140": data.Generator.generatorContactName,
            "input_89": data.Generator.generatorPhone,
            "input_8": data.Billing.billingEmail,
            "input_7": data.Generator.poNumber ?? 'none'
    }

     async function submitFormToDb() {
         let pw = "cs_be5fdc4a026c0907746e421f532e5339785492f1";
         let login = "ck_af44e6bb12c2be4c41f605d8dd22e78686cc36d5"
         let uri = "https://cleanlites.dev.local/wp-json/gf/v2/forms/11/submissions";
         let h = new Headers();
         h.append("Authorization", "Basic " + btoa(`${login}:${pw}`).toString("base64"));
         h.append("Content-Type", "application/json; charset=utf-8");

         await fetch(uri, {
             headers: h,
             method: "POST",
             body: JSON.stringify(formMap)

         }).then(result => result.json())
         .then(body => console.log(body))

     }

     submitFormToDb();

}





export {createForm}