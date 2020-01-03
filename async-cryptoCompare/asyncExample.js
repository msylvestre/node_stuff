require('node-json-color-stringify');
var request = require('request');
var async   = require('async');

let env       = getSSMEnv();
let pairsList = getSupportPairs();
const API_KEY = env.cryptocompareApiKey;

function getSSMEnv() {
	let env = {
		env: 'dev', //process.env.NODE_ENV,
		cryptocompareApiKey:'1afa2d288a59bf5573a80d995ea04825eb2055fede6ca2feb021e0cab2964adb'
	};

	return env;
}

function getSupportPairs() {

	let SupportedPairsList = [
		{
			id:1,
			name:  "BTCUSDs",
			base:  "BTC",
			quote: "USD",
			type:  "spot",
			active: true,
		},
		{
			id:2,
			name:  "ETHUSDs",
			base:  "ETH",
			quote: "USD",
			type:  "spot",
			active: true,

		}
	];

	return SupportedPairsList;	
}


async.each(pairsList, function(pair, cb) {
    processPair(pair, cb);
    console.log('\n === PROCESS DONE ===\n');

}, function(err) {
   if (err)
		console.log("Damn there's an error");
	else
		console.log("All DONE, thx !")
});


function processPair(pair, cb) {

	let url = { url: `https://min-api.cryptocompare.com/data/histominute?fsym=${pair.base}&tsym=${pair.quote}&limit=1&api_key=${API_KEY}` };

    request((url), function(error, response, body) {
        
        if(error) {
            console.log("error");
            cb(error);
        } 
        else if(!error && response.statusCode == 200) {
            var candleData = JSON.parse(body);
            
            dbInsert(candleData, pair.base, function() {
            	MT5Update(candleData, pair.base, cb);	
            });
            
        }

    });
}

function dbInsert(obj, base, cb) {
    console.log(`Fake insert to db of ${base}`);
    console.log(JSON.colorStringify(obj.Data, null, 4));
    cb();
}

function MT5Update(obj, base, cb) {
    console.log(`Fake insert to MT5 of ${base}`);
    //console.log(JSON.colorStringify(obj.Data, null, 4));
    cb();
}