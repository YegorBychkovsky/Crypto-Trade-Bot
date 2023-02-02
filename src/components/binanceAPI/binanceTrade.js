const Binance = require('node-binance-api');
const binance = new Binance().options({
    APIKEY: 'oUIPkYPuJsUeEfMCJ9G0kjQ8DPXtqC16PGPSss5ECwHhSvbEw4uXv2cWyDCgVHvM',
    APISECRET: '3Lw0oLMmxIgDinZB5lN2rSljShWGbtN4esacRKzJakHPCf8oSLkLjJrSD5Z4KV7o',
    'family': 4,
});

// let quantity = 1;
function binanceTradeMarket (currency, side, vol) {
    if (side === "sell") {
        binance.marketSell(`${currency}`, Number(vol));
        console.log("Binance Sell Status 200");
    }
    if (side === "buy") {
        binance.marketBuy(`${currency}`, Number(vol));
        console.log("Binance Buy Status 200");
    }

}

// binanceTradeMarket("USDTUAH", "sell", 15)

module.exports = {binanceTradeMarket}
