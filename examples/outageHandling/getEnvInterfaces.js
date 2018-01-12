//get End Interface Details
var MongoClient = require('mongodb').MongoClient;
//var outageStatus = getEnvInterfaceList('Prod', function(outageStatus){
	//console.log(outageStatus);
//});
//PROD DEV QA LIVE
exports.getEnvInterfaceList = function(EnvironmentType, callback){
		var res;
		if(EnvironmentType === 'Prod' || EnvironmentType === 'live'){
        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('End Systems');
            var query = {'Environment': 'Prod'};
            collection.find( query, { 'Interface' : 1  , '_id' : 0} ).toArray(function (err, data) {
                if(err) throw err;
                res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:]/g," ");
				callback(res);
            });
        });
		}
};


