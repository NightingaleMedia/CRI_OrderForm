import * as build from './builder/builder.js'

var currentPane = 0;
var allPanes = getAllPanes();
var minimumRequirements = false;

function getAllPanes() {
    return document.querySelectorAll('[data-selected="true"]')
}

const allWithLabel = document.querySelectorAll('.withLabel')

const progressNode = document.querySelectorAll('.progress-nodes > ul > li')
const progressArray = [...progressNode]
const materialsNode = progressArray.find(node => node.dataset.nodeName == "Materials")

const subItem = document.querySelector('.sub-item--ul');
const subItemItems = subItem.querySelectorAll('li')

let selectedMaterials = [];

const allSinglePanes = document.querySelectorAll('.single-pane')
let allSinglePanesArray = [...document.querySelectorAll('.single-pane')]

const main = document.querySelector('.main-form')
const mainBlock = document.querySelector('.main-block')
// var bottomNav = main.lastElementChild;

function sortSelected(a, b) {
    var x = a.dataset.material.toLowerCase();
    var y = b.dataset.material.toLowerCase();
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
}
const progressBar = document.querySelector('.progress-nodes--completed')

function updateNodeProgress() {
    let percent;
    let currentPaneName = getAllPanes()[currentPane].dataset.name
    let currentNo = progressArray.findIndex(node => currentPaneName == node.querySelector('a').innerText)
    let updatedNode = progressArray.find(node => currentPaneName == node.querySelector('a').innerText)
    progressNode.forEach(node => node.classList.remove('current'))

    if (getAllPanes()[currentPane].hasAttribute('data-material') ||
        getAllPanes()[currentPane].dataset.name == 'Materials') {

        //hides everything besides the materials node on small screens
        progressArray.map(link => (link.dataset.nodeName != "Materials") ? link.firstChild.classList.add('big-list-hide') : null)

        subItem.classList.add('focused')
        materialsNode.classList.add('current')
        updateNodeMaterials()
  

        //goToSelected needs a title
    } else if (subItem.classList.contains('focused')) {
        subItem.classList.remove('focused')
        subItem.innerHTML = '';
        
    }
    try{ 
    updatedNode.classList.add('current')
    progressArray.map(link => link.firstChild.classList.remove('big-list-hide'))
    } catch(error){
       
    }

    percent = 100 * (currentNo / (progressNode.length - 1));
    progressBar.style.width = `${percent}%`
}
function addNavButtons(){
console.log('added navs')
let buttonSection = main.lastElementChild
main.removeChild(buttonSection)

 if (minimumRequirements) {
     main.appendChild(build.addSubmit())
 } else {
     main.appendChild(build.addNextPrev())
 }
 if(mainBlock.offsetHeight >= (window.innerHeight * 0.9)){ 
     main.style.marginBottom = `${main.lastElementChild.offsetHeight}px`
 } else{
     main.style.marginBottom = `0em`
 }



}
function goToPane(number) {

    getAllPanes().forEach(pane => {
        pane.classList.remove('current-pane')
    })
    
    currentPane = number;
    let d = getAllPanes()[currentPane]
   
    d.classList.add('current-pane')
    addNavButtons();
    updateNodeProgress();
}

const updateNodeMaterials = () => {

    let selectedMaterialsLi = [];
    selectedMaterials.forEach(material => selectedMaterialsLi.push(build.buildSubItems(material.dataset.material)))
    subItem.innerHTML = selectedMaterialsLi.join('')

    if(selectedMaterialsLi.length==0){
       subItem.classList.remove('focused')
    }
    else{
        subItem.classList.add('focused')
    }
    subItem.style.width = `${[selectedMaterials.length]*10}%`;

    subItemItems.forEach(item => item.classList.remove('current'))
    let createdLi = [...subItem.querySelectorAll('li')]
    createdLi.forEach(li => li.addEventListener('click', () => {
        goToSelectedMaterial(li.dataset.mName)
    }))
    if (getAllPanes()[currentPane].hasAttribute('data-material')) {
        let title = getAllPanes()[currentPane].dataset.material
        createdLi.find(item => item.dataset.mName == title).classList.add('current')
    }

}

function goToSelectedMaterial(title) {
    getAllPanes().forEach(pane => pane.classList.remove('current-pane'))
    let start = [...getAllPanes()].findIndex(pane => pane.hasAttribute('data-material'))
    let matchedLink = selectedMaterials.findIndex(material => material.dataset.material == title)

    // animate the first toggle
    const toggler = function () {
        const firstSelector = selectedMaterials[matchedLink].querySelectorAll(`input[type="checkbox"]`)[0]
        firstSelector.checked = !firstSelector.checked;
        setTimeout(() => {
            firstSelector.checked = !firstSelector.checked
        }, 300)
    }
    setTimeout(toggler, 800);

    currentPane = start + matchedLink;
    getAllPanes()[currentPane].classList.add('current-pane');
    addNavButtons();
    updateNodeMaterials();

}

function goToSelected(title) {
    let paneSelected = [...getAllPanes()].findIndex(pane => pane.dataset.name == title);
    currentPane = paneSelected;
    goToPane(currentPane)
 
}

function goToPrev() {
    if (currentPane < 1) {
        console.log(this)
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

function handleCheck(selector, pane) {
    if (selector.checked) {
        pane.dataset.selected = "true"
        if (selectedMaterials.indexOf(pane) === -1) {
            selectedMaterials.push(pane)
        }
    } else {
        pane.dataset.selected = "false"
        selectedMaterials.splice(selectedMaterials.indexOf(pane), 1)
    }
    selectedMaterials.sort(sortSelected)
    updateNodeMaterials()
}

function buildMaterialPicker() {

    let matPane = document.querySelector(`[data-name="Materials"]`)
    let matPaneInner = matPane.querySelector('.form-values')
    let allMaterialPanes = allSinglePanesArray.filter(pane => pane.hasAttribute('data-material'))

    allMaterialPanes.map(pane => {
        let icon = pane.querySelector('.divide > h2')

        let picker = new build.inputMaker(pane.dataset.material, 'material-picker--selector')
            .labelText(`${icon.parentElement.innerHTML}`)
        matPaneInner.appendChild(picker.render());
        picker.input.addEventListener('change', function(){handleCheck(this,  pane)})
    })
}
//builds the buttons

const initForm = () => {
    // allSinglePanes.forEach(pane => (pane.dataset.name == 'Submit') ? null : pane.appendChild(build.buttons()));
    main.appendChild(build.addNextPrev())
    buildMaterialPicker()
    build.addMaterialInputs();
    allWithLabel.forEach(label => build.addVerify(label))
    progressNode.forEach(node => node.addEventListener('click', () => goToSelected(node.querySelector('a').innerText)))
    subItemItems.forEach(item => item.addEventListener('click', () => goToSelectedMaterial(item.dataset.mName)))
    main.querySelectorAll('input').forEach(input => input. addEventListener('focus', addNavButtons))
}

window.addEventListener('load', () => {
    initForm()
})
// document.addEventListener('scroll',(e)=>console.log(e))

export {
    goToNext,
    goToPrev
}