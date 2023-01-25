const [body] = document.getElementsByTagName('body');

function initializeSidebar() {
  const sidebarUnit = document.createElement('div');
  const [templates] = document.getElementsByClassName('animated_layer');
  const input_thing = document.importNode(templates.content, true);
  sidebarUnit.appendChild(input_thing);
  body.appendChild(sidebarUnit);

  //사이드 바 안에 X버튼
  const [sidebarXButton] = sidebarUnit.getElementsByClassName('button_x_card');
  sidebarXButtonHandler(sidebarXButton);

  //햄버거 버튼
  addSidebar();
}

//사이드바  X버튼 설정
function sidebarXButtonHandler(sidebarXButton) {
  sidebarXButton.addEventListener('click', (_) => {
    sidebarXButton.parentNode.parentNode.style.display = 'none';
  });
}

function addSidebar() {
  const [icon] = document.getElementsByClassName('hamburger');
  const [sidebar] = document.getElementsByClassName('log_card');
  sidebar.style.display = 'none';

  icon.addEventListener('click', (_) => {
    sidebar.className = 'sidebarOn';
    sidebar.style.display = '';
  });
}

export { initializeSidebar };
