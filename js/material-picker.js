import * as app from './app.js'
import * as build from './builder/builder.js'

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


function updateNodeMaterials() {
    const materialsNode = document.querySelector('.progress-nodes [data-node-name="Materials"]')
    materialsNode.classList.add('current')
    let selectedMaterialsDivs = [];
    
    app.selectedMaterials.forEach(material =>
        selectedMaterialsDivs.push(build.buildSubItems(material.dataset.material)))

    app.subItem.innerHTML = selectedMaterialsDivs.join('')

    if (app.selectedMaterials.length === 0) {
        app.subItem.classList.remove('focused')
    } else {
        app.subItem.classList.add('focused')
    }
    // makes the list grow and shrink
    app.subItem.style.width = `${[app.selectedMaterials.length]*10}%`;

    let createdLi = [...app.subItem.querySelectorAll('li')]

    createdLi.forEach(li => li.addEventListener('click', () => {
        goToSelectedMaterial(li.dataset.mName)
    }))
    if (app.getAllPanes()[app.currentPane].hasAttribute('data-material')) {
        let title = app.getAllPanes()[app.currentPane].dataset.material
        // animate the first toggle
        setTimeout(()=>{toggler(app.currentPane - 4)}, 600)
        createdLi.find(item => item.dataset.mName == title).classList.add('current')
    }
}
function toggler(link) {
  
    const firstSelector = app.selectedMaterials[link].querySelectorAll(`input[type="checkbox"]`)[0]
    firstSelector.checked = !firstSelector.checked;
    setTimeout(() => {
        firstSelector.checked = !firstSelector.checked
    }, 300)
}

function goToSelectedMaterial(title) {

    app.getAllPanes().forEach(pane => pane.classList.remove('current-pane'))
    let start = [...app.getAllPanes()]
                                .findIndex(pane => pane.hasAttribute('data-material'))
    let matchedLink = app.selectedMaterials
                                .findIndex(material => material.dataset.material == title)

    app.goToPane(start + matchedLink);
    // app.goToPane(app.currentPane - 4);
}

export {
    updateNodeMaterials,
    goToSelectedMaterial,
    sortSelected,
    toggler
};