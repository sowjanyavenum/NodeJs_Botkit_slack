/*
 This file is for maintain User History
 */
var MongoClient = require('mongodb').MongoClient;
var restCall = require('./restCallAuditHandling.js');
var restCallMeeting = require('./restCallMeetingRequest.js');
var restCallDelete = require('./restCallForDeleting.js');
var general = require('../generalHandling/GeneralHandler.js');
var request = require("request");
var outagePIConfig = require('../generalHandling/OutageHandlingPiconfiguration.js');
//Context Look Up needed info..
exports.contextLookup =  function(user, userQtn, intent, entity, callback){
	
		//Get Context Id number and Context Handler Name
		getContextId_Handler(intent, function(res){
			var contextId = res[0];
			var contextHandler = res[1];
			console.log('Context Id is : '+contextId);
			console.log('Context Handler is : '+contextHandler);
			
			//Now we have all info in contextLookup table
			
			//insert to  Tabel contextLookup
			insertContextLookup(contextId, contextHandler, intent, function(insertRes){
				console.log(insertRes);
				
				
			//Set Context State and Session State open
			// set session id 
			// check user exists or not
				checkUserExists(user, function(exist){
					if(exist == 'no'){
						var sessionId = 1;
						var contextState = 'open';
						var sessionState = 'open';
						insertUserHistory(user, contextId, sessionId, intent, contextState, sessionState,userQtn,entity, function(insertRes){
							callback(insertRes);
							console.log('New User '+insertRes);
						});
					}else if(exist == 'yes'){
						var contextState = 'open';
						var sessionState = 'open';
						// change session id wrt context id 
							getContextId(user, function(res){
								//contextId = res[0];
								//sessionId = res[1];
								console.log('*************************************************************'+contextId);
								if(contextId != res[0]){
									updateContextState(user, res[0], function(res){
										console.log(res);
									});
									sessionId = res[1] + 1 ;
									insertUserHistory(user, contextId, sessionId, intent, contextState, sessionState,userQtn,entity, function(insertRes){
										callback(insertRes);
										console.log('Existing User Context Id changing case....'+insertRes);
									});
								}else {
									insertUserHistory(user, contextId, res[1], intent, contextState, sessionState,userQtn,entity, function(insertRes){
										callback(insertRes);
										console.log('Existing User '+insertRes);
									});
								}
															
							});
					}	
				});
				
			});	
		});
}
//get Context Id for particular use on basis of last inserted record..
function getContextId(user, callback){
	MongoClient.connect("mongodb://localhost:27017/userHistoryHandling", function (err, db) {
        if (err) throw err;
			db.collection("user_history").findOne(
				{'userId':user},
				{'contextId':1,'sessionId':1, '_id' : 0}, 
				{"sort" : { $natural : -1 }, limit : 1  }, 
				
				//{"sort" : [['sessionId', 'desc']]},
				
					function (err, docs) {
						var res = [];
						res.push(docs.contextId);
						res.push(docs.sessionId);
						callback(res);
			});
	});		
}

// Check if user exists in user_history table or not
function checkUserExists(user, callback){
	MongoClient.connect("mongodb://localhost:27017/userHistoryHandling", function (err, db) {
        if (err) throw err;
			db.collection("user_history").findOne({'userId': user}, function (error, exist) {
				if(exist){
					callback('yes');
				}else {
					callback('no');
				}
			});
		});
}
//Insert into user session log table
function insertUserSessionLog(user, sessionId, sessionSeq, entity, userQtn,intent, callback){
	var userRes;
	var userAnswer;
	if(intent == 'greet' ){
		        if(user=='U5TKDN93L' && userQtn=='hi'){
		      MongoClient.connect("mongodb://localhost:27017/userHistoryHandling", function (err, db) {
               if (err) throw err;
                   var collection=db.collection("user_session_log");
				   var query = { $or: [ { userQuestion: 'ok' }, { userQuestion : 'yeah' } ] };
				   collection.find( query, { 'userResponse' : 1  , '_id' : 0} ).toArray(function (err, data) {
			
                if(err) throw err;
				var res = [];
				for(var i=0;i<data.length;i++){
					res.push(JSON.stringify(data[i]).substring(16));
				}
				
				console.log('Links...(((((((((((((((((((&&&&&&&&&&&&&&&&&&&&&&&&&  '+res[0].replace(/[^a-zA-Z0-9:/".@-]/g," "),res[1].replace(/[^a-zA-Z0-9:/".@-]/g," "));
				var userRoleRes=res[0].replace(/[^a-zA-Z0-9:/".@-]/g," ");
				var sapProfileRes=res[1].replace(/[^a-zA-Z0-9:/".@-]/g," ")
userAnswer = 'we had an auditor came this morning and he asked for the reports and we have provided him with the following details for user role changes' +userRoleRes+' and for sap Standard profile' +sapProfileRes+ '.He have some questions regarding them and he wants to talk to you';				
				});
				});
			 
		

        }
			else if(userQtn=='ok'||userQtn=='yeah'){
		restCall.restCallCreateFile(function(ans){
			userAnswer = ans
			console.log('here i am'+userAnswer);
			});
		 			   
			/*		   		
			insertIntoUserSessionLog(user, sessionId, sessionSeq, entity, userQtn, userAnswer, function(res){
				console.log('here i am'+userAnswer);
				console.log('555555555555555'+res);
			
			//callback('Here is the link for the requested details: '+userAnswer);
		});
			*/		   
				   } 

        
       else if(userQtn=='hey'||userQtn=='howdy'||userQtn=='hey there'||userQtn=='hello'||userQtn=='hi'){
          general.sayHi(userQtn,function(ans){
            userAnswer = ans;

       });
        }
		

     
	else if(userQtn=='yes'||userQtn=='yeap'||userQtn=='indeed'||userQtn=='that is right'||userQtn=='great'){
		 general.afrm(userQtn, function(ans){
			 console.log(ans);
            userAnswer = ans; 
        });  
	}
	 
	else if(userQtn=='goodbye'||userQtn=='bye'||userQtn=='good bye'||userQtn=='stop'||userQtn=='end'){
		 general.sayGdbye(userQtn, function(ans){
            userAnswer = ans; 
        });  
	}
	else if(userQtn=='who are you'||userQtn=='what have you got for me'){
		general.intro(userQtn, function(ans){
            userAnswer = ans; 
        });  
	}
	
	else if(userQtn=='give me sometime to check this, will get back to you later'){
		 general.await(userQtn, function(ans){
		userAnswer = ans; 
		// console.log(userAnswer);
		// callback(userAnswer);
		});
	}
	
	}
	
	if(intent == 'schedule'){
		 userRes = restCallMeeting.getMeetingCall(function(ans){
			userAnswer = ans;
			}); 
	}
	
	
	
		if(intent == 'meet-te'){
        console.log('entities are:**************************** '+entity )
        if(entity=='sap-standard-profile'|| entity=='te')
		general.ssprofile(userQtn, function(ans){
		userAnswer = ans;  
       
		});
        else if(entity=='tomorrow')
        general.tmw(userQtn, function(ans){
		userAnswer = ans;           
	});     
   }
	
	if(intent == 'done'){
       restCallDelete.restCallDeleteFile(function(ans){
			userAnswer = 'Ok Great..';
			console.log('User Response is '+userAnswer);
		});
		
    }
	if(intent == 'piInterfacelookup'){
		
		var userRes = outagePIConfig.PIConfigHelp(userQtn,entity,function(ans){
			console.log('hey the ans issss......' +ans)
		userAnswer = ans; 
		
    });	
	}
		if(intent == 'userAndSap'){
		
		var userRes = general.userSapRoleChange(userQtn,function(ans){
			//console.log('hey the ans issss......' +ans)
		userAnswer = ans; 
		
    });	
	}
	
	
	if(intent == 'outageplan'){
		var userRes = outagePIConfig.upgradeEccOutage(entity, function(ans){
	    userAnswer = ans; 
		
    });
	}
	if(intent == 'upgradedetails'){
		if(entity=='start'||entity=='end'){
		var userRes = outagePIConfig.upgradedetails(userQtn,entity,function(ans){
		userAnswer = ans; 
		
	    });
		}
		else if(userQtn=='ok we are good with this, please proceed'){
			var userRes = outagePIConfig.Conformation(userQtn, function(ans){
		 userAnswer = ans; 
		});
		}
	}
	
	MongoClient.connect("mongodb://localhost:27017/userHistoryHandling", function (err, db) {
		if (err) throw err;
			db.createCollection("user_session_log", function (err, res) {
				if (err) throw err;
					var myobj = [{
						userId : user,
						sessionId : sessionId,
						sessionSequence : sessionSeq,
						entity : entity,
						userQuestion : userQtn,
						userResponse : userAnswer
					}];
					db.collection("user_session_log").insert(myobj, function (err, res) {
						if (err) throw err;
							console.log("record inserted to user_session_log");
							callback(userAnswer);
					});
			});
	});
}

//Insert into User History Table
function insertUserHistory(user, contextId, sessionId, intent, contextState, sessionState, userQtn, entity, callback){
	var sessionSeq = 1;
	MongoClient.connect("mongodb://localhost:27017/userHistoryHandling", function (err, db) {
		if (err) throw err;
			db.createCollection("user_history", function (err, res) {
				if (err) throw err;
					var myobj = [{
						userId : user,
						contextId : contextId,
						sessionId : sessionId,
						intentName : intent,
						contextState : contextState,
						sessionState : sessionState
					}];
					db.collection("user_history").insert(myobj, function (err, res) {
						if (err) throw err;
							console.log("record inserted to user_history");
					});
			});
	});
	MongoClient.connect("mongodb://localhost:27017/userHistoryHandling", function (err, db) {
		if (err) throw err;
			var collection=db.collection("user_session_log");
			collection.findOne(
				{'userId':user},
				{'sessionSequence':1, 'sessionId':1, '_id' : 0}, 
				//{"sort" : [['sessionSequence', 'desc'], ['sessionId', 'desc']]}, 
				{"sort" : { $natural : -1 }, limit : 1  },
				function (err, docs) {
					if(docs){
						console.log('Exisiting Seq Number value if session id '+parseInt(JSON.stringify(docs.sessionId)));
						if(sessionId != parseInt(JSON.stringify(docs.sessionId))){
							console.log('Highest Session Id  Number for that user is '+parseInt(JSON.stringify(docs.sessionId)));
							sessionSeq = 1;
							insertUserSessionLog(user, sessionId, sessionSeq, entity, userQtn,intent, function(res){
						callback(res);
						
						//Update Session State
						updateUserHistory(user, function(res){
							console.log(res);
						});
						
						});
						}else {
						
					console.log('Highest Sequence Number for that user is '+parseInt(JSON.stringify(docs.sessionSequence)));
						sessionSeq = parseInt(JSON.stringify(docs.sessionSequence))+1;
						insertUserSessionLog(user, sessionId, sessionSeq, entity, userQtn,intent, function(res){
						callback(res);
						
						//Update Session State
						updateUserHistory(user, function(res){
							console.log(res);
						});
						
						});
						}
					}else {
						insertUserSessionLog(user, sessionId, sessionSeq, entity, userQtn,intent, function(res){
						callback(res);
						
						//Update Session State
						console.log('New User Update.... User History...');
						updateUserHistory(user, function(res){
							console.log(res);
						});
						
						});
					}
					
				});
		
	});
}


//Insert into Context Lookup Table
function insertContextLookup(contextId, contextHandler, intent, callback){
	MongoClient.connect("mongodb://localhost:27017/userHistoryHandling", function (err, db) {
		if (err) throw err;
			db.createCollection("context_lookup", function (err, res) {
				if (err) throw err;
					var myobj = [{
							contextId: contextId,
							contextHandler: contextHandler,
							intentName: intent
							}];
					db.collection("context_lookup").insert(myobj, function (err, res) {
						if (err) throw err;
							callback("record inserted to context_lookup");
					});
			});
	});
}


//Update Context state in User rHistory table
function updateContextState(user, contextId, callback){
	MongoClient.connect("mongodb://localhost:27017/userHistoryHandling", function (err, db) {
		if (err) throw err;
			db.collection("user_history").updateMany(
				{'userId':user, 'contextId':contextId, 'sessionState':'close'},
				{ $set: { 'contextState' : 'close' } },
				{ upsert: true }
			);
	});
}

//Update Session State on every answered question in UserHistory
function updateUserHistory(user, callback){
	MongoClient.connect("mongodb://localhost:27017/userHistoryHandling", function (err, db) {
        if (err) throw err;
			db.collection("user_history").findOne(
				{'userId':user},
				{'sessionState':1, '_id' : 0}, 
				{"sort" : { $natural : -1 }, limit : 1  }, 
					function (err, docs) {
						if(docs){
						//var res = JSON.stringify(docs.sessionState);
						//console.log('updateUserHistory Session State is : '+res);
						var myQuery = {sessionState : 'open'};
						var updateQuery = {$set : {sessionState : 'close'}};
						db.collection("user_history").updateOne(myQuery, updateQuery, function(err, res) {
                                    if (err) throw err;
                                        console.log('Session status updated to close....'); 
										callback('Session status updated to close....');	
									});	
						}
			});
					
	});	
		
}

// get Context Id and Context Handler
function getContextId_Handler(intent, callback){
	var contextId;
	var contextHandler;
	var res = [];
if (intent == 'userAndSap'|| intent == 'meet-te'||intent=='schedule'||intent=='done') {
		contextId = 1; 
		contextHandler = 'sapAuditHandler';
		res.push(contextId);
		res.push(contextHandler);
	}
	if (intent == 'piInterfacelookup' || intent == 'outageplan' || intent == 'upgradedetails') {
		contextId = 2;
		contextHandler = 'outageHandler';
		res.push(contextId);
		res.push(contextHandler);
	}
	if (intent == 'greet') {
		contextId = 3;
		contextHandler = 'generalContextHandler';
		res.push(contextId);
		res.push(contextHandler);
	}
	callback(res);
}