if (!process.env.token) {
    console.log('Error: Specify token in environment')
    process.exit(1)
}

//var Botkit = require('botkit')
var Botkit = require('../lib/Botkit.js');
var userlogins = require('../examples/userLogins/dbOperations.js');
/*var rasa = require('../src/middleware-rasa')({
    rasa_uri: 'http://192.168.1.119:5000',
	    rasa_model: 'model_20170707-164653'
    //rasa_model: 'model_20170713-104616'--meete
	//rasa_uri: 'http://localhost:5000',
    //rasa_model: undefined
})*/
var rasa1 = require('../src/middleware-rasa')({
    rasa_uri: 'http://192.168.1.119:5000',
	   // rasa_model: 'model_20170707-164653',
    rasa_model: 'model_20170713-104616'
	//rasa_uri: 'http://localhost:5000',
    //rasa_model: undefined
})

var controller = Botkit.slackbot({
    debug: true
})

var bot = controller.spawn({
    token: process.env.token
}).startRTM()
//console.log(rasa);
console.log(rasa1);
//controller.middleware.receive.use(rasa.receive);
controller.middleware.receive.use(rasa1.receive);
// Greet
/*
controller.hears(['greet'], 'direct_message,direct_mention,mention', rasa.hears, function (bot, message){
	
	
    console.log(JSON.stringify(message));
    var res =   userlogins.contextLookup(message.user,message.text,message.intent.name,message.entities,function(userRes){
            console.log("response receieved: " + userRes);
			bot.reply(message,userRes);
        });
});

//Affirm
controller.hears(['affirm'], 'direct_message,direct_mention,mention', rasa.hears, function (bot, message){
	
	
    console.log(JSON.stringify(message));
    var res =   userlogins.contextLookup(message.user,message.text,message.intent.name,message.entities,function(userRes){
            console.log("response receieved: " + userRes);
			bot.reply(message,userRes);
        });
});

//Good Bye
controller.hears(['goodbye'], 'direct_message,direct_mention,mention', rasa.hears, function (bot, message){
	
	
    console.log(JSON.stringify(message));
    var res =   userlogins.contextLookup(message.user,message.text,message.intent.name,message.entities,function(userRes){
            console.log("response receieved: " + userRes);
			bot.reply(message,userRes);
        });
});

//introduce
controller.hears(['introduce'], 'direct_message,direct_mention,mention', rasa.hears, function (bot, message){
	
	
    console.log(JSON.stringify(message));
    var res =   userlogins.contextLookup(message.user,message.text,message.intent.name,message.entities,function(userRes){
            console.log("response receieved: " + userRes);
			bot.reply(message,userRes);
        });
});


//user role change
controller.hears(['userRoleChange'], 'direct_message,direct_mention,mention',rasa.hears, function(bot, message) {
	console.log(JSON.stringify(message));
   var res =   userlogins.contextLookup(message.user,message.text,message.intent.name,message.entities,function(userRes){
            console.log("response receieved: " + userRes);
			bot.reply(message,userRes);
        });
});

//sap standard profile
controller.hears(['sapStandardProfile'], 'direct_message,direct_mention,mention',rasa.hears, function(bot, message) {
	console.log(JSON.stringify(message));
   var res =   userlogins.contextLookup(message.user,message.text,message.intent.name,message.entities,function(userRes){
            console.log("response receieved: " + userRes);
			bot.reply(message,userRes);
        });
});


//meet-te
controller.hears(['meetTe'], 'direct_message,direct_mention,mention',rasa.hears, function(bot, message) {
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
				user: 'U66CKR80J',
				//channel: 'D697KA8Q0' // a valid slack channel, group, mpim, or im ID
                  channel:'D68GGJ6TF'
			});
		}
});
*/
//done
controller.hears(['done'], 'direct_message,direct_mention,mention',rasa1.hears, function(bot, message) {
	console.log(JSON.stringify(message));
   var res =   userlogins.contextLookup(message.user,message.text,message.intent.name,message.entities,function(userRes){
            console.log("response receieved: " + userRes);
			bot.reply(message,userRes);
        });
});

//schedule
controller.hears(['schedule'], 'direct_message,direct_mention,mention',rasa1.hears, function(bot, message) {
	
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
				user: 'sowjanya venum',
				//channel: 'D697KA8Q0' // a valid slack channel, group, mpim, or im ID
                  channel:'D5Z9PC6SH'
			});
		
});