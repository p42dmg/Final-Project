var express = require('express');
var fs = require('fs');
var router = express.Router();


router.get('/', function(req, res, next) {
	var id = req.query.id;
	console.log(id);
	var members;
	var profile;
	fs.readFile('data/members.json', 'utf8', function (err, data) {
	  if (err){
		  throw err;
	  }
	  else{
		  console.log(data);
		  members = JSON.parse(data);
		  for(var i = 0; i < members.length; i++){
			  if(members[i].uid === id){
				  profile = members[i];
				  break;
			  }
		  }
		  res.render('profile', { 
			  profile: profile
		  });
	  }
	});
});

module.exports = router;



