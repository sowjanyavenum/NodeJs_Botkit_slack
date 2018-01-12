var emailList = ['npalvai@miraclesoft.com'];

sendMeetingRequest();

function sendMeetingRequest() {					
	var http = require('http');
	var bodyString = JSON.stringify({
			'email' : emailList,
			'starttime' : {
				'year' : 2017,
				'month' : 9,
				'day' : 20,
				'hours' : 11,
				'minutes' : 15,
				'timezone' : 'CST'
			},
			'endtime' : {
				'year' : 2017,
				'month' : 9,
				'day' : 5,
				'hours' : 11,
				'minutes' : 30,
				'timezone' : 'CST'
				
			}
			
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
	var callback = function(response) {
		
		var str = '';

		response.on('data', function(chunk) {
		str += chunk;
		});

		//the whole response has been recieved, so we just print it out here
		response.on('end', function() {
		console.log(str);
		});
	};

	http.request(options, callback).write(bodyString);
	
}