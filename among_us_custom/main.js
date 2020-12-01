var i = 0; //used to check which char is printing now
var name = "";
var txt = ' was An imposter';
var speed = 20;

function setName(){
  name = document.getElementById('input-name').value;
  txt = name + txt;
  document.getElementById('name').innerText = name;
  console.log(txt);
}
function startAnimation(){
  if(name===""){
    alert("Please set name");
  }else{
    document.getElementById('wrap-input').classList.add("fade-out");
    document.getElementById('player-wrap').style.animationPlayState = "running";
    setTimeout(typing, 6000);
    this.disabled = true;
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

// window.onload = () => {
//   setTimeout(typing, 6000);
// }