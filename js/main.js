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

