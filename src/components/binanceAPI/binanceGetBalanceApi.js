const Binance = require('node-binance-api');
const binance = new Binance().options({
    APIKEY: 'oUIPkYPuJsUeEfMCJ9G0kjQ8DPXtqC16PGPSss5ECwHhSvbEw4uXv2cWyDCgVHvM',
    APISECRET: '3Lw0oLMmxIgDinZB5lN2rSljShWGbtN4esacRKzJakHPCf8oSLkLjJrSD5Z4KV7o',
    'family': 4,
});


function binanceBalances(obj) {
    binance.balance((error, balances) => {
        if ( error ) return console.error(error);
        // console.info("USDT balance: ", balances.USDT.available);
        obj.usdt = Number(balances.USDT.available)
        console.log("Binance USDT balance: ", obj.usdt);
    });
    binance.balance((error, balances) => {
        if ( error ) return console.error(error);
        // console.info("USDT balance: ", balances.USDT.available);
        obj.uah = Number(balances.UAH.available)
        console.log("Binance UAH balance: ", obj.uah);
    });
}

// binanceTrade(balanceBinance)

module.exports = {binanceBalances}
