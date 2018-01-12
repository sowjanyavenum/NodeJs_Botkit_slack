
var interfaceList=require('../outageHandling/restCallForPDF.js');
var meetingCall= require('../outageHandling/restCallForMeeting.js');
//var userHistory = require('../userLogins/user_session_History.js');
var MongoClient = require('mongodb').MongoClient;

exports.PIConfigHelp = function(name,entity,callback){
	
	  if(name=='can you help me in finding the PI configurations?'){
		console.log('control came to say hi method...');
      callback('Sure.. I will be able to help you, which interface are you looking for..?');
	  }
      else if(name=='can you get me the live interfaces in PI?')  {
	    console.log('control came to say hi method...');
        callback('Do you need all of them or just inbound or outbound interfaces?');
	  }
	  else{
		  console.log('I came to set entity here**********************************'+entity);
		  var shque = interfaceList.getPdfDetailsSource(entity, function(userRes){
		  console.log('i eentererd hereeeee*********');
     	  console.log('************************User Response for get me ECC interfaces****************************** '+userRes);
          callback('ok sure, will send the details to you for interfaces: '+userRes);
          
    });
		  
	  }
}
//outageplan
exports.upgradeEccOutage = function(name,callback){
	//if(name.includes('ecc')&&name.includes('upgrade')&&name.includes('outage'))
console.log('control came to say hi method...');
callback('ok I have sent you a plan, please check and let me know if you want to proceed..');
}

//conformation

exports.Conformation = function(name,callback){
	if(name=='ok we are good with this, please proceed')
console.log('control came to say hi method...');
callback('ok sure I can do that, but when are we planning to this?');
}
/*//await
exports.await = function(name,callback){
	if(name==' give me sometime to check this, will get back to you later')
console.log('control came to say hi method...');
callback('okay sure..');
}
*/
//upgradedetails

exports.upgradedetails = function(name,entity,callback){
	var previousQtn;
	var startDate,
	     endDate,
		 starthrTime,
		 endhrTime,
		 monthstart,
		 monthend;
	var que = [];
	
	console.log('questions :'+que);
	console.log('I came here ???????'+entity);
	if(entity =='start')
	{
		console.log('I came here ???????');
	callback('okay and when does it end?');
	}	
	
	if(entity=='end')
	{
		  MongoClient.connect("mongodb://localhost:27017/userHistoryHandling", function (err, db) {
				if (err) throw err;
					var collection=db.collection("user_session_log");
	  collection.findOne({},{'userQuestion':1, '_id' : 0}, {"sort" : [['sessionSequence', 'desc']]}, function (err, docs) { 
                            var res = JSON.stringify(docs).replace(/[^a-zA-Z0-9,:.@-]/g," ");	  
							res = res.substring(res.lastIndexOf(":")+2);
							
						console.log('*****************************my qyuery is 1234567989189379817239812***********:' +res);					
			 console.log('I came to set entity here**********************************'+entity);
		  res = res.split(" ");
		var stringArray = new Array();
		for(var i=0;i<res.length;i++)
		{
			stringArray.push(res[i]);
			console.log('helooooo the names are'+res[i]);
			 if(i != res.length-1)
			 {
        stringArray.push(" ");
          }
		}
		
		

 var AMPM=res[9];
 console.log(res[8]+'value:'+AMPM);
 if(AMPM == 'pm' ) { 
 res[8]= parseInt(res[8])+12;
	console.log(res[8]+'value:'+AMPM);
 }
 
	
		startDate=res[5];
		starthrTime=res[8];
		monthstart=res[6];
		
		 name = name.split(" ");
		var stringArray1 = new Array();
		for(var i=0;i<name.length;i++)
		{
			stringArray1.push(name[i]);
			console.log('helooooo the names are'+name[i]);
			 if(i != name.length-1)
			 {
        stringArray1.push(" ");
          }
		}
		
		
		var AMPM=name[9];
 if(AMPM == 'pm')  {name[8]= parseInt(name[8])+12;}

				
		endDate=name[5];
		endhrTime=name[8];
		monthend=name[6];
		console.log('control came to say hi method...');
		console.log('dates and times:    *&&&&&&&&&&&&&&&: '+startDate,endDate,monthstart,monthend,starthrTime,endhrTime);
		var shque = meetingCall.getMeetingCall(startDate,endDate,monthstart,monthend,starthrTime,endhrTime, function(userRes){
		 
			   console.log('i entererd hereeeee*********' +startDate);
     		 console.log('************************User Response '+userRes);
            callback(userRes);
          }); 
});
	});	
	}
 
	
 }