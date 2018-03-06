function hideTogglePanels() {
  var panels = document.querySelectorAll(".toggled");
  if(!panels) { return; }
  for (i = 0; i < panels.length; ++i) {
    panels[i].classList.add("hidden");
  }
}

// simple button click event handler
function btnHandler(selector, callback) {
  var btns = document.querySelectorAll(selector);
  if(!btns) { return; }
  for (i = 0; i < btns.length; ++i) {
    btns[i].addEventListener('click', function(event) {
      event.preventDefault();
      callback(event);
    }, false);
  }
}

// toggle the view of a hidden toggler panel
btnHandler('.toggler', function(event){
  var container =  event.target.parentElement.parentElement;
  var panel = container.querySelector(".toggled");
  panel.classList.toggle('hidden');
})


hideTogglePanels()
