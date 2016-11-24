/*=======================*/
/* GEOLOCATION FUNCTIONS */
/*====================== */

 //Detect Current Location 
var Lat, Lon;
function getMyLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(setLocation, displayError);
		var d = new Date();
		d = d.toJSON().slice(0,10).replace(new RegExp("-", 'g'),"/" ).split("/").reverse().join("/")+" "+d.toJSON().slice(11,19);
		var location = {
			latitude: Lat,
			longitude: Lon,
			date: d
		};
		return location;
	} else {
		alert("Oops, no geolocation support");
	}
}

//Set Coordinents 
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