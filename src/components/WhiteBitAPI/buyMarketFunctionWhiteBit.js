function TradeWhiteBitUSDTUAH(market, side, volume) {
    let crypto = require('crypto');
    let https = require('https');
    let apiKey = '';
    let apiSecret = '';
    let request = '/api/v4/order/market';
    let hostname = 'whitebit.com';
    let nonce = Date.now();
    let nonceWindow = true;
    // let chosenCurrency = "USDT"
    let data = {
        "market": `${market}`,
        "side": `${side}`,
        "amount": `${volume}`,// Сумма монет для продажи
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
        },
    }

    const req = https.request(options, res => {
        res.setEncoding('utf8')

        console.log(`statusCode: ${res.statusCode}`)

        let responseBody = '';

        res.on('data', chunk => {
            responseBody += chunk;
            const openChunk = JSON.parse(chunk)
        });

        res.on('end', () => {
            if (res.statusCode !== 200) {
                console.error("Api call failed with response code", res.statusCode);
            }

            console.log(`${data.currency}: `, responseBody);
        });
    })
    req.on('error', error => {
        console.error("Request error", error);
    })
    req.write(dataJsonStr);
    req.end()
}

// TradeWhiteBitUSDTUAH("USDT_UAH", "buy", 395)

module.exports = {TradeWhiteBitUSDTUAH}
