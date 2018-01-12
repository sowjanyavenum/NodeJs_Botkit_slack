var MongoClient = require('mongodb').MongoClient;
var general = require('../generalHandling/GeneralHandler.js');
console.log("------------------------------------------cam");

exports.userSessionHistorytable = function(userName,userQtn,intent,entity,callback) {
    userHistoryLog(userName,userQtn,intent,entity,function(r){
        console.log('after calling userHistoryLog method '+r);
		callback(r);
    });
	 
}

function userHistoryLog(userName,userQtn,intent,entity,callback) {
 var userSessionId=1;

	
       MongoClient.connect("mongodb://localhost:27017/userHistoryHandling", function (err, db) {
        if (err) throw err;
        db.createCollection("userHistory", function (err, res) {
            if (err) throw err;
             if (userName != null) {
            //    if (intent == "interface-lookup" || intent == "outage-handling" || intent == "contacts-lookup") {
                    //user existed or not
                    var myobj = [{
                        userId: userName,
                        contextId: 3,
                        sessionId:userSessionId ,
                        intentName: intent,
                        contextState: "open",
                        sessionState: "open"
                    }];


                    db.collection("userHistory").findOne({'userId': userName}, function (error, exist) {
                        console.log('exist......******************************************.....')
						
						if(!exist) {
                            console.log('no exits........')
                            db.collection("userHistory").insert(myobj, function (err, res) {
                                if (err) throw err;
                                console.log("record inserted in userhistory");

                            });
                                  userSessionLog(userName,userQtn,intent,entity,userSessionId,function(resGiven){
									  console.log('user no exists....'+resGiven);
									   callback(resGiven);
								  });

                        }
												
						
                        else {
                            console.log('exist...........')
                            userSessionLog(userName,userQtn,intent,entity,userSessionId,function(resGiven){
								console.log('user exists....'+resGiven);
                                if(resGiven!=null)
                                {
                                    var myquery =   { sessionState: 'open' } ;
                                    var newvalues = {$set: { sessionState: 'closed' } };
                                    db.collection("userHistory").updateOne(myquery, newvalues, function(err, res) {
                                        if (err) throw err;
                                        console.log("1 record updated");
														
                                        																						
                                       db.close();							
			
									});	

                                }
                                callback(resGiven);
                            });
//enni contexts tsates openlo unayo chudali
//unte curent context=open context same or not inkoka entry create chesi sesions ad cheyali
                        }
                        
                    })


            }
        });
    });
}

/*================= userSessionlog===========================================*/


function userSessionLog(userName,userQtn,intent,entity,userSessionId,callback){
    console.log("&&&&&&&&&&&&&&&&&&&%%%%%%%%%%%%%%%%******************%%%%%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	console.log("I entered into the field");
	
	
					var sessionSeqNumber = 1;
					MongoClient.connect("mongodb://localhost:27017/userHistoryHandling", function (err, db) {
						if (err) throw err;
					var collection=db.collection("userSessionLog");
					//var cursor=	collection.find();									 
					//var query=cursor.sort([['sessionSeq','desc']]).limit(1); 
					collection.findOne({'userId':userName},{'sessionSeq':1, '_id' : 0}, {"sort" : [['sessionSeq', 'desc']]}, function (err, docs) {  
						console.log('*****************************my qyuery is***********:' +docs);
						var res = parseInt(JSON.stringify(docs).replace(/[^\d,]+/g,""));
						if(res > 0){
						sessionSeqNumber = res + 1;
						}
						console.log('*****************************my qyuery is***********:' +sessionSeqNumber);
					});
					//.replace(/[^a-zA-Z0-9,:]/g," ");
					
					});
					
                    
          
				
   
   var userAnswer;
	   var userRes = general.sayHi(userQtn,function(ans){
		   console.log(ans);
		   userAnswer = ans;
	   });
	   var count = 0;
    MongoClient.connect("mongodb://localhost:27017/userHistoryHandling", function (err, db) {
		console.log("I entered into the field****************8");
        if (err) throw err;
         db.createCollection("userSessionLog", function (err, res) {
      console.log("&&&&&&&&&&&&&&&&&&&%%%%%%%%%%%%%%%%%%%%%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            if (err) throw err;
            //based on intents not on contextHandler
            //wenever rasa gives trained data these method will be called
      
	   console.log('bot anser..'+userAnswer);  
	            var myobj = [{
                userId: userName,
                sessionId:userSessionId,
                sessionSeq:sessionSeqNumber,
                entityName:entity,
                intentName: intent,
                text: userQtn,
                response : userAnswer
           }];
            db.collection("userSessionLog").insert(myobj, function (err, res) {
                if (err) throw err;
                console.log("record inserted");
            });

        });

    });
    callback(userAnswer);

}
