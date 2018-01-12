//var emailList = ['abhattar@miraclesoft.com'];
//for contacts list
var SourceHostContacts = require('../outageHandling/getContactsSH.js');
var source='all'
var emailList=SourceHostContacts.getContacts('ECC', function(userRes){
			 //  console.log('i entererd hereeeee*********');
     		// console.log('************************User Response '+userRes);
            //callback('ok thanks for the information, will quickly schedule this activity and let you know.. '+userRes);
          
    });

 exports.getMeetingCall=function(startDate,endDate,monthstart,monthend,starthrTime,endhrTime,callback) {	

console.log('i entererd hereeeee******hi here***'); 
console.log('i entererd hereeeee*********' +parseInt(startDate));
console.log('i entererd hereeeee*********' +monthstart);
console.log('i entererd hereeeee*********' +parseInt(starthrTime));
console.log('i entererd hereeeee*********' +parseInt(endDate));
console.log('i entererd hereeeee*********' +monthend);
console.log('i entererd hereeeee*********' +parseInt(endhrTime));
	var http = require('http');
	
	var bodyString = JSON.stringify({
			'email' : ['svenum@miraclesoft.com','npalvai@miraclesoft.com'],
			'starttime' : {
				'year' : 2017,
				'month' : monthstart,
				'day' : parseInt(startDate),
				'hours' : parseInt(starthrTime),
				'minutes' : 0,
				'timezone' : 'CST'
			},
			'endtime' : {
				'year' : 2017,
				'month' : monthend,
				'day' : parseInt(endDate),
				'hours' : parseInt(endhrTime),
				'minutes' : 0,
				'timezone' : 'CST'
				
			},
			'agenda' :'This meeting is for coordinating during the ECC upgrade and hold the transactions during the upgrade'	
			
		});

	var headers = {
		'Content-Type': 'application/json',
		'Content-Length': bodyString.length
	};
	

	var options = {
		host: 'localhost',
		path: '/sendMeetingRequest',
		port: 8080,
		method: 'POST',
		headers: headers
	};
	var resp = function(response) {
		var str = '';

		response.on('data', function(chunk) {
		str += chunk;
		
		});

		//the whole response has been recieved, so we just print it out here
		response.on('end', function() {
		console.log(str);
		
		});
		
	};
	
	http.request(options, resp).write(bodyString);
	 callback('ok thanks for the information, will quickly schedule this activity and let you know..');

}