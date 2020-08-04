function handlePDF() {
    const upload = document.querySelector('#upload-pdf')
    upload.onclick = () => {
        window.open('https://www.facebook.com', '_self')
    }
}

export {handlePDF};