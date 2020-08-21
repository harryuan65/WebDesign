screenTitle = "harry@Harrysde-MacBook-Pro: ~";
document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById('title').innerText = screenTitle;
    document.getElementById('typezone-prefix').innerText = screenTitle;
    document.getElementById('typezone').addEventListener('keypress', (e)=>{
        if(e.key === 'Enter' || e.keyCode === 13){
          let newLine = screenTitle + " " + e.target.value + "<br>";
          document.getElementById("records").innerHTML+=newLine;
          console.log(e.target);
          console.log(newLine);
          e.target.value = "";
        }
    })
})
function add_history(text){
  var records = document.getElementById('records');
  var prev_content = records.innerHTML;
}