var MongoClient = require('mongodb').MongoClient;
var interfaceNameList = [],
	sourceNameList = [],
	targetNameList = [],
	eaiNameList = [],
	iFlowNameList = [],
	senderCCNameList = [],
	receiverCCNameList = [],
	qNameList = [],
	qManagerNameList = [],
	serverNameList = [],
	envNameList = [];
//var source = "ECC";

/*imageDetails(source, function (imageList) {
	console.log(source);
});*/

exports.getPdfDetailsSource =  function imageDetails(source, callback) {
	//get interface names
	
	console.log('the source is : '+source);
	getInterface(source, function (interfaceNameList) {
		console.log(interfaceNameList);
		callback(interfaceNameList);
			//get source names
			for(var i = 0; i<interfaceNameList.length; i++){
				getSource(interfaceNameList[i],function(sourceName){
					sourceNameList.push(sourceName);
				});
			}
			
			//get target names
			for(var i = 0; i<interfaceNameList.length; i++){
				getTarget(interfaceNameList[i],function(targetName){
					targetNameList.push(targetName);
				});
			}
			
			//get EAI names
			for(var i = 0; i<interfaceNameList.length; i++){
				getEAI(interfaceNameList[i],function(EAIName){
					eaiNameList.push(EAIName);
				});
			}
			
			//get IFlow names
			for(var i = 0; i<interfaceNameList.length; i++){
				getIFlow(interfaceNameList[i],function(IFLOWName){
					iFlowNameList.push(IFLOWName);
				});
			}
			
			//get SenderCC names
			for(var i = 0; i<interfaceNameList.length; i++){
				getSenderCC(interfaceNameList[i],function(SenderCCName){
					senderCCNameList.push(SenderCCName);
				});
			}
						
			//get ReceiverCC names
			for(var i = 0; i<interfaceNameList.length; i++){
				getReceiverCC(interfaceNameList[i],function(ReceiverCCName){
					receiverCCNameList.push(ReceiverCCName);
				});
			}
			
			//get Queue names
			for(var i = 0; i<interfaceNameList.length; i++){
				getQueueName(interfaceNameList[i],function(qName){
					qNameList.push(qName);
				});
			}
			
			//get QueueManager names
			for(var i = 0; i<interfaceNameList.length; i++){
				getQueueManagerName(interfaceNameList[i],function(qManagerName){
					qManagerNameList.push(qManagerName);
				});
			}
			
			//get Server names
			for(var i = 0; i<interfaceNameList.length; i++){
				getServerName(interfaceNameList[i],function(serverName){
					serverNameList.push(serverName);
				});
			}
			
			//get Environemnt names
			for(var i = 0; i<interfaceNameList.length; i++){
				getEnvironmentName(interfaceNameList[i],function(envName){
					envNameList.push(envName);
					if(interfaceNameList.length == envNameList.length){
						console.log(interfaceNameList);
						console.log(sourceNameList);
						console.log(targetNameList);
						console.log(eaiNameList);
						console.log(iFlowNameList);
						console.log(senderCCNameList);
						console.log(receiverCCNameList);
						console.log(qNameList);
						console.log(qManagerNameList);
						console.log(serverNameList);
						console.log(envNameList);
					
											
											
					var http = require('http');

						var bodyString = JSON.stringify({
											'source' : sourceNameList,
											'target' : targetNameList,
											'interfaceName' :interfaceNameList,
											'eai' : eaiNameList,
											'iFlow' : iFlowNameList,
											'senderCC' : senderCCNameList,
											'receiverCC' : receiverCCNameList,
											'qName' : qNameList,
											'qManagerName' : qManagerNameList,
											'server' : serverNameList,
											'environment' : envNameList 
});

var headers = {
    'Content-Type': 'application/json',
    'Content-Length': bodyString.length
};

var options = {
    host: 'localhost',
    path: '/createImage',
    port: 8080,
    method: 'POST',
    headers: headers
};
var callback = function(response) {
var str = '';

//another chunk of data has been recieved, so append it to `str`
response.on('data', function(chunk) {
str += chunk;
});

//the whole response has been recieved, so we just print it out here
response.on('end', function() {
console.log(str);
});
};

http.request(options, callback).write(bodyString);
	
					}
				});
			}
			
	});
		
}
// Server Name
function getServerName(ApplicationType, callback){
        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('PI Configurations');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'Server' : 1  , '_id' : 0} ).toArray(function (err, data) {
			if(err) throw err;
				inboundRes = JSON.stringify(data).replace(/[^a-zA-Z0-9,:_.]/g, "");
				inboundRes = inboundRes.substring(inboundRes.lastIndexOf(":")+1);
			    callback(inboundRes);			
            });
			db.close();
        });			
}

// Environment Name
function getEnvironmentName(ApplicationType, callback){
        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('PI Configurations');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'Environment' : 1  , '_id' : 0} ).toArray(function (err, data) {
			if(err) throw err;
				inboundRes = JSON.stringify(data).replace(/[^a-zA-Z0-9,:_.]/g, "");
				inboundRes = inboundRes.substring(inboundRes.lastIndexOf(":")+1);
			    callback(inboundRes);			
            });
			db.close();
        });			
}


//Queue Manager
function getQueueManagerName(ApplicationType, callback){
        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('PI Configurations');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'Queue Manager Name' : 1  , '_id' : 0} ).toArray(function (err, data) {
				if(err) throw err;
				inboundRes = JSON.stringify(data).replace(/[^a-zA-Z0-9,:_.']/g, "");
				inboundRes = inboundRes.substring(inboundRes.lastIndexOf(":")+1);
			    callback(inboundRes);			
            });
			db.close();
        });			
}

// Queue Name
function getQueueName(ApplicationType, callback){
        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('PI Configurations');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'Queue Name' : 1  , '_id' : 0} ).toArray(function (err, data) {
				if(err) throw err;
                inboundRes = JSON.stringify(data).replace(/[^a-zA-Z0-9,:_.]/g, "");
				inboundRes = inboundRes.substring(inboundRes.lastIndexOf(":")+1);
			    callback(inboundRes);			
            });
			db.close();
        });			
}

// ReceiverCC
function getReceiverCC(ApplicationType, callback){
        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('PI Configurations');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'Reciever Channel' : 1  , '_id' : 0} ).toArray(function (err, data) {
				if(err) throw err;
                inboundRes = JSON.stringify(data).replace(/[^a-zA-Z0-9,:_]/g, "");
				inboundRes = inboundRes.substring(inboundRes.lastIndexOf(":")+1);
			    callback(inboundRes);			
            });
			db.close();
        });			
}

//SenderCC
function getSenderCC(ApplicationType, callback){
        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('PI Configurations');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'Sender Channel' : 1  , '_id' : 0} ).toArray(function (err, data) {
                if(err) throw err;
                inboundRes = JSON.stringify(data).replace(/[^a-zA-Z0-9,:_]/g, "");
				inboundRes = inboundRes.substring(inboundRes.lastIndexOf(":")+1);
			    callback(inboundRes);			
            });
			db.close();
        });			
}

// IFLOW
function getIFlow(ApplicationType, callback){
        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('PI Configurations');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'I FlowName' : 1  , '_id' : 0} ).toArray(function (err, data) {

                if(err) throw err;
                inboundRes = JSON.stringify(data).replace(/[^a-zA-Z0-9,:_]/g, "");
				inboundRes = inboundRes.substring(inboundRes.lastIndexOf(":")+1);
			    callback(inboundRes);			
            });
			db.close();
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
	if(ApplicationType === 'ECC'||ApplicationType === 'ecc'){
		//if(ApplicationType.equalsIgnoreCase=='ECC'){
			
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
	if(ApplicationType === 'Host'||ApplicationType === 'host'){
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
					interfaceNameList.push(inboundRes);
				}
				callback(interfaceNameList);
            });
			db.close();
    });
	}
}
