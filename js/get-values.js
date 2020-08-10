 async function getForm() {


     let pw = 'ck_edbce132eb8423e833d8e2a3356bf208d5456d3f';
     let login = 'cs_1dd72c644fde845a9afd7b693a1e605cf11ebea2'
     let uri = 'https://cleanlites.com/wp-json/gf/v2/forms/11';
     let h = new Headers();
     h.append('Authorization', 'Basic ' + btoa(`${pw}:${login}`).toString('base64'));
     h.append('Content-Type', 'application/json; charset=utf-8');

     const response = await fetch(uri, {
         headers: h,
         method: 'GET'
     });
     return response;
 }

 getForm()
     .then(text => text.json())
     .then(result => makeTable(result.fields))

 function makeTable(data) {
     const root = document.getElementById('root');
     let dataArray = new Object();
     data.forEach(item => {
         if (item.type != 'section') {
             dataArray[item.id] = item.label;
             let inputsExist = (item.inputs !== null)

             let div = document.createElement('div');
             let inputArray = [];
             div.className = 'single-item'
             if (inputsExist) {

                 item.inputs.forEach(input => {
                     dataArray[input.id] = input.label;
                     let singleInput = document.createElement('div')
                     singleInput.className = 'single-input';
                     inputArray.push(`
                            <div> ${input.label}</div>
                            <div class="input-no"> ${input.id}</div>      
                            `)
                 })
                 div.innerHTML = `
                        <div class="title">${item.label} </div>
                        <div class="input-no">${item.id}</div>
                        <div class = "inputs" > ${inputArray.join('')} </div>
                        `
                 root.appendChild(div)
             } else {
                 div.innerHTML = `
                        <div class="title">${item.label} </div>
                        <div class="input-no">${item.id}</div>`
                 root.appendChild(div)
             }
             return;
         }
     })
     console.log(dataArray)
 }