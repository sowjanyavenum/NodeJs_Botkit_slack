var rp = require('request-promise');
 
//restCallCreateFile(function(ans){
	//console.log(ans);
//}); 
 
 
exports.restCallDeleteFile = function(callback){
	console.log('control came to here restCallCreateFile....');
		
	 var options = {
    uri: 'http://localhost:8080/deleteFile',
    //qs: {
        //access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx' 
    //},
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response 
};
 
rp(options)
   .then(function (repos) {
       console.log(repos);
        callback('ok great ');
   })
   .catch(function (err) {
       // API call failed...
   }); 
    

}