
var Gdax = require('gdax');
var publicClient = new Gdax.PublicClient('ETH-USD');

//insert key, passphrase, secretkey here

var authedClient = new Gdax.AuthenticatedClient(key, b64secret, passphrase);

console.log("\n==========================================\n");

// get the last trade on GDAX ( BTC/USD )
var callbackTradePub = function(err, response, data) {
    // parse and print data
    if (data) {
        // data received as array, so look at [0] for the first value
        try {
            console.log("Last trade ETH/USD");
            console.log("Price : " + parseFloat(data[0].price));
            console.log("Side  : " + data[0].side);
            console.log("Size  : " + parseFloat(data[0].size));
        }catch(e){
            console.log("Error parsing data !");
        }
    }

    console.log("\n==========================================\n");
};

// get the 24 hour stats
function callback24Hr (err, response, data) {
    // parse and print data
    if (data) {
        // data received as array, so look at [0] for the first value
        try {
            console.log("24 Hour stats");
            console.log("Open : " + parseFloat(data.open));
            console.log("High  : " + parseFloat(data.high));
            console.log("Low  : " + parseFloat(data.low));
            console.log("Volume  : " + parseFloat(data.volume));
        }catch(e){
            console.log("Error parsing data !");
        }
    }

    console.log("\n==========================================\n");
};

// Print your balance for each currency
var callbackAccounts = function(err, response, data) {
    // parse and print data
    if (data) {
        // data received as array
        try {
            console.log("Currency : " + data[2].currency);
            console.log("Balance : " + parseFloat(data[2].balance));
            console.log("Available :" + parseFloat(data[2].available))
            console.log("\n==========================================\n");
        }catch(e){
            console.log("Error parsing data !");
        }
    }
};

function updateStatus() {
    // get the last trade on GDAX ( BTC/USD )
    publicClient.getProductTrades({'limit': 1}, callbackTradePub);

    // wait to avoid overlapping on console
    setTimeout(function(){
        authedClient.getAccounts(callbackAccounts);
    }, 1500); // 1.5 secs
}

// main
publicClient.getProduct24HrStats(callback24Hr);
updateStatus();
setInterval(updateStatus, 10000); // refresh every 10 secs
