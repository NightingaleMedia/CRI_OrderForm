const fileUpload = document.querySelector('#file_upload_area')
const addButton = document.querySelector('#add-button')
const addAnother = fileUpload.querySelector('#add-another')

let addedFiles = [];

let fileReader = new FileReader();

function createAndClick(num) {
    let input = document.createElement('input')
    input.type = 'file';
    input.hidden = true;
    input.name = `fileUpload${num}`
    input.id = `fileUpload${num}`

    fileUpload.appendChild(input)
    input.click();

    return input;
}

function updateFiles() {
    
    fileReader.readAsDataURL(this.files[0])

    function setUrl(e){
        return new Promise((resolve, reject) => { 
            fileReader.onload = (e) => {
                resolve(e.target.result)
            }
        })
    }

    setUrl(this).then(res => this.dataset.url = res)
    console.log(this.files[0].name)

    const src = URL.createObjectURL(this.files[0])
 
    let div = document.createElement('div')
    div.classList.add('img-holder')
        div.innerHTML = `
            <img src="${src}" alt="uploadedimg--${src}" data-input-name="${this.name}">
            <p>${this.files[0].name}</p>
            <div class= "delete-img"> + </div>
        `
    fileUpload.appendChild(div)
    addedFiles.push('yed')
    let del = div.querySelector('.delete-img')

        del.addEventListener('click', ()=>{
            //find corresponding input
            div.style.opacity = '0.5';
            setTimeout(()=>{
                this.parentElement.removeChild(this)
                div.parentElement.removeChild(div)
                addedFiles.splice(0, 1)
            }, 300)   
          
        })
    // img.onload = () => URL.revokeObjectURL(this.files[0])
}

addAnother.addEventListener('click', () => {

    if (addedFiles.length < 4) {
        addAnother.style.width = `auto`
        addAnother.style.backgroundColor = 'var(--selected)';
        addAnother.innerText = 'Add More'

        let newInput = createAndClick(addedFiles.length + 1);
        newInput.addEventListener('change', updateFiles)

    } else {
        addAnother.style.width = `100%`
        addAnother.style.backgroundColor = 'red';
        addAnother.innerText = 'You\'ve reached the maximum...'
    }   
})

