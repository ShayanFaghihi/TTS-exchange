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
    "header" : "Welcome",
    "home":"Home Page"
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
    "header" : "خوش آمدید",
    "home":"صفحه اول"

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
    "header" : "Bienvenida",

    "home":"Home Page"
    },
  "ch": {
    "price" : "价钱",
    "amount" : "量",
    "tradeAmount" : "交易金额",
    "buy" : "购买",
    "sell" : "卖",
    "fee" : "所有订单的交易费",
    "contract" : "合同",
    "whitePaper" : "白皮书",
    "header" : "欢迎",

    "home":"Home Page"
    },
  "ru": {
    "price" : "цена",
    "amount" : "количество",
    "tradeAmount" : "сумма сделки",
    "buy" : "купить",
    "sell" : "продавать",
    "fee" : "комиссия за торговлю по всем ордерам",
    "contract" : "договор",
    "whitePaper" : "белая бумага",
    "header" : "добро пожаловать",

    "home":"Home Page"
    },
  "fr": {
    "price" : "Prix",
    "amount" : "Montante",
    "tradeAmount" : "Montant du commerce",
    "buy" : "acheter",
    "sell" : "vendre",
    "fee" : "frais de négociation pour toutes les commandes",
    "contract" : "Contrat",
    "whitePaper" : "Papier blanc",
    "header" : "Bienvenue",

    "home":"Home Page"
    },
  "it": {
    "price" : "Prezzo",
    "amount" : "Quantità",
    "tradeAmount" : "Importo commerciale",
    "buy" : "Acquistare",
    "sell" : "Vendere",
    "fee" : "commissione di negoziazione per tutti gli ordini",
    "contract" : "Contrarre",
    "whitePaper" : "Carta bianca",
    "header" : "Benvenuta",
    "home":"Home Page"
    },
  "in": {
    "price" : "कीमत",
    "amount" : "रकम",
    "tradeAmount" : "व्यापार राशि",
    "buy" : "खरीद",
    "sell" : "बेचना",
    "fee" : "सभी आदेशों के लिए ट्रेडिंग शुल्क",
    "contract" : "अनुबंध",
    "whitePaper" : "सफ़ेद कागज",
    "header" : "स्वागत हे",
    "home":"Home Page"
    },
  "pr": {
    "price" : "Preço",
    "amount" : "Montante",
    "tradeAmount" : "Quantidade de comércio",
    "buy" : "Comprar",
    "sell" : "Vender",
    "fee" : "taxa de negociação para todos os pedidos",
    "contract" : "Contrato",
    "whitePaper" : "papel branco",
    "header" : "bem-vinda",
    "home":"Home Page"
    },
  "ar": {
    "price" : "السعر",
    "amount" : "كمية",
    "tradeAmount" : "كمية التجارة",
    "buy" : "يشترى",
    "sell" : "يبيع",
    "fee" : "رسوم التداول لجميع الطلبات",
    "contract" : "عقد",
    "whitePaper" : "ورق ابيض",
    "header" : "أهلا بك",
    "home":"Home Page"
    },
    "tr": {
      "price" : "Fiyat",
      "amount" : "Miktar",
      "tradeAmount" : "Ticaret miktarı",
      "buy" : "Satın almak",
      "sell" : "Satmak",
      "fee" : "tüm siparişler için işlem ücreti",
      "contract" : "Sözleşme",
      "whitePaper" : "Beyaz kağıt",
      "header" : "Hoşgeldiniz",
      "home":"Home Page"
      }
  }


  window.onload = () => { 
    const price = document.querySelectorAll('#price');
    const amount = document.querySelectorAll('#amount');
    const trade = document.querySelectorAll('#trade');
    const buy = document.querySelectorAll('#buy');
    const sell = document.querySelectorAll('#sell');
    const contract = document.querySelectorAll('#contract');
    const whitePaper = document.querySelectorAll('#whitePaper');

    const home = document.querySelectorAll('#home');
    const tradeFee = document.querySelectorAll('#fee');
    let header = document.querySelectorAll('#header');

    if(window.location.hash) {
      let lanInHash = window.location.hash;
      lanInHash = lanInHash.replace("#","");


       for(x of price) {
        x.textContent = data[lanInHash].price;
      }
  
      for(x of amount) {
        x.textContent = data[lanInHash].amount;
      }
  
      for(x of trade) {
        x.textContent = data[lanInHash].tradeAmount;
      }
  
      for(x of buy) {
        x.textContent = data[lanInHash].buy;
      }
  
      for(x of sell) {
        x.textContent = data[lanInHash].sell;
      }
  
      for(x of contract) {
        x.textContent = data[lanInHash].contract;
      }
  
      for(x of whitePaper) {
        x.textContent = data[lanInHash].whitePaper;
      }
  
      for(x of tradeFee) {
        x.textContent = data[lanInHash].fee;
      }
  
      for(x of header) {
        x.textContent = data[lanInHash].header;
      }
      for(x of home) {
        x.textContent = data[lanInHash].home;
      }
    }

    
  } 
  
  var reload = document.querySelectorAll('.reload');

for( i = 0 ; i <= reload.length ; i++){
    reload[i].onclick = function(){
        window.location.hash = this.getAttribute('href');
        window.location.reload();
    }
}
  

  // Get the modal

  // Get the button that opens the modal
  var modalBtn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal

  // When the user clicks on the button, open the modal
  modalBtn.onclick = function() {
  }

  // When the user clicks on <span> (x), close the modal
