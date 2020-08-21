screenTitle = "harry@Harrysde-MacBook-Pro: ~";
const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
const dowNames =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
document.addEventListener("DOMContentLoaded", ()=>{
    let date = new Date();
    document.getElementById('records').innerHTML=`Last login: ${dowNames[date.getDay()].slice(0,3)} ${monthNames[date.getMonth()].slice(0,3)} ${date.getDate()} ${date.toLocaleTimeString()} on ttys002<br>`;
    setTimeout(()=>Init(), Math.random()*1500 + 400);
})

function Init(){
    document.getElementById('title').innerText = screenTitle;
    document.getElementById('typezone-prefix').innerText = screenTitle;
    document.getElementById('typezone').addEventListener('keypress', (e)=>{
        if(e.key === 'Enter' || e.keyCode === 13){
          addHistory(e.target.value);
        }
    })
}
function addHistory(text){
    let newLine = screenTitle + " " + text + "<br>";
    document.getElementById("records").innerHTML+=newLine;
    document.getElementById('typezone').value="";
}