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

//var expressValidator = require('express-validator');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//checking that I can change 

//set port
http.listen(3333, function () {
  console.log('The Network listening on port 3333!');
});

io.on('connection', function(socket){
	  console.log('Connected');
	  
	  setInterval(function () {
 			 socket.emit('hi', 'hello client!');
		}, 1000);

	  socket.on('hello', function(msg){
		    console.log('message: ' + msg);
	  });
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/members', members);
app.use('/map', map);
app.use('/profile', profile);
app.use('/profileEdit', profileEdit);

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());
//app.use(expressValidator); 



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

//map add new location
app.post('/addLocation', function(req, res){
	//create new location object
	console.log(req.body);
	var uid = req.body.members;
	var location = req.body.location;
	var d = new Date();
	d = d.toJSON().slice(0,10).replace(new RegExp("-", 'g'),"/" ).split("/").reverse().join("/")+" "+d.toJSON().slice(11,19);
	var loci;
	var lat;
	var lon;
	if(location == "Downtown"){
		loci = {lat: 47.560541, lng: -52.712831};
		lat = 47.560541;
		lon = -52.712831;
	}
	else if(location == "Avalon Mall"){
		loci = {lat: 47.561624, lng: -52.756078};
		lat =  47.561624;
		lon = -52.756078;
	}
	else if(location == "Village Mall"){
		loci = {lat: 47.535139, lng: -52.750983};
		lat = 47.535139;
		lon = -52.750983;
	}
	else if(location == "MUN Center"){
		loci = {lat: 47.573370, lng: -52.735682};
		lat =  47.573370;
		lon = -52.735682;
	}
	else{
		loci = {lat: Lat, lng: Lon};
		lat = Lat;
		lon = Lon;
	}
	
	var l = {
			lat: lat,
			lon: lon,
			date: d,
			location: location,
		}
	
	//find member in file and update location
	var members;
	var locationsArray = new Array();
	fs.readFile('data/members.json', 'utf8', function (err, data) {
		  if (err){
			  throw err;
		  }
		  else{
			
			  members = JSON.parse(data);
			  for(var i = 0; i < members.length; i++){
				  if(members[i].uid === uid){
					  locationsArray = members[i].locations;
					  locationsArray.push(l);
					  members[i].locations = locationsArray;
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
	
	res.redirect('map?id=' + req.body.profileID);
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
