window.onload = initialize;
var map;
var Lat;
var Lon;
var recentLocations = new Array();

//Initalize map, location markers, and table
function initialize(){
	getMyLocation();
	initMap();
	var button = document.getElementById("addLocation");
	button.onclick = add;
	getLocations();
	createMarkers(recentLocations);
	drawTable(recentLocations);
}

/*===============*/
/* INITALIZE MAP */
/*============== */
function initMap() {
	var pos = new google.maps.LatLng(47.573370,-52.735682);
	map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 10,
	  center: pos
	});
 }
 
/*=======================*/
/* GEOLOCATION FUNCTIONS */
/*====================== */

 //Detect Current Location 
function getMyLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(setLocation, displayError);
	} else {
		alert("Oops, no geolocation support");
	}
}

//Dectect Current Location Handler
function setLocation(position) {
	Lat = position.coords.latitude;
	Lon = position.coords.longitude;
}

//Geolocation errors
function displayError(error) {
	var errorTypes = {
		0: "Unknown error",
		1: "Permission denied by user",
		2: "Position is not available",
		3: "Request timed out"
	};
	var errorMessage = errorTypes[error.code];
	if (error.code == 0 || error.code == 2) {
		errorMessage = errorMessage + " " + error.message;
	}
	var div = document.getElementById("location");
	div.innerHTML = errorMessage;
}

/*====================*/
/* ON LOAD FUNCTIONS  */
/* ===================*/
//gets most recent location per user to display on map at load time

function getLocations(){
	var locationarray = getLocationArray("locationArray");
	var numMembers = 4; //hard coded for now
	var x = 1;
	for(var i = locationarray.length -1; i >= 0; i--){
		if(x == numMembers){
			break;
		}
		else{
			var key = locationarray[i];
			var pos = localStorage.getItem(key);
			pos = JSON.parse(pos);
			console.log(pos);
			console.log(x);
			name = pos.name;
			if(x == 1){
				recentLocations.push(pos);
				x++;
			}
			else{
				if(find(name) == false){
					recentLocations.push(pos);
					x++;
				}
			}
		}
	}
}

//returns array of location references from local storage 
function getLocationArray(key){
	var locationArray = localStorage.getItem(key);
	if (locationArray == null || locationArray == ""){
		locationArray = new Array();
	}
	else {
		locationArray = JSON.parse(locationArray);
	}
	return locationArray;
}

//search recent locations array for user, if they haven't been added yet, add them to array
function find(name){
	for(var i = 0; i < recentLocations.length; i++){
		var temp = recentLocations[i];
		var tempName = temp.name;
		if(name == tempName){
			return true;
		}
	}
	return false;
}

//Draws table on page load based on most recently added locations for each user
 function drawTable(locations){
	 var table = document.getElementById("map-table");
	 var defaultmsg = document.getElementById("defaultmsg");
	 //if default row is found and location array not empty, remove default row
	 if(defaultmsg != null && locations.length != 0){
		 table.deleteRow("1");
	 }
	 var rowNum = table.rows.length;
	 for(var i = 0; i < locations.length; i++){
		 var tr = document.createElement("tr");
		 var l = locations[i];
		 tr.innerHTML = "<td>"+ l.name + "</td><td>" + l.location +"</td><td>" + l.date + "</td><td><button id=\"find-button\" onclick=\"loadLocations('"+ l.name +"')\">x</button></td>";	  
		 for(var j = 0; j < rowNum; j++){
			 var rowName = table.rows[j].cells[0].innerText;
			 if(l.name == rowName){
				 table.deleteRow(j);
				 table.appendChild(tr);
			 }
			 if(j == (rowNum - 1)){
				 if(l.name == rowName){
					table.deleteRow(j);
					table.appendChild(tr);
				}
				else{
					table.appendChild(tr);
				}
			 }
			 
		 }
	}
	colourRows(table);
 }
 
 //add even and odd classes to row for colouring
 function colourRows(table){
	 var rowNum = table.rows.length;
	 for(var i = 0; i < rowNum; i++){
		var tr = table.rows[i];
		if(i > 0 ){
			if(i%2 == 0){
				tr.setAttribute("class", "even");
			}
			else{
				tr.setAttribute("class", "odd");
			}
		}
	 }
 }