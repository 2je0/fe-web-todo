import {columnElement,cardElement,columnArray,cardArray} from '../dataStorage.js'

function innerCircleCount(currentColumnIndex){
    let i = currentColumnIndex
    let count = 0;

    cardArray.returnIndexArr().forEach(element =>{
        if(cardArray.getcard()[element].status == i)
        {
            count++;
        }
    })

    document.getElementsByClassName('circle')[i].innerHTML = count;
}

export {innerCircleCount}