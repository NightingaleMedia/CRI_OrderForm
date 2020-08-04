const fileUpload = document.querySelector('#file_upload_area')
const addButton = document.querySelector('#add-button')

const addAnother = fileUpload.querySelector('#add-another')

let addedFiles = [];
let addedFileURLs = [];

function createAndClick(num) {
    let button = document.createElement('input')
    button.type = 'file';
    button.hidden = true;
    button.id = `upload-file-${num}`

    fileUpload.appendChild(button)
    button.click();

    return button;

}

function uploadFile(el) {

    const fReader = new FileReader()

    fReader.readAsDataURL(el.files[0])

    fReader.onloadend = function(e) {
        addedFileURLs.push(e.target.result);
 
    }

    fReader.removeEventListener
}

function updateFiles(f) {
    addedFiles.push(this.files[0].name)
    let li = document.createElement('li')
    li.innerHTML = `${this.files[0].name}`
    fileUpload.appendChild(li)
}


addAnother.addEventListener('click', () => {
    console.log('added files: ' + addedFiles.length);
    const addFileButton = fileUpload.querySelector('#add-button')
    if (addedFiles.length === 0) {
        addFileButton.click();
        addFileButton.addEventListener('change', updateFiles)
        addAnother.innerText = 'Add Another'
        // uploadFile(addFileButton);

    } else if (addedFiles.length < 4) {
        let newInput = createAndClick(addedFiles.length + 1);
        newInput.addEventListener('change', updateFiles)

    } else {
        addAnother.style.width = `100%`
        addAnother.style.backgroundColor = 'red';
        addAnother.innerText = 'You\'ve reached the maximum...'
    }

})