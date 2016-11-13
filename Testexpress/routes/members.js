var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET members listing. */
router.get('/', function(req, res, next) {
	
	var members;
	fs.readFile('data/members.json', 'utf8', function (err, data) {
	  if (err){
		  throw err;
	  }
	  else{
		  members = JSON.parse(data);
		  console.log(members);
		  console.log(typeof(members));
	  }
	});
	
	  res.render('members', { 
		  members: members
	  });
	  
});

module.exports = router;



