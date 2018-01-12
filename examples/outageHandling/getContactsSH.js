var MongoClient = require('mongodb').MongoClient;
//HOST ---inbound,ECC ---outbound
//var contacts = getContacts('Host', function(contacts){
	//console.log(contacts);
//});
exports.getContacts = function(ApplicationType, callback){
		var outboundRes,
		  inboundRes;
		if(ApplicationType === 'Host'){
       
        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('End Systems');
            var query =  { Source: 'Host' };
            collection.find( query, { 'Source Contacts' : 1  , '_id' : 0} ).toArray(function (err, data) {
			
                if(err) throw err;
                 inboundRes = JSON.stringify(data).replace(/[^a-zA-Z0-9,:.@-]/g," "); 
				 
				callback(inboundRes);
            });
        });
		}
		if(ApplicationType === 'ECC'){
       
        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('End Systems');
            var query =  { Source: 'ECC' } ;
            collection.find( query, { 'Source Contacts' : 1  , '_id' : 0} ).toArray(function (err, data) {
			
                if(err) throw err;
                outboundRes = JSON.stringify(data).replace(/[^a-zA-Z0-9,:.@-]/g," ");
				 
				callback(outboundRes);
            });
        });
		}
		if(ApplicationType === 'Host'){
       
        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('End Systems');
            var query =  { Source: 'Host' };
            collection.find( query, { 'Target Contacts' : 1  , '_id' : 0} ).toArray(function (err, data) {
			
                if(err) throw err;
                 inboundRes = JSON.stringify(data).replace(/[^a-zA-Z0-9,:.@-]/g," "); 
				 
				callback(inboundRes);
            });
        });
		}
		if(ApplicationType === 'ECC'){
       
        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('End Systems');
            var query =  { Source: 'ECC' } ;
            collection.find( query, { 'Target Contacts' : 1  , '_id' : 0} ).toArray(function (err, data) {
			
                if(err) throw err;
                outboundRes = JSON.stringify(data).replace(/[^a-zA-Z0-9,:.@-]/g," ");
				 
				callback(outboundRes);
            });
        });
		}
}
		