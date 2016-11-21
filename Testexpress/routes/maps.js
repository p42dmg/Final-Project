var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET members listing. */
router.get('/', function(req, res, next) {
	var id = req.query.id;
	//console.log(id);
	var members;
	var friends;
	var locationArray = new Array();
	var profile;
	fs.readFile('data/members.json', 'utf8', function (err, data) {
		  if (err){
			  throw err;
		  }
		  else{
			  //console.log(data);
			  members = JSON.parse(data);
			  //get friend array based on id in URL
			  for(var i = 0; i < members.length; i++){
				  if(members[i].uid === id){
					 // console.log("hi");
					  profile = members[i];
					 // console.log(profile);
					  friends = profile.friends;
					 //console.log(friends);
					  break;
				  }
			  }
			  //for each friend, get the last entry in their location array
			  for(i = 0; i < friends.length; i++){
				  var friendID = friends[i];
				 // console.log(friendID);
				  var friendData = members[friendID - 1];
				  var friendLocations = friendData.locations;
				 // console.log(friendLocations.length);
				  var len = friendLocations.length;
				  var lastIndex = len - 1;
				  var last = friendLocations[lastIndex];
				  last.name = friendData.name;
				  locationArray.push(last);
			  }
			  //console.log(locationArray);
			  
			  res.render('map', { 
				  title: 'The Network - Map' ,
				  locationArray: JSON.stringify(locationArray),
				  members: members,
				  id: id
			  });
		  }
		});
	
	  
});

module.exports = router;
