const TelegramApi = require('node-telegram-bot-api')
const token = `5829019153:AAHVM8k0q3DB_vXxHzS3hr2Kf3PoCge7TNk`
const bot = new TelegramApi(token, {polling: true});

function TelegramSendMessage(object) {
    let obj = object
    bot.addListener("message", (msg) => {
        const text = msg.text;
        const chadId = msg.chat.id;
        if (text === '/start') {
            bot.sendMessage(chadId, "Привет, Друг!")
            bot.sendMessage(chadId, `Тебя зовут ${msg.from.first_name}`)
            console.log(msg);
            
            function messageFromBot() {
                if (obj.WhiteBit.UsdtUah.Bid.Price - (Number(obj.Binance.UsdtUah.Ask.Price) / obj.WhiteBit.UsdtUah.Bid.Price) > 0.007) {
                    bot.sendMessage(chadId,"Binance ask lower then WhiteBit bid more then 0.5%")
                    console.log("Binance ask lower then WhiteBit bid more then 0.5%");
                }
                if (Number(obj.Binance.UsdtUah.Bid.Price) - (Number(obj.Binance.UsdtUah.Ask.Price) / Number(obj.Binance.UsdtUah.Bid.Price)) > 0) {
                        bot.sendMessage(chadId, "WhiteBit ask lower then Binance bid more then 0.5%")
                        console.log("WhiteBit ask lower then Binance bid more then 0.5%");
                    }
            }
            setInterval(messageFromBot, 10000)
        }
    })
            
}
// TelegramSendMessage()

module.exports = {TelegramSendMessage}