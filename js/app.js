import * as build from './builder/builder.js'
import * as mat from './material-picker.js'
import * as validate from './validation.js'
import * as upload from './uploader.js'

var currentPane = 0;
var minimumRequirements = false;
let selectedMaterials = [];

window.addEventListener('load', () => {
    upload.handlePDF();

    
})

function handleUploadPDF(){
        const upload = document.querySelector('#upload-pdf')
        upload.onclick = () => {
            window.open('https://www.facebook.com', '_self')
        }
}
function displayError(e, m = `Form incomplete`){
    build.addErrorBox(getAllPanes()[currentPane]);
    let theErrorBox = getAllPanes()[currentPane]
        .querySelector('.error-display');

    theErrorBox.innerText = m;
    theErrorBox.classList.add('error-show')
    setTimeout(() => theErrorBox.classList.remove('error-show'), 2000)
}

function getAllPanes() {
    return document.querySelectorAll('[data-selected="true"]')
}
const allPanes = getAllPanes();

const addVerify = document.querySelectorAll('.add-verify input[type="text"]')
const navListMain = document.querySelectorAll('.progress-nodes > ul > li')

const subItem = document.querySelector('.sub-item--ul');

const main = document.querySelector('.main-form')
const mainBlock = document.querySelector('.main-block')


// var bottomNav = main.lastElementChild;




function updateNodeProgress() {
    const progressArray = [...navListMain]
    const progressBar = document.querySelector('.progress-nodes--completed')
    let percent;
    let currentPaneName = getAllPanes()[currentPane].dataset.name
    let currentNo = progressArray.findIndex(node => currentPaneName == node.querySelector('a').innerText)
    let updatedNode = progressArray.find(node => currentPaneName == node.querySelector('a').innerText)

    navListMain.forEach(node => node.classList.remove('current'))

    if (getAllPanes()[currentPane].hasAttribute('data-material') ||
        getAllPanes()[currentPane].dataset.name == 'Materials') {
        //hides everything besides the materials node on small screens
        progressArray.map(l => (l.dataset.nodeName != "Materials") ? l.querySelector('a').classList.add('big-list-hide') : null)
    
        mat.updateNodeMaterials()
    } else if (subItem.classList.contains('focused')) {
        subItem.classList.remove('focused')
        subItem.innerHTML = '';
    }
    try {
        updatedNode.classList.add('current')
        progressArray.map(link => link.querySelector('a').classList.remove('big-list-hide'))
    } catch (error) {}
    percent = 100 * (currentNo / (navListMain.length - 1));
    progressBar.style.width = `${percent}%`
}


// handles if someone clicks on a nav item instead of the next / prev buttons
function goToPane(number) {

    getAllPanes().forEach(pane => {
        pane.classList.remove('current-pane')
    })
    currentPane = number;
    getAllPanes()[currentPane].classList.add('current-pane')
    addNavButtons();
    updateNodeProgress();
    // getAllPanes()[currentPane].classList.contains('material-pane') ? mat.toggler(currentPane) : null;
}

function goToSelected(title) {
    let paneSelected = [...getAllPanes()].findIndex(pane => pane.dataset.name == title);
    currentPane = paneSelected;
    goToPane(currentPane)

}

function goToPrev() {
    if (currentPane < 1) {
        // prevButton.classList.add('btn--disabled')
        return;
    } else {
        currentPane = currentPane - 1;
        goToPane(currentPane);
    }
}

function goToNext() {
    if (currentPane < getAllPanes().length - 1) {
        currentPane = currentPane + 1;
        goToPane(currentPane);
    } else {
        return;
    }
}
function resetMaterials() {
    selectedMaterials = [];
    subItem.classList.remove('focused')
     let result = [...getAllPanes()]
        .filter(pane=>pane.hasAttribute('data-material'))
        .map(pane => pane.dataset.selected = 'false')
    let allInputs = document.querySelectorAll('.material-picker--selector > input')
    allInputs.forEach(input => input.checked = false)
    
}

function handleCheck(selector, pane) {
    
    if (selector.checked) {
        pane.dataset.selected = "true"
        document.querySelector('input#no-materials').checked = false;
        if (selectedMaterials.indexOf(pane) === -1) {
            selectedMaterials.push(pane)
        }
    } else {
        pane.dataset.selected = "false"
        selectedMaterials.splice(selectedMaterials.indexOf(pane), 1)
    }
    selectedMaterials.sort(mat.sortSelected)
    mat.updateNodeMaterials()
}

function addNavButtons() {
    let buttonSection = main.lastElementChild
    main.removeChild(buttonSection)
    // TODO: switch statement depending on the pane state
    if (minimumRequirements) {
        main.appendChild(build.addSubmit())
    } else {
        main.appendChild(build.addNextPrev())
    }
    if (mainBlock.offsetHeight >= (window.innerHeight * 0.8)) {
        main.style.marginBottom = `${main.lastElementChild.offsetHeight}px`
    } else {
        main.style.marginBottom = `0em`
    }
}

function findPaneContaining(element){
    let testElement = element.parentElement;
    while(!testElement.hasAttribute('data-name') && (!testElement.hasAttribute('data-material'))){
        testElement = testElement.parentElement
    }
    return testElement;
}

function initValidateOnType(){
       function validateForm(e) {
           validate.checkSection(e, findPaneContaining(this))
           minimumRequirements = validate.checkSubmit()
           addNavButtons()
       }
    // function validateOnListen(){}
    main.querySelectorAll('input').forEach(input => { 
        input.addEventListener('keyup', validateForm)
        input.addEventListener('click', validateForm, {once: false})
    })
    
}
const initForm = () => {
    // allSinglePanes.forEach(pane => (pane.dataset.name == 'Submit') ? null : pane.appendChild(build.buttons()));
    main.appendChild(build.addNextPrev())
    build.buildMaterialPicker()
    build.addMaterialInputs();

    // allWithLabel.forEach(label => build.addVerify(label))
    addVerify.forEach(label => build.addVerify(label))

    navListMain.forEach(node => node.addEventListener('click', () => goToSelected(node.querySelector('a').innerText)))
    addNavButtons()

    initValidateOnType();
   
    getAllPanes().forEach(section => build.addErrorBox(section))  
}


// document.addEventListener('scroll',(e)=>console.log(e))
initForm()
export {
    goToNext,
    goToPrev,
    handleCheck,
    subItem,
    getAllPanes,
    currentPane,
    goToPane,
    selectedMaterials,
    navListMain,
    resetMaterials,
    displayError
}