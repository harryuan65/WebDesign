LOAD_TIME = 300; //ms
screenTitle = "harry@Harrysde-MacBook-Pro: ~";
const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
const dowNames =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


// Object.entries(file).map((pair,i)=>(pair[1]))
var files = [
  {
    permission: "drwxr-xr-x",
    links: 5,
    user: 'harry',
    group: 'staff',
    fileSize: '160',
    lastModifiedAt: '8 22 12:37',
    name: '.',
  },
  {
    permission: "drwxr-xr-x",
    links: 6,
    user: 'harry',
    group: 'staff',
    fileSize: '192',
    lastModifiedAt: '8 22 12:37',
    name: '..',
  },
  {
    permission: "-rw-r--r--",
    links: 1,
    user: 'harry',
    group: 'staff',
    fileSize: '3007',
    lastModifiedAt: '8 22 13:03',
    name: 'about.md',
  },
  {
    permission: "-rw-r--r--",
    links: 1,
    user: 'harry',
    group: 'staff',
    fileSize: '376',
    lastModifiedAt: '8 21 10:53',
    name: 'help.txt',
  },
]

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
      setTimeout(()=>Init(), Math.random()*100 + LOAD_TIME);
    }
    // document.getElementById('body').addEventListener('click', ()=>{
    //   document.getElementById("typezone").focus();
    // })
})
function Init(){
    if(document.getElementById("window")){
      document.getElementById('title').innerText = screenTitle;
      document.getElementById('typezone-prefix').innerText = screenTitle;
      document.getElementById('typezone').addEventListener('keypress', (e)=>{
          if(e.key === 'Enter' || e.keyCode === 13){
            handleCmd(e.target.value);
          }
      })
      document.getElementById("typezone").focus();
    }
}
function addHistory(text, response=""){
    // let newLine = screenTitle + " " + text + "<br>";
    let repeatInput = `${screenTitle} ${text}<br>`;
    let newLine = repeatInput + response + '<br>';
    document.getElementById("records").innerHTML+=newLine;
    document.getElementById('typezone').value="";
}
function handleCmd(text){
  var regexes = [/^ls\s*$|^ls(\s-[a|l|s|h]*)*$/g, ];
  var cmdMatchGroup = [];
  text = text.trim(); //remove trailing white space;
  regexes.forEach(reg=>{
    cmdMatchGroup = text.match(reg);
    if(cmdMatchGroup){
      return
    }
  })
  if(cmdMatchGroup){
    var cmds = cmdMatchGroup[0].includes(' ') ? cmdMatchGroup[0].split(' ') : [cmdMatchGroup[0]];
    switch(cmds[0]){
      case "ls":
        let opts = cmds[1] ? cmds[1].split('') : [];
        if(opts.length > 0 && opts[0]!=="-"){
          addHistory(opts.slice(1,opts.length).join() + ": No such file or directory");
        }
        else{
          addHistory(text, ls(opts));
        }
        break;
      default:
        addHistory(text, `zsh: command not found/supported: ${text}`);
    }
  }
  else{
    addHistory(text, `zsh: command not found/supported: ${text}`);
  }
}

function ls(opts=[]){
  // for now supports -a -l -s -h
  let lines = [];
  let inline = false;
  if (opts.includes("l")){
    let lengthMapping = [10, 1, 5, 5, 6, 1, 2, 4, 0]
     // file obj -> map values only -> join to single line
    lines = files.map(e=>{return Object.entries(e).map((pair, i)=>{return pair[1].toString().padStart(lengthMapping[i], '^').replace(/\^/g,'&nbsp;')}).join('&nbsp;')})

    inline = false;
  }
  else{
    lines = files.map(e=>{return e.name})
    inline = true
  }
  if (!opts.includes("a")){
    lines = lines.slice(2, lines.length);
  }
  return inline ? lines.join("&nbsp;&nbsp;") : lines.join("<br>") ;
}
