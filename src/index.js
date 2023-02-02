
const {getPricesFromWhitebit} = require("./components/WhiteBitAPI/WBAPI")
const {getBinance} = require("./components/binanceAPI/binanceAPI")
const {binanceBalances} = require("./components/binanceAPI/binanceGetBalanceApi")
const {TelegramSendMessage} = require("./components/tg")
const {
    buyBinanceAsk, 
    buyWhiteBitAsk, 
    sellBinanceBid, 
    sellWhiteBitBid
} = require("./components/tradingFuncions/funcions")
const {GetBalanceWhiteBit} = require("./components/WhiteBitAPI/getBalancaWhiteBit")
const {TradeWhiteBitUSDTUAH} = require("./components/WhiteBitAPI/buyMarketFunctionWhiteBit")
const {binanceTradeMarket} = require("./components/binanceAPI/binanceTrade")


// const TelegramApi = require('node-telegram-bot-api')
// const token = `5829019153:AAHVM8k0q3DB_vXxHzS3hr2Kf3PoCge7TNk`
// const bot = new TelegramApi(token, {polling: true});

const usdtUahPrice = {
	Binance: {
		UsdtUah: {
			Bid : {
                Price : null,
                Volume : null
            },
			Ask : {
                Price : null,
                Volume : null
            }
		}
	},
	WhiteBit: {
		UsdtUah: {
            Bid : {
                Price : null,
                Volume : null
            },
			Ask : {
                Price : null,
                Volume : null
            }
		}
	}
}


getPricesFromWhitebit(usdtUahPrice, 1000)
getBinance(usdtUahPrice, 1000)


let balanceWhiteBit = {
    usdt: null,
    uah: null
}
let balanceBinance = {
    usdt: null,
    uah: null
}


function getPrices() {
    const BinanceAsk = [
        "Binance Ask: ",
        Number(usdtUahPrice.Binance.UsdtUah.Ask.Price),
        Number(usdtUahPrice.Binance.UsdtUah.Ask.Volume)
    ]
    const WhiteBitAsk = [
        "WhiteBit Ask: ",
        Number(usdtUahPrice.WhiteBit.UsdtUah.Ask.Price), 
        Number(usdtUahPrice.WhiteBit.UsdtUah.Ask.Volume)
    ]
    const BinanceBid = [
        "Binance Bid: ",
        Number(usdtUahPrice.Binance.UsdtUah.Bid.Price), 
        Number(usdtUahPrice.Binance.UsdtUah.Bid.Volume)
    ]
    const WhiteBitBid = [
        "WhiteBit Bid: ",
        (usdtUahPrice.WhiteBit.UsdtUah.Bid.Price),
        (usdtUahPrice.WhiteBit.UsdtUah.Bid.Volume)
    ]

    console.log(BinanceAsk);
    console.log(BinanceBid);
    console.log(WhiteBitAsk);
    console.log(WhiteBitBid);

    GetBalanceWhiteBit(balanceWhiteBit, "USDT", 0)
    GetBalanceWhiteBit(balanceWhiteBit, "UAH", 1)
    binanceBalances(balanceBinance)
    if (balanceWhiteBit.usdt > 500 ) {
        if ((WhiteBitBid[1] - BinanceAsk[1]) / WhiteBitBid[1] > 0.005) {
            console.log("Binance ask lower then WhiteBit bid more then 0.5%");
            TradeWhiteBitUSDTUAH("USDT_UAH", "sell", 1000)
            binanceTradeMarket("USDTUAH", "buy", (balanceBinance.uah).toFixed(2))
        }
    }
    if (balanceWhiteBit.uah > 10000) {
        if ((BinanceBid[1] - WhiteBitAsk[1]) / BinanceBid[1] > 0.003) {
            console.log("WhiteBitBid ask lower then Binance bid more then 0.5%");
            TradeWhiteBitUSDTUAH("USDT_UAH", "buy", (balanceWhiteBit.uah).toFixed(2))
            binanceTradeMarket("USDTUAH", "sell", 1000)
        }
    }


}
setInterval(getPrices, 5_000)

TelegramSendMessage(usdtUahPrice)