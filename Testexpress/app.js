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
var groups = require('./routes/groups');
var profile = require('./routes/profile');
var profileEdit = require('./routes/profileEdit')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//checking that I can change 

//set port
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
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
app.use('/groups', groups);
app.use('/map', map);
app.use('/profile', profile);
app.use('/profileEdit', profileEdit);
/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

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
					  members = JSON.stringify(members);
					  break;
				  }
			  }
			  
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
					  members = JSON.stringify(members);
					  break;
				  }
			  }
			  
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

// catch 404 and forward to error handler
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
