var MongoClient = require('mongodb').MongoClient;
var interfaceNameList = [],
	sourceNameList = [],
	targetNameList = [],
	eaiNameList = [];
var source = "all";

imageDetails(source, function (imageList) {
	//console.log(imageList);
});

function imageDetails(source, callback) {
	//get interface names
	getInterface(source, function (res) {
		console.log('==>>>'+res);
		callback(res);
			//get source names
			for(var i = 0; i<res.length; i++){
				getSource(res[i],function(sourceName){
					sourceNameList.push(sourceName);
					//if(interfaceNameList.length == sourceNameList.length){
						//console.log(sourceNameList);
					//}
				});
				console.log(sourceNameList);
			}
			
			//get target names
			for(var i = 0; i<interfaceNameList.length; i++){
				getTarget(interfaceNameList[i],function(targetName){
					targetNameList.push(targetName);
					//if(interfaceNameList.length == targetNameList.length){
						console.log(targetNameList);
					//}
				});
			}
			
			//get EAI names
			for(var i = 0; i<interfaceNameList.length; i++){
				getEAI(interfaceNameList[i],function(EAIName){
					eaiNameList.push(EAIName);
					if(interfaceNameList.length == eaiNameList.length){
						console.log(eaiNameList);
					}
				});
			}
	});
		
}

//EAI
function getEAI(ApplicationType, callback){
    MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
    if (err) {
         return console.dir(err);
     }
            var collection = db.collection('Middle ware Applications');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'EAI' : 1  , '_id' : 0} ).toArray(function (err, data) {
                if(err) throw err;
                inboundRes = JSON.stringify(data).replace(/[^a-zA-Z0-9,:]/g, "");
				inboundRes = inboundRes.substring(inboundRes.lastIndexOf(":")+1);
			                callback(inboundRes);			
            });
			db.close();
        });			
}


//Target 
function getTarget(InterfaceName, callback) {
			MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('End Systems');
            var query = {Interface: InterfaceName };
            collection.find(query, {'Target': 1, '_id': 0}).toArray(function (err, data) {
                if (err) throw err;
				inboundRes = JSON.stringify(data).replace(/[^a-zA-Z0-9,:]/g, "");
				inboundRes = inboundRes.substring(inboundRes.lastIndexOf(":")+1);
			                callback(inboundRes);			
         });
		db.close();
    });			
}

//Source
function getSource(InterfaceName, callback) {

		//console.log('control came to source method...'+InterfaceName);
        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('End Systems');
            var query = {Interface: InterfaceName };
            collection.find(query, { 'Source' : 1, '_id': 0}).toArray(function (err, data) {
                if (err) throw err;
                inboundRes = JSON.stringify(data).replace(/[^a-zA-Z0-9,:]/g, "");
				inboundRes = inboundRes.substring(inboundRes.lastIndexOf(":")+1);
                callback(inboundRes);
            });
			db.close();
        });
}


function getInterface(ApplicationType, callback){
	if(ApplicationType === 'ECC'){
	MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('End Systems');
            var query =  { Source: 'ECC' };
            collection.find( query, { 'Interface' : 1  , '_id' : 0} ).toArray(function (err, data) {
                if(err) throw err;
				for(var i=0;i<data.length;i++){
					inboundRes=JSON.stringify(data[i]);
					inboundRes=inboundRes.substring(14,19);
					interfaceNameList.push(inboundRes);
				}
				callback(interfaceNameList);
            });
			db.close();
    });
	}
	if(ApplicationType === 'Host'){
	MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('End Systems');
            var query =  { Source: 'Host' };
            collection.find( query, { 'Interface' : 1  , '_id' : 0} ).toArray(function (err, data) {
                if(err) throw err;
				for(var i=0;i<data.length;i++){
					inboundRes=JSON.stringify(data[i]);
					inboundRes=inboundRes.substring(14,19);
					interfaceNameList.push(inboundRes);
				}
				callback(interfaceNameList);
            });
			db.close();
    });
	}
	if(ApplicationType === 'all'){
		var dbinter = [];
	MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('End Systems');
            var query =   { $or: [ { Source: 'Host' }, { Source: 'ECC' } ] };
            collection.find( query, { 'Interface' : 1  , '_id' : 0} ).toArray(function (err, data) {
                if(err) throw err;
				for(var i=0;i<data.length;i++){
					inboundRes=JSON.stringify(data[i]);
					inboundRes=inboundRes.substring(14,19);
					dbinter.push(inboundRes);
				}
				callback(dbinter);
            });
			db.close();
    });
	}
}
