function handlePDF() {
    const upload = document.querySelector('#upload-pdf')
    upload.onclick = () => {
        window.open('https://www.facebook.com', '_self')
    }
}

function handleFiles (e){


}
function handleUploadFiles(){
    const uploadFiles = document.querySelector('#filesUploader')
    uploadFiles.addEventListener('change', handleFiles, false)
}

export {handlePDF, handleUploadFiles};