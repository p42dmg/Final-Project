//saves location to local storage and a reference to location array
function saveLocation(key, object){
	//save location object to local storage with key
	localStorage.setItem(key, JSON.stringify(object));
	var locationArray = getLocationArray("locationArray");
	//add key to array of keys
	locationArray.push(key);
	//save array to local storage
	localStorage.setItem("locationArray", JSON.stringify(locationArray));
	
}



 
 
 
 
 
 



 