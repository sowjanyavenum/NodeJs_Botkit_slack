var MongoClient = require('mongodb').MongoClient;
//HOST ---inbound,ECC ---outbound
var outboundRes,
		  inboundRes;
var source='Host';


    if (source == 'Host' || source == 'ECC') {
    var result= imageDetails(source, function(r){
           // console.log('After Calling Method.....'+r);
        console.log('After Calling Method....Done');
        });

    }
if (source == 'all') {
    var result= imageDetails('all', function(r){
		
       // console.log('After Calling Method.....'+r);
        console.log('After Calling Method....Done');
    });

}
        function imageDetails(source,callback) {

        var OutagePlanDetailsInterface = getOutagePlanDetailsInterface(source, function (OutagePlanDetailsInterface) {
            //console.log("Interface: " +OutagePlanDetailsInterface);
            //chklist.add(OutagePlanDetailsInterface)
            var chklist = [];
            chklist.push(OutagePlanDetailsInterface);
            var OutagePlanDetailsEAI = getOutagePlanDetailsEAI(OutagePlanDetailsInterface, function (OutagePlanDetailsEAI) {
				
                console.log("Interface: " + OutagePlanDetailsInterface);
               
                console.log(OutagePlanDetailsEAI);
				 var OutagePlanDetailsEAIrest = OutagePlanDetailsEAI.substring(OutagePlanDetailsEAI.lastIndexOf(":")+2);
				  // console.log('*********************: '+OutagePlanDetailsEAIrest);
                chklist.push(OutagePlanDetailsEAIrest);

            });
            var OutagePlanDetails = getOutagePlanDetails(OutagePlanDetailsInterface, function (OutagePlanDetails) {
               // console.log('heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy: '+OutagePlanDetails);
				 //  var OutagePlanDetailsrest = OutagePlanDetails.replace(/[^a-zA-Z0-9,:]/g, " ");
				   var OutagePlanDetailsrest = OutagePlanDetails.substring(OutagePlanDetails.lastIndexOf(":")+2);
				 //  console.log('*********************: '+OutagePlanDetailsrest);
                chklist.push(OutagePlanDetailsrest);
            });

            var OutagePlanDetailsIFlow = getOutagePlanDetailsIFlow(OutagePlanDetailsInterface, function (OutagePlanDetailsIFlow) {
                console.log(OutagePlanDetailsIFlow);
				
				 //  var OutagePlanDetailsrest = OutagePlanDetails.replace(/[^a-zA-Z0-9,:]/g, " ");
				   var OutagePlanDetailsIFlowrest = OutagePlanDetailsIFlow.substring(OutagePlanDetailsIFlow.lastIndexOf(":")+2);

				  // console.log('*********************: '+OutagePlanDetailsIFlowrest);
				
                chklist.push(OutagePlanDetailsIFlowrest);
            });

            var OutagePlanDetailsSenderCC = getOutagePlanDetailsSenderCC(OutagePlanDetailsInterface, function (OutagePlanDetailsSenderCC) {
                console.log(OutagePlanDetailsSenderCC);
				 var OutagePlanDetailsSenderCCrest = OutagePlanDetailsSenderCC.substring(OutagePlanDetailsSenderCC.lastIndexOf(":")+2);

				 //  console.log('*********************: '+OutagePlanDetailsSenderCCrest);
                chklist.push(OutagePlanDetailsSenderCCrest);
            });
            var OutagePlanDetailsReceiverCC = getOutagePlanDetailsReceiverCC(OutagePlanDetailsInterface, function (OutagePlanDetailsReceiverCC) {
                console.log(OutagePlanDetailsReceiverCC);
				 var OutagePlanDetailsReceiverCCrest = OutagePlanDetailsReceiverCC.substring(OutagePlanDetailsReceiverCC.lastIndexOf(":")+2);

				  // console.log('*********************: '+OutagePlanDetailsReceiverCCrest);
                chklist.push(OutagePlanDetailsReceiverCCrest);
            });

            var OutagePlanDetailsQueueName = getOutagePlanDetailsQueueName(OutagePlanDetailsInterface, function (OutagePlanDetailsQueueName) {
                console.log(OutagePlanDetailsQueueName);
				 var OutagePlanDetailsQueueNamerest = OutagePlanDetailsQueueName.substring(OutagePlanDetailsQueueName.lastIndexOf(":")+2);

				 //  console.log('*********************: '+OutagePlanDetailsQueueNamerest);
                chklist.push(OutagePlanDetailsQueueNamerest);
            });
            var OutagePlanDetailsQueueManagerName = getOutagePlanDetailsQueueManagerName(OutagePlanDetailsInterface, function (OutagePlanDetailsQueueManagerName) {
                console.log(OutagePlanDetailsQueueManagerName);
				
				 var OutagePlanDetailsQueueManagerNamerest = OutagePlanDetailsQueueManagerName.substring(OutagePlanDetailsQueueManagerName.lastIndexOf(":")+2);

				  // console.log('*********************: '+OutagePlanDetailsQueueManagerNamerest);
                chklist.push(OutagePlanDetailsQueueManagerNamerest);
            });

            var OutagePlanDetailsServerName = getOutagePlanDetailsServerName(OutagePlanDetailsInterface, function (OutagePlanDetailsServerName) {
                console.log(OutagePlanDetailsServerName);
				var OutagePlanDetailsServerNamerest = OutagePlanDetailsServerName.substring(OutagePlanDetailsServerName.lastIndexOf(":")+2);

				  // console.log('*********************: '+OutagePlanDetailsServerNamerest);
                chklist.push(OutagePlanDetailsServerNamerest);
            });

            var OutagePlanDetailsEnvironmentName = getOutagePlanDetailsEnvironmentName(OutagePlanDetailsInterface, function (OutagePlanDetailsEnvironmentName) {
                console.log(OutagePlanDetailsEnvironmentName);
					var OutagePlanDetailsEnvironmentNamerest = OutagePlanDetailsEnvironmentName.substring(OutagePlanDetailsEnvironmentName.lastIndexOf(":")+2);

				   //console.log('*********************: '+OutagePlanDetailsEnvironmentNamerest);
                chklist.push(OutagePlanDetailsEnvironmentNamerest)

                  console.log("checklist is : "+chklist);
                callback(chklist);
            });

        });

    }

function getOutagePlanDetails(InterfaceName, callback) {


        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('End_Systems');
            var query = {Interface: InterfaceName};
            collection.find(query, {'Target': 1, '_id': 0}).toArray(function (err, data) {
                if (err) throw err;
                inboundRes = JSON.stringify(data).replace(/[^a-zA-Z0-9,:_]/g, "");

                callback(inboundRes);
            });
        });


    }

		//interfaces
		function getOutagePlanDetailsInterface(ApplicationType, callback){
		if(ApplicationType === 'Host'){

        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('End Systems');
            var query =  { Source: 'Host' };
            collection.find( query, { 'Interface' : 1  , '_id' : 0} ).toArray(function (err, data) {
			console.log("data is: " +data.length);
                if(err) throw err;
				for(var i=0;i<data.length;i++){
				inboundRes=JSON.stringify(data[i]);
			//	console.log("heyyyyyyyyy: ................"+inboundRes);
				inboundRes=inboundRes.substring(14,19);
				//console.log("heyyyyyyyyy: ................"+inboundRes);
				callback(inboundRes);
				}

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
				//console.log("data is: " +data.length);
                if(err) throw err;
				for(var i=0;i<data.length;i++){
				inboundRes=JSON.stringify(data[i]);
			//	console.log("heyyyyyyyyy: ................"+inboundRes);
				inboundRes=inboundRes.substring(14,19);
				//console.log("heyyyyyyyyy: ................"+inboundRes);
				callback(inboundRes);
				}
              //   inboundRes = JSON.stringify(data).replace(/[^a-zA-Z0-9,:]/g," ");

				//callback(inboundRes);
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
                            callback(inboundRes);
                        }
                        //   inboundRes = JSON.stringify(data).replace(/[^a-zA-Z0-9,:]/g," ");

                        //callback(inboundRes);
                    });
                });
            }
}
//EAI names
function getOutagePlanDetailsEAI(ApplicationType, callback){
		var res;

        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('Middle ware Applications');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'EAI' : 1  , '_id' : 0} ).toArray(function (err, data) {

                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:_]/g," ");
				 callback(res);
            });

		});
}
//// IFLOW
function getOutagePlanDetailsIFlow(ApplicationType, callback){
		var res;

        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('PI Configurations');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'I FlowName' : 1  , '_id' : 0} ).toArray(function (err, data) {

                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:_]/g," ");
				 callback(res);
            });

		});
}
//SenderCC
function getOutagePlanDetailsSenderCC(ApplicationType, callback){
		var res;

        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('PI Configurations');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'Sender Channel' : 1  , '_id' : 0} ).toArray(function (err, data) {

                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,_:]/g," ");
				 callback(res);
            });

		});
}
// ReceiverCC
function getOutagePlanDetailsReceiverCC(ApplicationType, callback){
		var res;

        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('PI Configurations');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'Reciever Channel' : 1  , '_id' : 0} ).toArray(function (err, data) {

                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:_]/g,"");
				 callback(res);
            });

		});
}
// Queue Name
		function getOutagePlanDetailsQueueName(ApplicationType, callback){
		var res;

        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('PI Configurations');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'Queue Name' : 1  , '_id' : 0} ).toArray(function (err, data) {

                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:_]/g,"");
				 callback(res);
            });

		});
}


		//QueueManagerName

		function getOutagePlanDetailsQueueManagerName(ApplicationType, callback){
		var res;

        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('PI Configurations');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'Queue Manager Name' : 1  , '_id' : 0} ).toArray(function (err, data) {

                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:_]/g,"");
				 callback(res);
            });

		});

}
// Server Name

		function getOutagePlanDetailsServerName(ApplicationType, callback){
		var res;

        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('PI Configurations');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'Server' : 1  , '_id' : 0} ).toArray(function (err, data) {

                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:_]/g,"");
				 callback(res);
            });

		});

}

// Environment Name
function getOutagePlanDetailsEnvironmentName(ApplicationType, callback){
		var res;

        MongoClient.connect("mongodb://localhost:27017/PA-Configuration", function (err, db) {
            if (err) {
                return console.dir(err);
            }
            var collection = db.collection('PI Configurations');
            var query =  { Interface: ApplicationType };
            collection.find( query, { 'Environment' : 1  , '_id' : 0} ).toArray(function (err, data) {

                if(err) throw err;
                 res = JSON.stringify(data).replace(/[^a-zA-Z0-9,:_]/g,"");
				 callback(res);
            });

		});

}


