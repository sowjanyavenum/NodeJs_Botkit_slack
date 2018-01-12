var MongoClient = require('mongodb').MongoClient;
exports.identifyNotOutageHandlingCapaility = function(ApplicationType, callback){
	console.log('control came from slackbot...');
		var res;
		if(ApplicationType === 'EAI'){
       
        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('System Capabilities');
            var query = {'Can Handle End System Outagee': 'Yes'};
            collection.find( query, { 'Application Type' : 1  , '_id' : 0} ).toArray(function (err, data) {
				
                if(err) throw err;
                res = 'You have choosen : '+ApplicationType+' currently this system is having outage capability.';
				callback(res);
            });
        });
		}if(ApplicationType === 'Host' || ApplicationType === 'PI' || ApplicationType === 'ECC'){
			MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('System Capabilities');
            var query = {'Can Handle End System Outagee': 'Yes'};
            collection.find( query, { 'Application Type' : 1  , '_id' : 0} ).toArray(function (err, data) {
				console.log(data);
                if(err) throw err;
                res = 'You have choosen : '+ApplicationType+' , currently this system is not having outage capability. Currently EAI only have outage capability..';
				callback(res);
            });
        });
		}
}


 