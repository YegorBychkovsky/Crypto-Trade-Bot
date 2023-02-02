
const Binance = require('node-binance-api');
const binance = new Binance().options({
    APIKEY: 'oUIPkYPuJsUeEfMCJ9G0kjQ8DPXtqC16PGPSss5ECwHhSvbEw4uXv2cWyDCgVHvM',
    APISECRET: '3Lw0oLMmxIgDinZB5lN2rSljShWGbtN4esacRKzJakHPCf8oSLkLjJrSD5Z4KV7o',
    'family': 4,
});

function getBinance(object, volume) {
    let volumeOfCoins = volume

    function getUsdtUah() {
        binance.depth("USDTUAH", (error, depth, symbol) => {
            var bidKeys = Object.keys(depth.bids)
            var askKeys = Object.keys(depth.asks)
            object.Binance.UsdtUah.Bid.Price = Object.keys(depth.bids)[0]
            object.Binance.UsdtUah.Bid.Volume = depth.bids[bidKeys[0]]
            object.Binance.UsdtUah.Ask.Price = Object.keys(depth.asks)[0]
            object.Binance.UsdtUah.Ask.Volume = depth.asks[askKeys[0]]
            
            if (depth.asks[askKeys[0]] < volumeOfCoins) {
                object.Binance.UsdtUah.Ask.Price = (
                        (depth.asks[askKeys[1]] * Object.keys(depth.asks)[1]) + 
                        (depth.asks[askKeys[0]] * Object.keys(depth.asks)[0])
                    ) / (object.Binance.UsdtUah.Ask.Volume + depth.asks[askKeys[1]])
                object.Binance.UsdtUah.Ask.Volume = object.Binance.UsdtUah.Ask.Volume + depth.asks[askKeys[1]]
                
                if (object.Binance.UsdtUah.Ask.Volume < volumeOfCoins) {
                    object.Binance.UsdtUah.Ask.Price = (
                        (object.Binance.UsdtUah.Ask.Price * object.Binance.UsdtUah.Ask.Volume + 
                            (depth.asks[askKeys[2]] * Object.keys(depth.asks)[2]))) / (
                            object.Binance.UsdtUah.Ask.Volume + depth.asks[askKeys[2]])
                    object.Binance.UsdtUah.Ask.Volume = object.Binance.UsdtUah.Ask.Volume + depth.asks[askKeys[2]]

                    if (object.Binance.UsdtUah.Ask.Volume < volumeOfCoins) {
                        object.Binance.UsdtUah.Ask.Price = (
                            (object.Binance.UsdtUah.Ask.Price * object.Binance.UsdtUah.Ask.Volume + 
                                (depth.asks[askKeys[3]] * Object.keys(depth.asks)[3]))) / (
                                object.Binance.UsdtUah.Ask.Volume + depth.asks[askKeys[3]])
                        object.Binance.UsdtUah.Ask.Volume = object.Binance.UsdtUah.Ask.Volume + depth.asks[askKeys[3]]

                        if (object.Binance.UsdtUah.Ask.Volume < volumeOfCoins) {
                            object.Binance.UsdtUah.Ask.Price = (
                                (object.Binance.UsdtUah.Ask.Price * object.Binance.UsdtUah.Ask.Volume + 
                                    (depth.asks[askKeys[4]] * Object.keys(depth.asks)[4]))) / (
                                    object.Binance.UsdtUah.Ask.Volume + depth.asks[askKeys[4]])
                            object.Binance.UsdtUah.Ask.Volume = object.Binance.UsdtUah.Ask.Volume + depth.asks[askKeys[4]]
                        }
                    }
                }
            }
            if (depth.bids[bidKeys[0]] < volumeOfCoins) {
                object.Binance.UsdtUah.Bid.Price = (
                        (depth.bids[bidKeys[1]] * Object.keys(depth.bids)[1]) + 
                        (depth.bids[bidKeys[0]] * Object.keys(depth.bids)[0])
                    ) / (object.Binance.UsdtUah.Bid.Volume + depth.bids[bidKeys[1]])
                object.Binance.UsdtUah.Bid.Volume = object.Binance.UsdtUah.Bid.Volume + depth.bids[bidKeys[1]]
                
                if (object.Binance.UsdtUah.Bid.Volume < volumeOfCoins) {
                    object.Binance.UsdtUah.Bid.Price = (
                        (object.Binance.UsdtUah.Bid.Price * object.Binance.UsdtUah.Bid.Volume + 
                            (depth.bids[bidKeys[2]] * Object.keys(depth.bids)[2]))) / (
                            object.Binance.UsdtUah.Bid.Volume + depth.bids[bidKeys[2]])
                    object.Binance.UsdtUah.Bid.Volume = object.Binance.UsdtUah.Bid.Volume + depth.bids[bidKeys[2]]

                    if (object.Binance.UsdtUah.Bid.Volume < volumeOfCoins) {
                        object.Binance.UsdtUah.Bid.Price = (
                            (object.Binance.UsdtUah.Bid.Price * object.Binance.UsdtUah.Bid.Volume + 
                                (depth.bids[bidKeys[3]] * Object.keys(depth.bids)[3]))) / (
                                object.Binance.UsdtUah.Bid.Volume + depth.bids[bidKeys[3]])
                        object.Binance.UsdtUah.Bid.Volume = object.Binance.UsdtUah.Bid.Volume + depth.bids[bidKeys[3]]

                        if (object.Binance.UsdtUah.Bid.Volume < volumeOfCoins) {
                            object.Binance.UsdtUah.Bid.Price = (
                                (object.Binance.UsdtUah.Bid.Price * object.Binance.UsdtUah.Bid.Volume + 
                                    (depth.bids[bidKeys[4]] * Object.keys(depth.bids)[4]))) / (
                                    object.Binance.UsdtUah.Bid.Volume + depth.bids[bidKeys[4]])
                            object.Binance.UsdtUah.Bid.Volume = object.Binance.UsdtUah.Bid.Volume + depth.bids[bidKeys[4]]
                        }
                    }
                }
            }
        });

    }
    // getUsdtUah()
    setInterval(getUsdtUah, 3000);
}
// getBinance()
module.exports = {getBinance}
