exports.getMeetingCall=function(callback) {	
callback('I have schedule the meeting tommorow. Please check your mail after few minutes..'); 
console.log('i entererd hereeeee******hi here***'); 
//console.log('i entererd hereeeee*********' +startDate);
	var http = require('http');
	
	var bodyString = JSON.stringify({
			'email' : ['svenum@miraclesoft.com','npalvai@miraclesoft.com'],
			'starttime' : {
				'year' : 2017,
				'month' : 8,
				'day' : 10,
				'hours' :11,
				'minutes' : 00,
				'timezone' : 'CST'
			},
			'endtime' : {
				'year' : 2017,
				'month' : 8,
				'day' : 10,
				'hours' : 13,
				'minutes' : 00,
				'timezone' : 'CST'
				
			},
			'agenda': 'This meeting is for clarifying doubts of auditor on user role changing and sap auditor handling'
			
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
	var callback1 = function(response) {
		var str = '';

		response.on('data', function(chunk) {
		str += chunk;
		});

		//the whole response has been recieved, so we just print it out here
		response.on('end', function() {
			//callback('I have schedule the meeting tommorow'); 
		console.log(str);
		});
		
		
	};

	http.request(options, callback1).write(bodyString);
	
}