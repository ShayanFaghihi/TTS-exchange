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


// Languages
const langEl = document.querySelector('.dropdown-menu');
const link = document.querySelectorAll('a');

const price = document.querySelectorAll('#price');
const amount = document.querySelectorAll('#amount');
const trade = document.querySelectorAll('#trade');
const buy = document.querySelectorAll('#buy');
const sell = document.querySelectorAll('#sell');
const contract = document.querySelectorAll('#contract');
const whitePaper = document.querySelectorAll('#whitePaper');
const tradeFee = document.querySelectorAll('#fee');
const header = document.querySelectorAll('#header');



link.forEach(el => {
  el.addEventListener('click', () => {
    // langEl.querySelector('.active').classList.remove('active');
    // el.classList.add('active');

    const attr = el.getAttribute('language');

    for(x of price) {
      x.textContent = data[attr].price;
    }

    for(x of amount) {
      x.textContent = data[attr].amount;
    }

    for(x of trade) {
      x.textContent = data[attr].tradeAmount;
    }

    for(x of buy) {
      x.textContent = data[attr].buy;
    }

    for(x of sell) {
      x.textContent = data[attr].sell;
    }

    for(x of contract) {
      x.textContent = data[attr].contract;
    }

    for(x of whitePaper) {
      x.textContent = data[attr].whitePaper;
    }

    for(x of tradeFee) {
      x.textContent = data[attr].fee;
    }

    for(x of header) {
      x.textContent = data[attr].header;
    }

  });
});

var data = {
  "en":{
    "price" : "Price",
    "amount" : "Amount",
    "tradeAmount" : "Trading Amount",
    "buy" : "BUY",
    "sell" : "SELL",
    "fee" : "trading fee for all orders",
    "contract" : "Contract",
    "whitePaper" : "White Paper",
    "header" : "Welcome"
  },
  "fa":{
    "price" : "قیمت",
    "amount" : "مقدار",
    "tradeAmount" : "مقدار معامله",
    "buy" : "خرید",
    "sell" : "فروش",
    "fee" : "هزینه تراکنش سفارشات",
    "contract" : "قرارداد",
    "whitePaper" : "برگه سفید",
    "header" : "خوش آمدید"
  },
  "es": {
    "price" : "Precio",
    "amount" : "Cantidad",
    "tradeAmount" : "Monto de negociación",
    "buy" : "Comprar",
    "sell" : "Vender",
    "fee" : "tarifa de negociación para todos los pedidos",
    "contract" : "Contrato",
    "whitePaper" : "Papel blanco",
    "header" : "Bienvenida"
    }
  }

