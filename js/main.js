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

var languages = {
  en:{
    price : "Price",
    amount : "Amount",
    tradeAmount : "Trading Amount",
    buy : "BUY",
    sell : "SELL",
    fee : "trading fee for all orders",
    contract : "Contract",
    whitePaper : "White Paper"
  },
  fa:{
    price : "قیمت",
    amount : "مقدار",
    tradeAmount : "مقدار معامله",
    buy : "خرید",
    sell : "فروش",
    fee : "هزینه تراکنش سفارشات",
    contract : "قرارداد",
    whitePaper : "برگه سفید"
  }
}

if(window.location.hash){
  if(window.location.hash === "#fa"){
    

    priceBuy.textContent = languages.fa.price;
    priceSell.textContent = languages.fa.price;
    amountBuy.textContent = languages.fa.amount;
    amountSell.textContent = languages.fa.amount;
    buy.textContent = languages.fa.buy;
    sell.textContent = languages.fa.sell;
    feeBuy.textContent = languages.fa.fee;
    feeSell.textContent = languages.fa.fee;
    tradeBuyAmount.textContent = languages.fa.tradeAmount;
    tradeSellAmount.textContent = languages.fa.tradeAmount;
    contract.textContent = languages.fa.contract;
    whitePaper.textContent = languages.fa.whitePaper;
    
    
  }
}

var reload = document.querySelectorAll('.reload');

for( i = 0 ; i <= reload.length ; i++){
  reload[i].onclick = function(){
      window.location.hash = this.getAttribute('href');
      window.location.reload();
  }
}
