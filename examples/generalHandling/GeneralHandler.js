exports.sayHi = function(name,callback){
console.log('control came to say hi method...');
callback('Hi. I am here to support you..');
}
exports.afrm = function(name,callback){
         console.log('control came to say hi method...');
   callback('good deal');
}

/*exports.awt = function(name,callback){
	//if(name==' give me sometime to check this, will get back to you later')
console.log('control came to say hi method...');
callback('okay sure..');
}*/
exports.wait = function(name,callback){
							console.log('im 99999999999999999999999888888888888888888888888888888888888888888888888888888888888888');

         console.log('control came to say hi method...');
   callback('okay sure..');
}

exports.intro = function(name, callback){
   
       console.log('control came to this method...');
   callback('Hi,Am here to support you for auditing our systems');
}

exports.userSapRoleChange = function(name, callback){
          console.log('control came to this method...');
   callback('sure, let me pull the details for you, give me a min.');

}


exports.scheduleMeet = function(name, callback){
          console.log('control came to this method...');
   callback('I have scheduled a meeting for tomorrow.');

}

exports.ssprofile = function(name, callback){
   if(name=='I have a question on SAP Standard profile users,can I talk to your technical expert?'||name=='can you setup a meeting to go through this tomorrow?')
       console.log('control came to this method...');
   callback('Sure, when do you want meet our technical expert.');

}

exports.tmw = function(name, callback){
   if(name=='can you setup a meeting to go through this tomorrow?')
       console.log('control came to this method...');
   callback('ok let me check his availability and get back to you.');

}

exports.giveResponse = function(name, callback){
	if(name=='whatsup')
console.log('control came to this method...');
callback('Welcome to BOT. Nice to talk with you How can I help you'); //we have to get the parameters from RASA
}
exports.giveIntro = function(name, callback){
	if(name=='introduce')
console.log('control came to this method...');
callback('Am here to support you for Auditing our systems and make you feel how fun the process is!');
}
exports.giveSendoff = function(name, callback){
	if(name=='thankyou')
console.log('control came to this method...');
callback('Thank You for availing my service');
}
exports.sayGdbye = function(name, callback){
	if(name=='goodbye')
console.log('control came to this method...');
callback('Okay thanks for using me, will be to help you at anytime');
}
exports.iSearch = function(name, callback){
	if(name=='integration-search')
console.log('control came to this method...');
callback('Stronghold susets the traditional way of integrating applications over point to point communication and comes with a robust message processing framework which is loosely coupled and configuration driven, which enables enterprise applications to send or receive data for their bussiness activities');
}
exports.userSearch = function(name, callback){
	if(name=='user-search')
console.log('control came to this method...');
callback('HRO is employing stronghold to perform their associate validations, enrich their data by interacting with their sub systems and generate IDOCs and post the data to SAP applications for updating Wal-Mart associates information.');
}
exports.strongHold = function(name, callback){
	if(name=='stronghold-question')
console.log('control came to this method...');
callback('Enabling stronghold to consume the message posted by Mainframe/SAP/Any application who support MQ for sharing/integrating their data with other application');
}
