
function getPricesFromWhitebit(object, volume) {
	const URL = 'https://whitebit.com/api/v4/public/orderbook/USDT_UAH?limit=4&level=2' 
	
	let UsdtUahBidPriseWhiteBit = null
	let UsdtUahAskPriseWhiteBit = null

	function getPrice() {
		fetch(URL)
		.then((response) => {
			if (response.status === 404) {
				console.warn("404, Invalid name of city");
				reject("404, Invalid name of city")
			}
			return response.json()
		})
		.then((json) => {
			object.WhiteBit.UsdtUah.Bid.Price = Number(json.bids[0][0])
			object.WhiteBit.UsdtUah.Bid.Volume = Number(json.bids[0][1])
			object.WhiteBit.UsdtUah.Ask.Price = Number(json.asks[0][0])
			object.WhiteBit.UsdtUah.Ask.Volume = Number(json.asks[0][1])
			let volumeOfCoins = volume
			
			
			if (object.WhiteBit.UsdtUah.Bid.Volume < volumeOfCoins) {
				object.WhiteBit.UsdtUah.Bid.Volume += Number(json.bids[1][1])
				object.WhiteBit.UsdtUah.Bid.Price = 
				(Number(json.bids[0][0]) * Number(json.bids[0][1]) + 
				Number(json.bids[1][0]) * Number(json.bids[1][1])) / 
				object.WhiteBit.UsdtUah.Bid.Volume
				
				if (object.WhiteBit.UsdtUah.Bid.Volume < volumeOfCoins) {
					object.WhiteBit.UsdtUah.Bid.Price = (
					(object.WhiteBit.UsdtUah.Bid.Price * object.WhiteBit.UsdtUah.Bid.Volume + 
					(Number(json.bids[2][0]) * Number(json.bids[2][1]))) / 
					(object.WhiteBit.UsdtUah.Bid.Volume + Number(json.bids[2][1])))
					object.WhiteBit.UsdtUah.Bid.Volume += Number(json.bids[2][1])
					
					if (object.WhiteBit.UsdtUah.Bid.Volume < volumeOfCoins) {
						object.WhiteBit.UsdtUah.Bid.Price = (
							(object.WhiteBit.UsdtUah.Bid.Price * object.WhiteBit.UsdtUah.Bid.Volume + 
							(Number(json.bids[3][0]) * Number(json.bids[3][1]))) / 
							(object.WhiteBit.UsdtUah.Bid.Volume + Number(json.bids[3][1])))
						object.WhiteBit.UsdtUah.Bid.Volume += Number(json.bids[3][1])
					}
				}
			}	
			if (object.WhiteBit.UsdtUah.Ask.Volume < volumeOfCoins) {
				object.WhiteBit.UsdtUah.Ask.Volume += Number(json.asks[1][1])
				object.WhiteBit.UsdtUah.Ask.Price = 
				(Number(json.asks[0][0]) * Number(json.asks[0][1]) + 
				Number(json.asks[1][0]) * Number(json.asks[1][1])) / 
				object.WhiteBit.UsdtUah.Ask.Volume
				
				if (object.WhiteBit.UsdtUah.Ask.Volume < volumeOfCoins) {
					object.WhiteBit.UsdtUah.Ask.Price = (
					(object.WhiteBit.UsdtUah.Ask.Price * object.WhiteBit.UsdtUah.Ask.Volume + 
					(Number(json.asks[2][0]) * Number(json.asks[2][1]))) / 
					(object.WhiteBit.UsdtUah.Ask.Volume + Number(json.asks[2][1])))
					object.WhiteBit.UsdtUah.Ask.Volume += Number(json.asks[2][1])
					
					if (object.WhiteBit.UsdtUah.Ask.Volume < volumeOfCoins) {
						object.WhiteBit.UsdtUah.ask.Price = (
							(object.WhiteBit.UsdtUah.Ask.Price * object.WhiteBit.UsdtUah.Ask.Volume + 
							(Number(json.asks[3][0]) * Number(json.asks[3][1]))) / 
							(object.WhiteBit.UsdtUah.Ask.Volume + Number(json.asks[3][1])))
						object.WhiteBit.UsdtUah.Ask.Volume += Number(json.asks[3][1])
					}
				}
			}	
		})
	}
	// getPrice()
	setInterval(getPrice , 3000)
}	
module.exports = {getPricesFromWhitebit}
