screenTitle = "harry@Harrysde-MacBook-Pro: ~";
const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
const dowNames =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// drag functions
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById("bar")) {
    // if present, the header is where you move the DIV from:
    document.getElementById("bar").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
//end drag functions

document.addEventListener("DOMContentLoaded", ()=>{
    let w = document.getElementById("window");
    if(w){
      dragElement(w);
      let date = new Date();
      document.getElementById('records').innerHTML=`Last login: ${dowNames[date.getDay()].slice(0,3)} ${monthNames[date.getMonth()].slice(0,3)} ${date.getDate()} ${date.toLocaleTimeString()} on ttys002<br>`;
      setTimeout(()=>Init(), Math.random()*1000 + 500);
    }
})

function Init(){
    if(document.getElementById("window")){
      document.getElementById('title').innerText = screenTitle;
      document.getElementById('typezone-prefix').innerText = screenTitle;
      document.getElementById('typezone').addEventListener('keypress', (e)=>{
          if(e.key === 'Enter' || e.keyCode === 13){
            addHistory(e.target.value);
          }
      })
    }
}
function addHistory(text){
    let newLine = screenTitle + " " + text + "<br>";
    document.getElementById("records").innerHTML+=newLine;
    document.getElementById('typezone').value="";
}