var MongoClient = require('mongodb').MongoClient;
//HOST ---inbound,ECC ---outbound
//var interfaceList = getInterfaces('ECC', function(contacts){
	//console.log(contacts);
//});
exports.getInterfaceList = function(SourceModule, callback){
	 console.log('I got called by slack bot...(((((((((((((((((((&&&&&&&&&&&&&&&&&&&&&&&&&'+SourceModule);
		var res;
		  if(SourceModule == 'ECC' || SourceModule == 'Host'){
       console.log('I got called by slack bot...(((((((((((((((((((&&&&&&&&&&&&&&&&&&&&&&&&&'+SourceModule);
		MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function(err, db) {
        if(err) { return console.dir(err); }
		console.log('I got called by slack bot...(((((((((((((((((((&&&&&&&&&&&&&&&&&&&&&&&&&'+SourceModule);
        var collection = db.collection('End Systems');
        var query = {'Source': SourceModule } ;

        collection.find( query, { 'Interface' : 1  , '_id' : 0} ).toArray(function (err, data) {
			console.log('I got called by slack bot...(((((((((((((((((((&&&&&&&&&&&&&&&&&&&&&&&&&  '+data);
                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:]/g," "); 
				 
				callback(res);

        });
        db.close();
    });


	};
	

	if(SourceModule == 'all'){
		MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function(err, db) {
        if(err) { return console.dir(err); }

        var collection = db.collection('End Systems');
        var query = { $or: [ { Source: 'Host' }, { Target : 'Host' } ] };
        collection.find( query, { 'Interface' : 1  , '_id' : 0} ).toArray(function (err, data) {
			console.log('I got called by slack bot...(((((((((((((((((((&&&&&&&&&&&&&&&&&&&&&&&&&  '+data);
                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:]/g," "); 
				 
				callback(res);
        

        });
        db.close();
    });

	
		  }		  

}
		





