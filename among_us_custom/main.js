var i = 0; //used to check which char is printing now
var name = "";
var txt = ' was An imposter';
var speed = 25;

function setDisplayName(event){
  document.getElementById('name').innerText = event.target.value;
  name = document.getElementById('input-name').value;
}
function startAnimation(){
  if(name===""){
    alert("Please set a name!");
  }else{
    txt = name + txt;
    document.getElementById('wrap-input').classList.add("fade-out");
    document.getElementById('player-wrap').style.animationPlayState = "running";
    setTimeout(typing, 6000);
  }
}
function typing(isLast=false){
  var p = document.getElementById("narration");
  p.style.animationPlayState = 'running'
  if(i < txt.length){
      p.innerHTML += txt.charAt(i);
      i++;
      var s = Math.random()*90;
      setTimeout(typing, speed+s);
  }
  else{
    p.style.animationPlayState = 'paused'
    if(isLast) p.style.borderRight = 'none';
  }
}