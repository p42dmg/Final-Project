var express = require('express');
var fs = require('fs');
var router = express.Router();


router.get('/', function(req, res, next) {
	function findID(data, idToLookFor) {
		//console.log(data);
		//console.log("id to find: " + idToLookFor);
	    for (var i = 0; i < data.length; i++) {
	    	
	    	//console.log(" user id: " + data[i].uid);
	        if (data[i].uid == idToLookFor) {
	            return(data[i]);
	        }
	    }
	}
	var id = req.query.id;
	//console.log(id);
	var members;
	var profile;
	var friends;
	var friendsArray = new Array();
	fs.readFile('data/members.json', 'utf8', function (err, data) {
	  if (err){
		  throw err;
	  }
	  else{
		 // console.log(data);
		  members = JSON.parse(data);
		  for(var i = 0; i < members.length; i++){
			  if(members[i].uid === id){
				  profile = members[i];
				  friends = profile.friends;
				  
				 // console.log(friends);
				  break;
			  }
		  }
		  for(i = 0; i < friends.length; i++){
			 
			  friendsArray.push(findID(members, friends[i]));
		  }
		 // console.log(friendsArray);
		  res.render('profile', { 
			  profile: profile,
			  friends: friendsArray,
			  members: members, 
			  id: id
		  });
	  }
	});
	
});

module.exports = router;



