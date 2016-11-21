var express = require('express');
var fs = require('fs');
var router = express.Router();


router.get('/', function(req, res, next) {
	
	var members;
	//open members file and send the data to the client side
	fs.readFile('data/members.json', 'utf8', function (err, data) {
	  if (err){
		  throw err;
	  }
	  else{
		  members = JSON.parse(data);
		  res.render('members', { 
			  title: "The Network - Members",
			  members: members
		  });
	  }
	});
});

module.exports = router;



