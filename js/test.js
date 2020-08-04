

function addTestButton(){
    const testNode = document.createElement('div')

    testNode.innerHTML = `

    <button id="fillout" onClick="addTestInputs()">fill out</button>

    `
    let main = document.body.firstElementChild;

    main.parentElement.insertBefore(testNode, main)
    
}

function addTestInputs(){
    const test_inputs = document.querySelectorAll('input, textarea')

        
       test_inputs.forEach(input => {
           if(input.type != 'checkbox' && input.type != 'radio' && input.type != 'file'){ 
           input.value = `${input.name}--test`
           input.click();
           }
           if(input.type == 'checkbox') {
            input.click();
            input.checked = true
           
           };
        
        })
}
  
window.onload = () => addTestButton();