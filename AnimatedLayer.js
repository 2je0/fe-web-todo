let putarea = document.getElementById('main');

function initializeSidebar(){
    let node = document.createElement('div');

    let templates = document.getElementsByClassName('animated_layer')[0];
    let input_thing = document.importNode(templates.content,true);
    node.appendChild(input_thing)
    putarea.appendChild(node);

    addSidebar()
}

function addSidebar(){
    let icon = document.getElementsByClassName('hamburger')[0]
    icon.addEventListener('mouseover',(event)=>{
       console.log("hi")
       let sidebar = document.getElementsByClassName("layer")[0];
       sidebar.style.display = "block"
    })
    icon.addEventListener('mouseout',(event)=>{
        let sidebar = document.getElementsByClassName("layer")[0];
        sidebar.style.display = "block"
    })
}

export { initializeSidebar }