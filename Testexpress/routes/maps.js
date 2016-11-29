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

  members = fs.readFileSync('data/members.json', 'utf8');
  members = JSON.parse(members);
 //get friend array based on id in URL
  for(var i = 0; i < members.length; i++){
		  if(members[i].uid == id){					  
			  profile = members[i];
					  friends = profile.friends;
					  break;
				  }
}
	
	
	
	  fs.readFile('data/locations.json', 'utf8', function (err, data){
		  if(err){
			  throw err;
		  }
		  else{
			  //for each friend, get their location array
			  var locations = JSON.parse(data);
			  console.log(friends);
			  for(i = 0; i < friends.length; i++){
				  //if their location isn't empty, get the location and add it to the array
				  //to be sent to server
				  console.log(friends[i]);
				  var friendID = friends[i];
				 // console.log(friendID);
				  var friendLocation = locations[friendID - 1];
				  if(friendLocation != 0 ){
				  	console.log(friendLocation);				 
				  	locationArray.push(friendLocation);				  	
			  	}
			  	
			  }
			 // console.log(locationArray);
			  //render the map page, and pass the location array to it
			  res.render('map', { 
				  title: 'The Network - Map' ,
				  locationArray: JSON.stringify(locationArray),
				  id: id,
				  friends: friends
			  });
		  }
	  });
});

module.exports = router;
