var MongoClient = require('mongodb').MongoClient;
//HOST ---inbound,ECC ---outbound
//var contacts = getContactsByInterface('I0246', function(contacts){
	//console.log(contacts);
//});
exports.getContactsByInterface = function(ApplicationType, callback){
		var res;
		  
        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('Middle ware Applications');
            var query =  { 'Interface': ApplicationType };
            collection.find( query, { 'EAI Contacts' : 1  , '_id' : 0} ).toArray(function (err, data) {
			
                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:@.-]/g," "); 
				 console.log('-----------------control came-----------------------'+res);
				 callback(res);
            });
        
		});
		
		        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('Middle ware Applications');
            var query =  { 'Interface': ApplicationType };
            collection.find( query, { 'SAP Middleware Contacts' : 1  , '_id' : 0} ).toArray(function (err, data) {
			
                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:@.-]/g," "); 
				 console.log('-----------------control came-----------------------'+res);
				 callback(res);
            });
        
		});
		MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('End Systems');
            var query =  { 'Interface': ApplicationType };
            collection.find( query, { 'Source Contacts' : 1  , '_id' : 0} ).toArray(function (err, data) {
			
                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:@.-]/g," "); 
				 console.log('-----------------control came-----------------------'+res);
				 callback(res);
            });
        
		});
		
		        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('End Systems');
            var query =  { 'Interface': ApplicationType };
            collection.find( query, { 'Target Contacts' : 1  , '_id' : 0} ).toArray(function (err, data) {
			
                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:@.-]/g," "); 
				 console.log('-----------------control came-----------------------'+res);
				 callback(res);
            });
        
		});

	}
		