if (!process.env.token) {
    console.log('Error: Specify token in environment')
    process.exit(1)
}

//var Botkit = require('botkit')
var Botkit = require('../lib/Botkit.js');
var userlogins = require('../examples/userLogins/dbOperations.js');
var rasa = require('../src/middleware-rasa')({
    rasa_uri: 'http://192.168.1.119:5000',
	    rasa_model: 'model_20170719-180536'
   })

var controller = Botkit.slackbot({
    debug: true
})

var bot = controller.spawn({
    token: process.env.token
}).startRTM()
console.log(rasa);

controller.middleware.receive.use(rasa.receive);

// Greet
controller.hears(['greet'], 'direct_message,direct_mention,mention', rasa.hears, function (bot, message){

    console.log(JSON.stringify(message));
    var res =   userlogins.contextLookup(message.user,message.text,message.intent.name,message.entities,function(userRes){
            console.log("response receieved: " + userRes);
			bot.reply(message,userRes);
			//convo.say(userRes);
        });
});

controller.hears(['piInterfacelookup'], 'direct_message,direct_mention,mention',rasa.hears, function(bot, message) {

  bot.startConversation(message, function(err, convo){
	   console.log(message.entities);
	   var data=message.entities;
	  var entityparse;
	  	  
	 
	  if(data==''){
		  entityparse=data;
		  	  
	  console.log('heyyyyyyyyy'+entityparse);
	  }
	   else{
	 entityparse=data[0]["entity"];
	  
	  console.log('heyyyyyyyyy'+entityparse);
	  }
	var res=   userlogins.contextLookup(message.user,message.text,message.intent.name,entityparse,function(userRes){
            console.log("response receieved: " + userRes);
			//bot.reply(message,userRes);
			convo.say(userRes);
        });
	
	
});
});


//user role change
controller.hears(['userAndSap'], 'direct_message,direct_mention,mention',rasa.hears, function(bot, message) {
	
	console.log(JSON.stringify(message));
   var res =   userlogins.contextLookup(message.user,message.text,message.intent.name,message.entities,function(userRes){
            console.log("response receieved: " + userRes);
			bot.reply(message,userRes);
        });
});

//meet-te
controller.hears(['meet-te'], 'direct_message,direct_mention,mention',rasa.hears, function(bot, message) {
	console.log(JSON.stringify(message));
	var data=message.entities;
    var entityparse;
	 if(data==''){
         entityparse=data;
         console.log('heyyyyyyyyy'+entityparse);
     } else{
    entityparse=data[0]["entity"];
     
     console.log('heyyyyyyyyy'+entityparse);
     }
   var res =   userlogins.contextLookup(message.user,message.text,message.intent.name,entityparse,function(userRes){
            console.log("response receieved: " + userRes);
			bot.reply(message,userRes);
        });
		if(entityparse=='tomorrow'){
			 bot.say
			({    
				id: 1,
				type: 'message',
				text: 'hii TE',
				user: 'sowjanya venum',
				channel: 'D69DBA54L' // a valid slack channel, group, mpim, or im ID
                  //channel:'D5V8XR9K2'
			});
		}
});
controller.hears(['upgradedetails'], 'direct_message,direct_mention,mention',rasa.hears, function(bot, message) {

  bot.startConversation(message, function(err, convo){
	   console.log('heyyyyy entities are for upgrade plannnnnn.....'+message.entities);
	   
	  var data=message.entities;
	  var entityparse=[];
	  	 
	 
	  if(data==''){
		  entityparse=data;
		  	  
	  console.log('heyyyyyyyyy'+entityparse);
	  }
	   else{
		   
	 entityparse=data[0]["entity"];
	  
	  console.log('heyyyyyyyyy'+entityparse);
	  }
	   
	
	 var res=   userlogins.contextLookup(message.user,message.text,message.intent.name,entityparse,function(userRes){
            console.log("response receieved: " + userRes);
			//bot.reply(message,userRes);
			convo.say(userRes);
        });
	 
	 
   });
});
//outageplan
controller.hears(['outageplan'], 'direct_message,direct_mention,mention',rasa.hears, function(bot, message) {
  bot.startConversation(message, function(err, convo){
	   console.log('heyyyyy entities are for upgrade plannnnnn.....'+message.entities);
	  var data=message.entities;
	  var entityparse=[];
	  	  
	 
	  if(data==''){
		  entityparse=data;
		  	  
	  console.log('heyyyyyyyyy'+entityparse);
	  }
	   else if(data.length==1){
	 entityparse.push(data[0]["entity"]);
	  
	  console.log('heyyyyyyyyy'+entityparse);
	  }
	   else{
		  for(var i=0;i<data.length;i++)
		  {
		  entityparse.push(data[i]["entity"]);
		  
		  }
	  console.log('the entirty pasdre s *********************8:'+entityparse)
  }
	
	 var res=   userlogins.contextLookup(message.user,message.text,message.intent.name,entityparse,function(userRes){
            console.log("response receieved: " + userRes);
			bot.reply(message,userRes);
			//convo.say(userRes);
        });	  
   });
});



//done
controller.hears(['done'], 'direct_message,direct_mention,mention',rasa.hears, function(bot, message) {
	console.log(JSON.stringify(message));
   var res =   userlogins.contextLookup(message.user,message.text,message.intent.name,message.entities,function(userRes){
            console.log("response receieved: " + userRes);
			bot.reply(message,userRes);
        });
});

//schedule
controller.hears(['schedule'], 'direct_message,direct_mention,mention',rasa.hears, function(bot, message) {
	
	console.log(JSON.stringify(message));
	//if(message.intent.name=='schedule'){
		
   var res =   userlogins.contextLookup(message.user,message.text,message.intent.name,message.entities,function(userRes){
            console.log("response receieved: " + userRes);
			bot.reply(message,userRes);
			
        });
	
		
			 bot.say
			({    
				id: 1,
				type: 'message',
				text: 'I have schedule a meeting for tomorrow',
				user: 'npalvai',
				//channel: 'D697KA8Q0' // a valid slack channel, group, mpim, or im ID
                  channel:'D68RBNDTK'
			});
		
});