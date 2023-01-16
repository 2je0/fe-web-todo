import { initializeSidebar } from './AnimatedLayer.js';
import {addCard,initCardDeleteModal} from './CardView.js'
import {initializeModal, initializeColumn,columnAddBlueButton} from './ColumnView.js'
import {columnElement,cardElement,columnArray,cardArray} from './dataStorage.js'

function main(){
    initializeModal();

    columnArray.returnIndexArr().forEach(element =>{
        initializeColumn(element)
    })

    cardArray.returnIndexArr().forEach(element =>{
        addCard(element)
    })

    initializeSidebar();
    columnAddBlueButton();
}

main();