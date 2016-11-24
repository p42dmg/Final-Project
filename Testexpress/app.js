var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var index = require('./routes/index');
var members = require('./routes/members');
var map = require('./routes/maps');
var profile = require('./routes/profile');
var profileEdit = require('./routes/profileEdit');


var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//checking that I can change 

//set port
http.listen(3332, function () {
  console.log('The Network listening on port 3332!');
});

//socket for communication back and forth between client and server
io.on('connection', function(socket){
	  console.log('Connected');
	  
	  socket.on('location', function(obj){
		    console.log('user:' + obj.id + ' is at location: ' + obj.latitude + " " + obj.longitude);
		  //find member in file and update location
		    var members, location, profile;
		    var l = {
		    		lat: obj.latitude,
		    		lon: obj.longitude,
		    		date: obj.date,
		    		location: obj.latitude + " " + obj.longitude
		    }
		    fs.readFile('data/members.json', 'utf8', function (err, data) {
				  if (err){
					  throw err;
				  }
				  else{
					  members = JSON.parse(data);
					  //find member in JSON file
					  for(var i = 0; i < members.length; i++){
						  if(members[i].uid == obj.id){
							  profile = members[i];
							  //set new location object to location field
							  profile.location = l;
							  members = JSON.stringify(members);
							  //rewrite changes to file
							  fs.writeFile('data/members.json', members, function(error) {
								     if (error) {
								       console.error("write error:  " + error.message);
								     } else {
								       console.log("Successful");
								     }
								});
							  break;
						  }
					  }
				  }
		    });
	  });
	  
	  socket.on('getLocations', function(friends){
		  	var members;
			var friends;
			//console.log(friends);
			var locationArray = new Array();
			var profile;
			//open members.JSON file
			fs.readFile('data/members.json', 'utf8', function (err, data) {
				  if (err){
					  throw err;
				  }
				  else{
					
					  members = JSON.parse(data);
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
						  	console.log(locationArray);
						  	socket.emit('newLocations', locationArray);
					  	}
					  	
					  }
					 
					  
				  }
				});
		  
	  });
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//page routing, all the logic for displaying page on load is in routes
app.use('/', index);
app.use('/members', members);
app.use('/map', map);
app.use('/profile', profile);
app.use('/profileEdit', profileEdit);

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());




/*POSTS*/

//profile add friend form post
app.post('/addFriend', function(req, res){
	//needs to get profile id from url
	//and update friend added to json
	//then rediect back to profile page
	
	console.log(req.body);
	//open data file
	var friendArray;
	var members;
	fs.readFile('data/members.json', 'utf8', function (err, data) {
		  if (err){
			  throw err;
		  }
		  else{
			
			  members = JSON.parse(data);
			  for(var i = 0; i < members.length; i++){
				  if(members[i].uid === req.body.profileID){
					  friendArray = members[i].friends;
					  friendArray.push(parseInt(req.body.members));
					  members[i].friends = friendArray;
					 
					  break;
				  }
			  }
			  members = JSON.stringify(members);
			  fs.writeFile('data/members.json', members, function(error) {
				     if (error) {
				       console.error("write error:  " + error.message);
				     } else {
				       console.log("Successful");
				     }
				});
			  
		  }
		});
	
	res.redirect('back');
});

//profile remove friend form post
app.post('/removeFriend', function(req, res){
	//needs to get profile id from url
	//and update friend added to json
	//then rediect back to profile page
	
	console.log(req.body);
	//open data file
	var friendArray;
	var friendID = parseInt(req.body.friendID);
	var profileID = parseInt(req.body.friendID);
	fs.readFile('data/members.json', 'utf8', function (err, data) {
		  if (err){
			  throw err;
		  }
		  else{
			
			  members = JSON.parse(data);
			  //go through file and find member
			  for(var i = 0; i < members.length; i++){
				  if(members[i].uid === req.body.profileID){
					  friendArray = members[i].friends;
					  console.log(friendArray);
					  for(var j = 0; j < friendArray.length; j++){
						  if(friendArray[j] == friendID){
							  friendArray.splice(j, 1); //remove 1 item at index j
						  }
					  }
					  console.log(friendArray);
					  members[i].friends = friendArray;
					 
					  break;
				  }
			  }
			  members = JSON.stringify(members);
			  fs.writeFile('data/members.json', members, function(error) {
				     if (error) {
				       console.error("write error:  " + error.message);
				     } else {
				       console.log("Successful");
				     }
				});
			  
		  }
		});
	
	res.redirect('back');
});

//profile edit profile form post
//we won't be needing this but keeping it now for testing purposes,
// easier to add user info to our JSON file this way
app.post('/editProfile', function(req, res){
	console.log(req.body);
	var members;
	var profile;
	fs.readFile('data/members.json', 'utf8', function (err, data) {
		  if (err){
			  throw err;
		  }
		  else{
			
			  members = JSON.parse(data);
			  for(var i = 0; i < members.length; i++){
				  if(members[i].uid === req.body.profileID){
					  members[i].name = req.body.name;
					  members[i].birthday = req.body.dob;
					  members[i].age = req.body.age;
					  members[i].gender = req.body.gender;
					  members[i].bio = req.body.bio;
					  members[i].schedule = req.body.schedule;
					  members[i].school = req.body.school;
					  members[i].icon = req.body.icon;
					  members[i].iconLarge = req.body.iconLarge;
					  members[i].phoneNumber = req.body.number;
					  break;
				  }
			  }
			  members = JSON.stringify(members);
			  fs.writeFile('data/members.json', members, function(error) {
				     if (error) {
				       console.error("write error:  " + error.message);
				     } else {
				       console.log("Successful");
				     }
				});
		  	}
		  });
	res.redirect('profile?id=' + req.body.profileID);
});


//404 needs to come after posts otherwise they won't work
//catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
