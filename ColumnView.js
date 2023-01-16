import {columnElement,cardElement,columnArray,cardArray} from './dataStorage.js'
import {addCard, insertCardDom} from './CardView.js'
import {innerCircleCount} from './utils/utils.js'


function initializeColumn(i){

    let mainLocation = document.getElementById('main');
    let columnUnit = makeColumnUnit()
    let cardLayout = makeCardLayout()

    columnUnit.appendChild(cardLayout);

    let columnInputName = columnArray.getColumn()[i].name;
    let columnNameLocation = columnUnit.getElementsByClassName('list_name')[0]
    changeColumnNameEventHandler(columnNameLocation,i,columnInputName)
    mainLocation.appendChild(columnUnit);
    document.getElementsByClassName('list_name')[i].innerHTML = columnInputName;

    innerCircleCount(i)

}

function makeColumnUnit(){
    let columnUnit = document.createElement('div');
    let columnTemplates = document.getElementsByClassName('template_list')[0];
    let columnInputThing = document.importNode(columnTemplates.content,true);
    columnUnit.appendChild(columnInputThing);
    columnUnit.setAttribute('class',"addCard_here");
    return columnUnit
}

function makeCardLayout(){
    let cardLayout = document.createElement('div');
    cardLayout.setAttribute('class','cardLayout');
    return cardLayout
}

function initializeModal(){
    let modal_input_location = document.getElementById('main');
    let modal_templates = document.getElementsByClassName('todo_plus_modal')[0];
    let input_modal = document.importNode(modal_templates.content,true);
    modal_input_location.appendChild(input_modal)

    let modal_itself = document.getElementById('modal');
    modal_itself.style.display = "none"

}

//우측 하단 + 이벤트리스너
function columnAddBlueButton(){
    const button = document.getElementById('plus_list');
    button.addEventListener('click',(event) =>{
        document.getElementById('modal').style.display = ""
        onload_function()
    });
}

function addColumn(){
        let plus_item_name = document.getElementById('item_plus_name').value

        columnArray.pushColumn(new columnElement(plus_item_name))

        let input_card_index = columnArray.returnLength()-1;
        initializeColumn(input_card_index)
        let item_plus = document.getElementsByClassName("button_plus")[input_card_index];
        item_plus.addEventListener('click',function(event){
                insertCardDom(input_card_index);
        });
        document.getElementById('modal').style.display = "none"
    }
    


function onload_function(){
    let modal_close = document.getElementById('modal_close');
    modal_close.addEventListener('click',(event)=>{
        document.getElementById('modal').style.display = "none"
    })

    let modal_plus = document.getElementById('modal_plus');
    
    modal_plus.addEventListener('click',addColumn)
}

function changeColumnNameEventHandler(columnNameLocation,i,input_name){
    columnNameLocation.addEventListener('dblclick',function(event){
        if(columnNameLocation.value != input_name){
            columnArray.arr[i].setName(columnNameLocation.value)
        }
    })
}

export {initializeModal, initializeColumn,columnAddBlueButton}