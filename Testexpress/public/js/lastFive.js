//function called when 'X' button is pressed, to return last five locations of user and plot to map
function loadLocations(id){
	deleteAllMarkers();
	var lastfiveArray = getLastFive(id);
	createMarkers(lastfiveArray);
}

//pulls last five locations for user from array of location objects, and returns array of those locations
function getLastFive(id) {
	var locationarray = getLocationArray("locationArray");
	var lastFive = new Array();
	var x = 0;
	if (locationarray != null) {
		
		for (var i = locationarray.length-1; i >= 0; i--) {
			
			if(x == 5){
				break;
			}
			else{
				var key = locationarray[i];
				var pos = localStorage.getItem(key);
				pos = JSON.parse(pos);
				if(pos.name == id){
					lastFive.push(pos);
					x++;
				}
				
			}
			
		}
	}
	return lastFive;
}
