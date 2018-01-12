var MongoClient = require('mongodb').MongoClient;
//HOST ---inbound,ECC ---outbound
var inboundRes;
var source='all';
var interfaceNameList = [],
			eaiNameList = [],
			sourceNameList = [],
			targetNameList = [],
			iFlowNameList = [],
			senderCCNameList = [],
			recieverCCNameList = [],
			queueNameList = [],
			queueManagerNameList = [],
			serverNameList = [],
			environmentNameList = [];
			
			
    if (source == 'Host' || source == 'ECC') {
			imageDetails(source);
	}
	if (source == 'all') {
	
			imageDetails(source);
	}
console.log(environmentNameList);
    function imageDetails(source) {
		
	   var getInterfaceNames = getInterface(source, function (interfaceNameList) {
		   
		   
			
			
			console.log(interfaceNameList);
			
			
            
			var getEAINames = getEAI(interfaceNameList, function (eaiName) {
                eaiNameList.push(eaiName);
            });
			
            var getTargetNames = getTarget(interfaceNameList, function (targetName) {
				//console.log('4:' +targetName)
                targetNameList.push(targetName);				
            });
			
			var getSourceNames = getSource(interfaceNameList, function (sourceName) {
                sourceNameList.push(sourceName);
            });

            var getIFlowNames = getIFlow(interfaceNameList, function (iFlowName) {
                iFlowNameList.push(iFlowName);
            });

            var getSenderCCNames = getSenderCC(interfaceNameList, function (senderCCName) {
                senderCCNameList.push(senderCCName);
            });
			
            var getReceiverCCNames = getReceiverCC(interfaceNameList, function (receiverCCName) {
                recieverCCNameList.push(receiverCCName);
            });

            var getQueueNames = getQueueName(interfaceNameList, function (queueName) {
                queueNameList.push(queueName);
            });
			
            var getueueManagerNames = getQueueManagerName(interfaceNameList, function (queueManagerName) {
                queueManagerNameList.push(queueManagerName);
            });

            var getServerNames = getServerName(interfaceNameList, function (serverName) {
                serverNameList.push(serverName);
            });

            var OutagePlanDetailsEnvironmentName = getEnvironmentName(interfaceNameList, function (environmentName) {
                environmentNameList.push(environmentName);
            });
			console.log(environmentNameList);
        });
    }

function getTarget(InterfaceName, callback) {

			
			MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('End Systems');
            var query = {Interface: InterfaceName };
            collection.find(query, {'Target': 1, '_id': 0}).toArray(function (err, data) {
                if (err) throw err;
              //inboundRes = JSON.stringify(data).replace(/[^a-zA-Z0-9,:_.]/g,"");
			  inboundRes = JSON.stringify(data);
			  //console.log('Target  .................. : '+inboundRes);
			                callback(inboundRes);
							
            });
		
        });		
			
    }
	
	
function getSource(InterfaceName, callback) {


        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('End Systems');
            var query = {Interface: InterfaceName };
            collection.find(query, { 'Source' : 1, '_id': 0}).toArray(function (err, data) {
                if (err) throw err;
                inboundRes = JSON.stringify(data).replace(/[^a-zA-Z0-9,:]/g, " ");
				//console.log(' Source ===================  : '+inboundRes);
                callback(inboundRes);
            });
        });


    }

		//interfaces
		function getInterface(ApplicationType, callback){
		if(ApplicationType === 'Host'){

        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('End Systems');
            var query =  { Source: 'Host' };
            collection.find( query, { 'Interface' : 1  , '_id' : 0} ).toArray(function (err, data) {
			//console.log("data is: " +data.length);
                if(err) throw err;
				for(var i=0;i<data.length;i++){
				inboundRes=JSON.stringify(data[i]);
			//	console.log("heyyyyyyyyy: ................"+inboundRes);
				inboundRes=inboundRes.substring(14,19);
				//console.log("heyyyyyyyyy: ................"+inboundRes);
				interfaceNameList.push(inboundRes);
				
				}
				callback(interfaceNameList);
            });
        });
		}
		if(ApplicationType === 'ECC'){

        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('End Systems');
            var query =  { Source: 'ECC' };
            collection.find( query, { 'Interface' : 1  , '_id' : 0} ).toArray(function (err, data) {

                if(err) throw err;
				console.log("data is: " +data.Interface);
                if(err) throw err;
				for(var i=0;i<data.length;i++){
				inboundRes=JSON.stringify(data[i]);
			//	console.log("heyyyyyyyyy: ................"+inboundRes);
				inboundRes=inboundRes.substring(14,19);
				//console.log("heyyyyyyyyy: ................"+inboundRes);
				interfaceNameList.push(inboundRes);
				}
              //   inboundRes = JSON.stringify(data).replace(/[^a-zA-Z0-9,:]/g," ");

				callback(inboundRes);
            });
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
                        //console.log("data is: " +data.length);
                        if(err) throw err;
                        for(var i=0;i<data.length;i++){
                            inboundRes=JSON.stringify(data[i]);
                            //	console.log("heyyyyyyyyy: ................"+inboundRes);
                            inboundRes=inboundRes.substring(14,19);
                            //console.log("heyyyyyyyyy: ................"+inboundRes);
                            interfaceNameList.push(inboundRes);
                        }
						callback(inboundRes);
                        //   inboundRes = JSON.stringify(data).replace(/[^a-zA-Z0-9,:]/g," ");

                        //callback(inboundRes);
                    });
                });
            }
}
//EAI names
function getEAI(ApplicationType, callback){
		var res;

        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('Middle ware Applications');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'EAI' : 1  , '_id' : 0} ).toArray(function (err, data) {

                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:]/g," ");
				 
            });
callback(res);
		});
}
//// IFLOW
function getIFlow(ApplicationType, callback){
		var res;

        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('PI Configurations');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'I FlowName' : 1  , '_id' : 0} ).toArray(function (err, data) {

                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:]/g," ");
				 callback(res);
            });

		});
}
//SenderCC
function getSenderCC(ApplicationType, callback){
		var res;

        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('PI Configurations');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'Sender Channel' : 1  , '_id' : 0} ).toArray(function (err, data) {

                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:]/g," ");
				 callback(res);
            });

		});
}
// ReceiverCC
function getReceiverCC(ApplicationType, callback){
		var res;

        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('PI Configurations');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'Reciever Channel' : 1  , '_id' : 0} ).toArray(function (err, data) {

                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:]/g," ");
				 callback(res);
            });

		});
}
// Queue Name
		function getQueueName(ApplicationType, callback){
		var res;

        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('PI Configurations');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'Queue Name' : 1  , '_id' : 0} ).toArray(function (err, data) {

                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:]/g," ");
				 callback(res);
            });

		});
}


		//QueueManagerName

		function getQueueManagerName(ApplicationType, callback){
		var res;

        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('PI Configurations');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'Queue Manager Name' : 1  , '_id' : 0} ).toArray(function (err, data) {

                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:]/g," ");
				 callback(res);
            });

		});

}
// Server Name

		function getServerName(ApplicationType, callback){
		var res;

        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('PI Configurations');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'Server' : 1  , '_id' : 0} ).toArray(function (err, data) {

                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:]/g," ");
				 callback(res);
            });

		});

}

// Environment Name
function getEnvironmentName(ApplicationType, callback){
		var res;

        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('PI Configurations');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'Environment' : 1  , '_id' : 0} ).toArray(function (err, data) {

                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:]/g," ");
				 callback(res);
            });

		});

}


