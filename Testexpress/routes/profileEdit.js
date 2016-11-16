var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET members listing. */
router.get('/', function(req, res, next) {
	var id = req.query.id;
	console.log(id);
	var members;
	var profileData;
	fs.readFile('data/members.json', 'utf8', function (err, data) {
		  if (err){
			  throw err;
		  }
		  else{
			 // console.log(data);
			  members = JSON.parse(data);
			  for(var i = 0; i < members.length; i++){
				  if(members[i].uid === id){
					  profileData = members[i];
					  console.log(profileData);
					  break;
				  }
			  }
			  res.render('profileEdit', { 
				  title: 'The Netwok - Edit',
				  profileID: id,
				  profile: profileData
			  });
		  }
		});
	  
});

module.exports = router;