fetch('https://api.tts.best/api/get_price').then((response) => {
    response.json().then((res) => {
        HEALTH = res.health;
        document.getElementById("sellPrice").textContent = (res.pureValue / 1000000).toPrecision(10);
        document.getElementById("sellPrice1").textContent = (res.pureValue / 1000000).toPrecision(10);
        document.getElementById("buyPrice").textContent = (res.msg / 1000000).toPrecision(10);
        document.getElementById("buyPrice1").textContent = (res.msg / 1000000).toPrecision(10);
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
            document.getElementById("sellPrice").textContent = (res.pureValue / 1000000).toPrecision(10);
            document.getElementById("sellPrice1").textContent = (res.pureValue / 1000000).toPrecision(10);
            document.getElementById("buyPrice").textContent = (res.msg / 1000000).toPrecision(10);
            document.getElementById("buyPrice1").textContent = (res.msg / 1000000).toPrecision(10);
            calcBuyTTSValue();
            calcSellTTSValue();

        })
    }).catch((reason => {

    }))

}, 2000);


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
const BACKEND_ADDRESS = "TNbzbf6QGFsJNfY3Qu3esaPTrJwKAACLi3";
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
                        document.getElementById("tts-balance").textContent = (parseInt(res[0].toString()) / (10 ** 12)) / 1000000;
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
    alert("No Tron Wallet detected!")//todo show modal
}).catch((res) => {
    alert("No Tron Wallet detected!")//todo show modal
});


function sellTTS() {
    if (document.getElementById("sumSellPrice").textContent > FEE_PRICE) {
        if (tron.defaultAddress.base58) {
            triggerContractCallArgs('approveAndCall', [BACKEND_ADDRESS, document.getElementById("sellAmount")
                .textContent * 1000000000000000000, ""]).then(function (res) {
                alert(res);
            }, () => {
            });
        } else {
            alert("No Tron Wallet detected!")//todo show modal
        }
    } else {
        alert("You Have to buy more than our Fee Value!")//todo show modal
    }
}

function calcBuyTTSValue() {
    if (document.getElementById("buyAmount").value *
        document.getElementById("buyPrice").textContent + FEE_PRICE) {
        document.getElementById("sumBuyPrice").textContent = (document.getElementById("buyAmount").value *
            document.getElementById("buyPrice").textContent);
    }
}

function calcSellTTSValue() {
    if (document.getElementById("sellAmount").value *
        document.getElementById("sellPrice").textContent * THEIR_PERCENT)

        document.getElementById("sumSellPrice").textContent = document.getElementById("sellAmount").value *
            document.getElementById("sellPrice").textContent * THEIR_PERCENT;
}

async function buyTTS() {
    if (HEALTH && tron&& document.getElementById("sumBuyPrice").textContent > FEE_PRICE) {
        var tx = await tron.transactionBuilder.sendTrx(BACKEND_ADDRESS, 1000000*(document.getElementById("sumBuyPrice").textContent + FEE_PRICE))
        var signedTx = await tron.trx.sign(tx)
        var broadcastTx = await tron.trx.sendRawTransaction(signedTx)
        console.log(broadcastTx)
    } else if(!HEALTH) {
        alert("There is a connection Issue to Backend, please come back")//todo show modal
    }
    else if(!tron) {
        alert("There is a connection Issue to wallet, please come back with a wallet")//todo show modal
    }else {

        alert("Less than our Minimum Fee")//todo show modal
    }
}