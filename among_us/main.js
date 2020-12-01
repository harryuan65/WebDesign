var i = [0]; //used to check which char is printing now
var txt = 'Jamie was Un imposter';
var speed = 10;

function typing(isLast=false){
  var p = document.getElementById("narration");
  p.style.animationPlayState = 'running'
  if(i[0] < txt.length){
      p.innerHTML += txt.charAt(i[0]);
      i[0]++;
      var s = Math.random()*90;
      setTimeout(typing, speed+s);
  }
  else{
    p.style.animationPlayState = 'paused'
    if(isLast) p.style.borderRight = 'none';
  }
}

window.onload = () => {
  setTimeout(typing, 6000);
}