fetch('https://api.tts.best/api/get_price').then((response) => {
    response.json().then((res) => {
        HEALTH = res.health;
        document.getElementById("sellPrice").textContent = (res.pureValue / 1000000).toPrecision(6);
        document.getElementById("sellPrice1").textContent = (res.pureValue / 1000000).toPrecision(6);
        document.getElementById("buyPrice").textContent = (res.msg / 1000000).toPrecision(6);
        document.getElementById("buyPrice1").textContent = (res.msg / 1000000).toPrecision(6);
        calcBuyTTSValue();
        calcSellTTSValue();

    }).catch((reason => {

    }))
}).catch((reason => {

}))
setInterval(() => {
    fetch('https://api.tts.best/api/get_price').then((response) => {
        response.json().then((res) => {
            HEALTH = res.health;
            document.getElementById("sellPrice").textContent = (res.pureValue / 1000000).toPrecision(6);
            document.getElementById("sellPrice1").textContent = (res.pureValue / 1000000).toPrecision(6);
            document.getElementById("buyPrice").textContent = (res.msg / 1000000).toPrecision(6);
            document.getElementById("buyPrice1").textContent = (res.msg / 1000000).toPrecision(6);
            calcBuyTTSValue();
            calcSellTTSValue();

        })
    }).catch((reason => {

    }))

}, 20000);


function initTronWebInstance() {

    return new Promise(function (resolve, reject) {
        let tries = 0;
        const loadFinish = function () {
            resolve(window.tronWeb);
        };

        let timer = setInterval(function () {
            if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
                clearInterval(timer);
                loadFinish();
            }
            tries++;
            if (tries > 10) {
                clearInterval(timer);
                reject();
            }
        }, 1000);
    });

}

async function triggerContractCallArgs(methodName, args) {
    let myContract = await tron.contract().at(TTSContract)
    return await myContract[methodName](args[0], args[1], args[2]).send({shouldPollResponse: true});

}

async function decodeError(data) {
    let result = await decodeParams(['string'], data, true);
    return result;
}

async function decodeParams(types, output, ignoreMethodHash) {
    const AbiCoder = ethers.utils.AbiCoder;
    const ADDRESS_PREFIX = "41";
    if (!output || typeof output === 'boolean') {
        ignoreMethodHash = output;
        output = types;
    }
    if (ignoreMethodHash && output.toString().replace(/^0x/, '').length % 64 === 8) {
        output = '0x' + output.toString().replace(/^0x/, '').substring(8);

    }
    const abiCoder = new AbiCoder();
    if (output.toString().replace(/^0x/, '').length % 64)
        throw new Error('The encoded string is not valid. Its length must be a multiple of 64.');
    return abiCoder.decode(types, output).reduce((obj, arg, index) => {
        if (types[index] == 'address')
            arg = ADDRESS_PREFIX + arg.substr(2).toLowerCase();
        obj.push(arg);
        return obj;
    }, []);
}


const AbiCoder = ethers.utils.AbiCoder;
const ADDRESS_PREFIX_REGEX = /^(41)/;

async function encodeParams(inputs) {
    let typesValues = inputs
    let parameters = ''

    if (typesValues.length == 0)
        return parameters
    const abiCoder = new AbiCoder();
    let types = [];
    const values = [];

    for (let i = 0; i < typesValues.length; i++) {
        let {type, value} = typesValues[i];
        if (type == 'address')
            value = value.replace(ADDRESS_PREFIX_REGEX, '0x');
        else if (type == 'address[]')
            value = value.map(v => toHex(v).replace(ADDRESS_PREFIX_REGEX, '0x'));
        types.push(type);
        values.push(value);
    }

    console.log(types, values)
    try {
        parameters = abiCoder.encode(types, values).replace(/^(0x)/, '');
    } catch (ex) {
        console.log(ex);
    }
    return parameters

}


let tron;
const TTSContract = "TVPCZeQsc7AWkszhNvVJrVA33oEtH9rYPE";

const TTSContractHex = "41fe2dc8d28b84b929e926382302dd5e94e915a6cf";
const BACKEND_ADDRESS = "TPJsgS8Z31vgYxbr3uJGD4Hbj7ZmscVg5H";

const BACKEND_ADDRESS_HEX = "419251d372921569af6f2e183d76cfdea6f6aff524";
const EXCHANGER_CONTRACT = "TS2Ac5bzT2pWZNDZPLZ3YqfqNGLDgiWTNS";
const FEE_PRICE = 3;//TRON
const THEIR_PERCENT = 0.9;
let HEALTH = true;
initTronWebInstance().then(function (tronWeb) {
    document.getElementById("address").textContent = tronWeb.defaultAddress.base58;
    tron = tronWeb;
    setInterval(() => {
        if (tronWeb.defaultAddress.base58 !== document.getElementById("address").textContent) {
            document.getElementById("address").textContent = tronWeb.defaultAddress.base58;
            window.location.reload();
        }
    }, 100);

    let inputs = [
        {type: 'address', value: tronWeb.defaultAddress.hex}
    ]
    let parameters = encodeParams(inputs).then(res => {
        fetch("https://api.trongrid.io/wallet/triggerconstantcontract", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": "{\"owner_address\":\"410000000000000000000000000000000000000000\",\"contract_address\":\"41fe2dc8d28b84b929e926382302dd5e94e915a6cf\",\"function_selector\":\"balanceOf(address)\",\"parameter\":\"" + res + "\"}"
        })
            .then(response => {
                response.json().then((res) => {
                    decodeParams(['uint256'], "0x" + res['constant_result'], false).then((res) => {
                        document.getElementById("tts-balance").textContent = ((parseInt(res[0].toString()) / (10 ** 12)) / 1000000).toPrecision(6);
                    })
                })
            })
            .catch(err => {
                console.error(err);
            });
    })


    fetch("https://api.trongrid.io/v1/accounts/" + tron.defaultAddress.base58, {
        "method": "GET",
        "headers": {}
    })
        .then(response => {
            response.json().then((res) => {
                if (res['data'][0]['balance'])
                    document.getElementById("tron-balance").textContent = res['data'][0]['balance'] / 1000000;
            })
        })
        .catch(err => {
            console.error(err);
        });


    // setInterval(() => {
    //     triggerContractCallArgs('balanceOf', [thiss.myAccount], tokenContractAddress, 1).then(function (res) {
    //         changeValue(thiss, parseFloat(res / (10 ** 18)).toPrecision(10), 'TTSBalance');
    //     }, () => {
    //     });
    // }, 500);


}, (res) => {
}).catch((res) => {
}).finally(() => {
    fetch("https://api.trongrid.io/wallet/triggerconstantcontract", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": "{\"owner_address\":\"410000000000000000000000000000000000000000\",\"contract_address\":\"" + TTSContractHex + "\",\"function_selector\":\"totalSupply()\"}"
    })
        .then(response => {
            response.json().then((res) => {
                decodeParams(['uint256'], "0x" + res['constant_result'], false).then((res) => {
                    document.getElementById("total-tts-minted").textContent = ((parseInt(res[0].toString()) / (10 ** 12)) / 1000000).toPrecision(12);
                })
            })
        })
        .catch(err => {
            console.error(err);
        });
    let inputs = [
        {type: 'address', value: BACKEND_ADDRESS_HEX}
    ]
    encodeParams(inputs).then(res => {
        fetch("https://api.trongrid.io/wallet/triggerconstantcontract", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": "{\"owner_address\":\"410000000000000000000000000000000000000000\",\"contract_address\":\"" + TTSContractHex + "\",\"function_selector\":\"balanceOf(address)\",\"parameter\":\"" + res + "\"}"
        })
            .then(response => {
                response.json().then((res) => {

                    console.log(res)
                    decodeParams(['uint256'], "0x" + res['constant_result'], false).then((res) => {
                        document.getElementById("total-tts-bank").textContent = ((parseInt(res[0].toString()) / (10 ** 12)) / 1000000).toPrecision(12);
                    })
                })
            })
            .catch(err => {
                console.error(err);
            });
    });

    fetch("https://api.trongrid.io/v1/accounts/" + BACKEND_ADDRESS, {
        "method": "GET",
        "headers": {}
    })
        .then(response => {
            response.json().then((res) => {
                if (res['data'][0]['balance'])
                    document.getElementById("total-tron-bank").textContent = res['data'][0]['balance'] / 1000000;
            })
        })
        .catch(err => {
            console.error(err);
        });
});

function sellTTS() {
    alert("hesy")
    showMessage("Sell TTS Receipt:\n" +
        "Paid T.T.S: " + document.getElementById("sellAmount").textContent + parseInt(FEE_PRICE) + "\n" +
        "Including " + ((1 - THEIR_PERCENT) * 100).toPrecision(6) + " % Fee\n" + "You Will be paid " +
        document.getElementById("sumSellPrice").value + " Tron\n", true
        , false);
}

function showMessage(msg, showButton, buyOrSell) {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
    const span = document.getElementsByClassName("modal-close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }
    console.log(showButton)
    if (showButton === true) {
        document.getElementById("modal-button").onclick = function () {
            if (buyOrSell)
                buyModal();
            else
                sellModal();
        }
    } else {
        document.getElementById("modal-button").style.display = "none";
    }
    document.getElementById("textError").innerText = msg;
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}

function calcBuyTTSValue() {
    if (document.getElementById("buyAmount").value *
        document.getElementById("buyPrice").textContent) {
        document.getElementById("sumBuyPrice").textContent = (document.getElementById("buyAmount").value *
            document.getElementById("buyPrice").textContent);
    }
}

function calcSellTTSValue() {
    if (document.getElementById("sellAmount").value *
        document.getElementById("sellPrice").textContent)

        document.getElementById("sumSellPrice").textContent = document.getElementById("sellAmount").value *
            document.getElementById("sellPrice").textContent;
}

async function buyTTS() {
    showMessage("Buy TTS Receipt:\n" +
        "Paid Tron: " + parseInt(parseInt(document.getElementById("sumBuyPrice").textContent) + parseInt(FEE_PRICE)) + "\n" +
        "Including " + FEE_PRICE + " Tron\n" + "You Will be paid " + document.getElementById("buyAmount").value + " T.T.S\n", true, true
    )
    ;
}

async function buyModal() {
    if (HEALTH && tron && document.getElementById("sumBuyPrice").textContent > 0) {
        console.log(parseInt(document.getElementById("sumBuyPrice").textContent) + parseInt(FEE_PRICE))
        var tx = await tron.transactionBuilder.sendTrx(BACKEND_ADDRESS, 1000000 * (parseInt(document.getElementById("sumBuyPrice").textContent) + FEE_PRICE))
        var signedTx = await tron.trx.sign(tx)
        var broadcastTx = await tron.trx.sendRawTransaction(signedTx)
        fetch('https://api.tts.best/api/buy/' + broadcastTx.txid).then((response) => {
            response.json().then((res) => {
                console.log(res)
            }).catch((reason => {
                console.log(reason)
            }))
        }).catch((reason => {
            console.log(reason)
        }))
        console.log(broadcastTx)
    } else if (!HEALTH) {
        showMessage("There is a connection Issue to Backend, please come back!")

    } else if (!tron) {
        showMessage("There is a connection Issue to wallet, please come back with a wallet!")

    } else {
        showMessage("Less than our Minimum Fee")
    }
}

function sellModal() {
    if (document.getElementById("sumSellPrice").textContent > FEE_PRICE) {
        if (tron) {
            console.log(document.getElementById("sellAmount").value)
            triggerContractCallArgs('approveAndCall', [EXCHANGER_CONTRACT, (document.getElementById("sellAmount")
                .value * 1000000000000000000).toString(), "0x10"]).then(function (res) {
                console.log(res);
            }, (err) => {
                console.log(err)
            });
        } else {

            showMessage("No Tron Wallet detected!");
        }
    } else {
        showMessage("Less than our Minimum Value!");

    }
}