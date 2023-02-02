function GetBalanceWhiteBit(object, currency, number) {
    let crypto = require('crypto');
    let https = require('https');
    let apiKey = //Enter your APIKEY;
    let apiSecret = //Enter your APISECRET;
    let request = '/api/v4/trade-account/balance';
    let hostname = 'whitebit.com';
    let nonce = Date.now();
    let nonceWindow = true;
    let chosenCurrency = `${currency}`
    let data = {
        currency: chosenCurrency,
        'ticker': chosenCurrency, //for example for obtaining trading balance for BTC currency
        request: request,
        nonce: nonce,
        nonceWindow: nonceWindow
    }
    let dataJsonStr = JSON.stringify(data);
    let payload = Buffer.from(dataJsonStr).toString('base64');
    let hash = crypto.createHmac('sha512', apiSecret);
    let signature = hash.update(payload).digest('hex');
    let options = {
        hostname: hostname,
        path: request,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-TXC-APIKEY': apiKey,
            'X-TXC-PAYLOAD': payload,
            'X-TXC-SIGNATURE': signature
        }
    }
    // var obj = {12859: 1, 12860: 2, 12861: 3}
    let keys = Object.keys(object); //получаем ключи объекта в виде массива
    // console.log(obj[keys[0]]); // первый элемент
    // console.log(obj[keys[keys.length - 1]]); //последний элемент
    const req = https.request(options, res => {
        res.setEncoding('utf8')
        // console.log(`statusCode: ${res.statusCode}`)
        let responseBody = '';
        res.on('data', chunk => {
            responseBody += chunk;
            const openChunk = JSON.parse(chunk)
            object[keys[number]] = Number(openChunk.available)
            console.log(`WhiteBit ${currency} balance: `, object[keys[number]]);
        });
        res.on('end', () => {
            if (res.statusCode !== 200) {
                console.error("Api call failed with response code", res.statusCode);
            }
            // console.log(`${data.currency}: `, responseBody);
        });
    })
    req.on('error', error => {
        console.error("Request error", error);
    })
    req.write(dataJsonStr);
    req.end()
    // return object
}

module.exports = {GetBalanceWhiteBit}