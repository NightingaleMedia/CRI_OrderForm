  // input == correspondingValue


  // const formMap = {
  //         "form_id" : "11",
  //         "input_88" : data.Billing.billingCompany,
  //         // "input_10" : data.Billing,
  //         "input_10_1": data.Billing.billingAddress,

  //         "input_10_3": data.Billing.billingCity,
  //         "input_10_4": data.Billing.billingState,
  //         "input_10_5": data.Billing.billingZip,
  //         "input_10_6": "null",
  //         "input_139": data.Billing.billingContactName,
  //         "input_5": data.Billing.billingPhone,
  //         "input_15": data.Order.orderType,
  //         "input_87": data.Generator.generatorCompany,
  //         "input_9_1": data.Generator.generatorAddress ,
  //         "input_9_2": data.Generator.generatorAddress ,
  //         "input_9_3": data.Generator.generatorCity,
  //         "input_9_4": data.Generator.generatorState,
  //         "input_9_5": data.Generator.generatorZip,
  //         "input_9_6": "null",
  //         "input_140": data.Generator.generatorContactName,
  //         "input_89": data.Generator.generatorPhone,
  //         "input_8": data.Billing.billingEmail,
  //         "input_7": data.Generator.poNumber ?? 'none'
  // }


  //OLD SUBMIT

  // function submitForm() {
  //   const allSection = document.querySelectorAll('.single-pane');

  //   let date = new Date();
  //   let newJson = [];
  //   newJson["Cleanlites Order Form"] = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} at ${date.getUTCHours()}:${date.getUTCMinutes()} UTC`;

  //   let materialJson = [];
  //   newJson["Material"] = materialJson;
  //   allSection.forEach(section => {
  //     let sectionArrays = [];

  //     if (section.hasAttribute('data-material')) {
  //       //new array for each material

  //       let materialDetailArray = []
  //       materialJson[section.dataset.material] = materialDetailArray
  //       let inputs = section.querySelectorAll('.input-wrapper input');
  //       let valueSelectors = section.querySelectorAll('.units--holder input')

  //       inputs.forEach(item => {
  //         // find the matching unit selector
  //         // valueSelectors.forEach(value => console.log(value.name.slice(11)));
  //         let theItemUnit = [...valueSelectors].find(v => item.name == v.name.slice(11))
  //         materialDetailArray[item.name] = item.value ? (item.value + ' ' + theItemUnit.value) : '0'
  //       })

  //     } else {
  //       let inputs = section.querySelectorAll('input, select')

  //       newJson[section.dataset.name] = sectionArrays;
  //       inputs.forEach(input => {

  //         if (input.type === 'select-one') {
  //           sectionArrays[input.name] = input[input.selectedIndex].innerText
  //         } else {
  //           sectionArrays[input.name] = input.value
  //         }
  //       })
  //     }
  //   })

  //   submitToMatch(newJson)

    // sampleObject = newJson;
  // }