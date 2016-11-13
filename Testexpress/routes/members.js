var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET members listing. */
router.get('/', function(req, res, next) {
	//this way works
	var members = [
	           	{
	        		"name": "Danielle Gillespie",
	        		"uid": "1",
	        		"icon": "icon03.png"
	        	},
	        	{
	        		"name": "Joseph Gibson",
	        		"uid": "2",
	        		"icon": "icon01.png"
	        	}
	        	
	        ];
	/* this way doesn't???
	fs.readFile('data/members.json', 'utf8', function (err, data) {
	  if (err){
		  throw err;
	  }
	  else{
		  members = JSON.parse(data);
		  console.log(members);
		  console.log(typeof(members));
	  }
	});*/
	
	  res.render('members', { 
		  members: members
	  });
	  console.log(members);
	  
});

module.exports = router;



