
    class buttonMaker {
        constructor(text, id, type, action) {
            this.button = document.createElement('button');
            this.button.innerText = text;
            this.button.id = id;
            this.button.type = type;
            this.button.addEventListener('click', action)
        }
        render() {
            return this.button;
        }
    }
// const next = document.querySelector('#btn-next')
// const prev = document.querySelector('#btn-prev')


var currentPane = 0;
const allPanes = document.querySelectorAll('.single-pane')
const allPanesArray = [...allPanes]

const allUnitSelected = document.querySelectorAll('.label-input-quantity')
const allWithLabel = document.querySelectorAll('.withLabel')

const progressNode = document.querySelectorAll('.progress-nodes > ul > li')
const progressArray = [...progressNode]
const materialsNode = progressArray.find(node => node.dataset.nodeName == "Materials")


const subItem = document.querySelector('.sub-item--ul');
const subItemItems = subItem.querySelectorAll('li')
const subItemItemsArray = [...subItemItems]
const progressBar = document.querySelector('.progress-nodes--completed')


    function updateNodeProgress() {
        let percent;
        let currentPaneName = allPanes[currentPane].dataset.name
        let currentNo = progressArray.findIndex(node => currentPaneName == node.querySelector('a').innerText)
        let updatedNode = progressArray.find(node => currentPaneName == node.querySelector('a').innerText)
        progressNode.forEach(node => node.classList.remove('current'))

        if (allPanes[currentPane].hasAttribute('data-material')) {
            // p.forEach(node => node.firstChild.classList.add('big-list-hide'))
            progressArray.map(link => (link.dataset.nodeName != "Materials") ? link.firstChild.classList.add('big-list-hide') : null)
            subItem.classList.add('focused')
            materialsNode.classList.add('current')
            
            let currentMaterial = allPanes[currentPane].dataset.material
            goToSelectedMaterial(currentMaterial)
        } 
        else { 
        updatedNode.classList.add('current')
        paneTitle = updatedNode.querySelector('a').innerText;
        
         if (subItem.classList.contains('focused')) {
            subItem.classList.remove('focused')
            progressArray.map(link => link.firstChild.classList.remove('big-list-hide'))
            //  subItem.addEventListener('transitionend', ()=>{subItem.classList.add("sub-item-d-none")})
         }
        }
        // goToSelected(currentNo, paneTitle)
        percent = 100 * (currentNo / (progressNode.length - 1));
        progressBar.style.width = `${percent}%`
    }

function clickNode(paneTitle){
    let updated = progressArray.find(node => node.querySelector('a').innerText == paneTitle)
    updateNodeProgress(updated)
}

function goToPane(number){
    allPanes.forEach(pane => pane.classList.remove('current-pane'))
   // allPanes.forEach(pane => (pane.classList.contains('current-pane')) ? pane.classList.remove('current-pane') : null)
    allPanes[number].classList.add('current-pane')
    currentPane = number;
    updateNodeProgress();
}
function addUnitSelector(item) {
    const inputType = document.createElement('div');
    inputType.classList.add('units--holder')
    inputType.innerHTML = `<input type="checkbox" id="units--${item}" name="unit-type--${item}">
    
      <label for="units--${item}">Units</label>   
        <span></span>`;
    return inputType;
}
function addVerify(input){
    const wrapper = document.createElement('div')
    const verify = document.createElement('div')
    verify.className = 'verify'
    let newNode = input.parentElement.insertBefore(wrapper, input)
    newNode.appendChild(input)
    newNode.appendChild(verify)
    return newNode;
}
function goToSelectedMaterial(title) {
    let materialArray = [];
    allPanes.forEach(pane => pane.hasAttribute('data-material') ? materialArray.push(pane) : null )

    let start = allPanesArray.findIndex(pane => pane.hasAttribute('data-material'))
    let it = materialArray.findIndex(item => item.dataset.material == title);
       
        //animate the first toggle
        const toggler = function () {
            const firstSelector = materialArray[it].querySelectorAll(`input[type="checkbox"]`)[0]
            firstSelector.checked = !firstSelector.checked;
            setTimeout(()=>{firstSelector.checked = !firstSelector.checked}, 1000)      
          }
        setTimeout(toggler, 1300);
        
    allPanes.forEach(pane => pane.classList.remove('current-pane'))
    currentPane = start + it;
    allPanes[currentPane].classList.add('current-pane');
    subItemItems.forEach(item => item.classList.remove('current'))
    subItemItemsArray.find(item => item.dataset.mName == title).classList.add('current')
}
function goToSelected(title) {
    let paneSelected = allPanesArray.findIndex(pane => pane.dataset.name == title);
    goToPane(paneSelected)
}

function goToPrev() {
    if (currentPane < 1) {
        return;
    } else {
        currentPane = currentPane - 1;
        goToPane(currentPane);
    }
    
}
function goToNext() {
    if (currentPane < allPanes.length - 1) {
        currentPane = currentPane + 1;
        goToPane(currentPane);
    } else {
        return;
      
    }
}
//builds the buttons
function buttons() {
    const buttonz = document.createElement('div')
    buttonz.classList.add('button-section')
    const next = new buttonMaker("Next", 'btn-next', "next", goToNext)
    const prev = new buttonMaker("Previous", 'btn-prev', "prev", goToPrev)
    buttonz.appendChild(prev.render())
    buttonz.appendChild(next.render())
    return buttonz;
}

const initForm = () => {

    allPanes.forEach(pane => pane.appendChild(buttons()));
    allUnitSelected.forEach(item => {
        let itemTitle = item.querySelector('input');
        let itemSelector = item.appendChild(addUnitSelector(itemTitle.name))
        
        
        let newInput = []
        itemTitle.addEventListener('keyup', function (e) {
            
            let v = this.value;
            matchDigit = new RegExp('^[0-9]+$').test(e.key) 
            console.log("key: " + e.key)
            // itemTitle.value == e.key: itemTitle.name = '';
            if (matchDigit){
                keyPressed = e.key
                newInput.push(e.key)
            }
            if(e.key == 'Backspace'){
                this.value = '';
                newInput = [];
            } else { 
            this.value = newInput.join('');
            }
            
           

        })
        let labelTitle = itemSelector.querySelector('label')
        itemSelector.querySelector('input').addEventListener('change', function() {
        labelTitle.innerText = this.checked ? "Lbs" : "Units"
        })
    })

    allWithLabel.forEach(label=> addVerify(label))
    progressNode.forEach(node => node.addEventListener('click', ()=>{
        node.classList.contains('current') ? null : goToSelected(node.querySelector('a').innerText);
    })
    )
    subItemItems.forEach(item => item.addEventListener('click',()=> goToSelectedMaterial(item.dataset.mName)))


}

window.addEventListener('load', () => {
        initForm()
    })


