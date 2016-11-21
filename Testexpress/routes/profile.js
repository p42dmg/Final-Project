var express = require('express');
var fs = require('fs');
var router = express.Router();

//GET profile page
router.get('/', function(req, res, next) {
	function findID(data, idToLookFor) {
		//based on the uid of a friend, find their data in members and return it
	    for (var i = 0; i < data.length; i++) {
	    	
	        if (data[i].uid == idToLookFor) {
	            return(data[i]);
	        }
	    }
	}
	//get ID from query string
	var id = req.query.id;
	//console.log(id);
	var members;
	var profile;
	var friends;
	var friendsArray = new Array();
	//open members file
	fs.readFile('data/members.json', 'utf8', function (err, data) {
	  if (err){
		  throw err;
	  }
	  else{
		 // console.log(data);
		  members = JSON.parse(data);
		  //find friend list for ID
		  for(var i = 0; i < members.length; i++){
			  if(members[i].uid === id){
				  profile = members[i];
				  friends = profile.friends;
				  
				 // console.log(friends);
				  break;
			  }
		  }
		  for(i = 0; i < friends.length; i++){
			 //for each friendID in array push data for that member to an array to send to the client
			  friendsArray.push(findID(members, friends[i]));
		  }
		 // pass the friend array we created to the page on render
		  res.render('profile', { 
			  title: "The Network - Profile",
			  profile: profile,
			  friends: friendsArray,
			  members: members, 
			  id: id
		  });
	  }
	});
	
});

module.exports = router;



