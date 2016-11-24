var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET map page */
router.get('/', function(req, res, next) {
	//get ID from query string
	var id = req.query.id;
	
	var members;
	var friends;
	var locationArray = new Array();
	var profile;
	//open members.JSON file
	fs.readFile('data/members.json', 'utf8', function (err, data) {
		  if (err){
			  throw err;
		  }
		  else{
			
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
			  //for each friend, get their location array
			  for(i = 0; i < friends.length; i++){
				  //if their location isn't empty, get the location and add it to the array
				  //to be sent to server
				  
				  var friendID = friends[i];
				 // console.log(friendID);
				  var friendData = members[friendID - 1];
				  var friendLocation = friendData.location;
				  friendLocation.name = friendData.name;
				 console.log(friendLocation);
				 if(friendLocation != ""){
				  	locationArray.push(friendLocation);
			  	}
			  	
			  }
			  console.log(locationArray);
			  //render the map page, and pass the location array to it
			  res.render('map', { 
				  title: 'The Network - Map' ,
				  locationArray: JSON.stringify(locationArray),
				  members: members,
				  id: id,
				  friends: friends
			  });
		  }
		});
	
	  
});

module.exports = router;
