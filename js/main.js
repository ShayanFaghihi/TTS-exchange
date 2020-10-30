let primaryToken = document.getElementsByClassName('pri-token');
let secondaryToken = document.getElementsByClassName('sec-token');
let table = document.querySelector('#token-table');
let buttons = document.querySelectorAll('tr');


buttons.forEach(button => {
  button.addEventListener("click", function() {
    buttons.forEach(btn => btn.classList.remove("token-selected"));
    this.classList.add("token-selected");
  });
});

function token(id) {
  let tbody = table.getElementsByTagName('tbody')[0]
  let rows = tbody.getElementsByTagName('tr');
  for (i = 0; i < rows.length; i++) {
    rows[i].onclick = function() {
      for( j = 0; j < primaryToken.length; j++) {
        primaryToken[j].textContent = table.rows[this.rowIndex].cells[0].innerHTML;
            
      }
      for(j = 0; j < secondaryToken.length; j++) {
        secondaryToken[j].textContent = table.rows[this.rowIndex].cells[2].innerHTML;
      }
    }
    
  }

}





// Language
var language; 
function getLanguage() {
(localStorage.getItem('language') == null) ? setLanguage('en') : false;
$.ajax({ 
url:  '../language/' +  localStorage.getItem('language') + '.json', 
dataType: 'json', async: false, dataType: 'json', 
success: function (lang) { language = lang } });

}



function setLanguage(lang) {
localStorage.setItem('language', lang);
}


$(document).ready(function(){
  $('#div1').text(language.contract);
  });