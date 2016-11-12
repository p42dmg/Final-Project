/*=============*/
/* MAP MARKERS */
/*=============*/
var CreatedMarkers = [];
var infoWindow = new google.maps.InfoWindow();

function deleteAllMarkers() {
    for (var i = 0; i < CreatedMarkers.length; i++) {
		CreatedMarkers[i].setMap(null);
    }
	CreatedMarkers = [];
 }
 
 function bindInfoWindow(marker, map, infowindow, html) {
    marker.addListener('click', function() {
		infowindow.close();
        infowindow.setContent(html);
        infowindow.open(map, this);
    });
} 

//takes array of location objects, creates map markers for them, and add them to map
function createMarkers(markers){
	for(var i = 0; i < markers.length; i++){
		var position = markers[i];
		var name = position.name;
		var location = position.location;
		var loci = {lat: position.lat, lng: position.lon};
		var d = position.date;
		var img = setMarkerColour(position.markerID);
		var marker = new google.maps.Marker({
			  position: loci,
			  clickable: true,
			  draggable: true,
			  icon: img
		 });
		 marker.setMap(map);
		var content = name + " was here: " + location + "</br>date added: " + d;
		var infoWindowOptions = {
			content: content,
			position: loci
		};
    
		
		/*google.maps.event.addListener(marker, "click", function() {
			infoWindow.open(map, this);
		});*/
		bindInfoWindow(marker, map, infoWindow, content); 
       
        CreatedMarkers.push(marker);

	}

 }

 //generates coloured icon URLs
 function setMarkerColour(id){
	 var MarkerURL="http://maps.google.com/mapfiles/ms/icons/";    
	var Marker = [  MarkerURL + 'red-dot.png',
					MarkerURL + 'green-dot.png',
					MarkerURL + 'blue-dot.png',
					MarkerURL + 'orange-dot.png',
                    MarkerURL + 'pink-dot.png',   
					MarkerURL + 'purple-dot.png',					   
					MarkerURL + 'yellow-dot.png'];
	return Marker[id];
 }