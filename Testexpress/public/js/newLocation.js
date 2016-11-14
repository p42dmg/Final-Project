/*==================*/
/* ADD NEW LOCATION */
/* =================*/

// fires when Add Location button is pushed, and adds location to map
function add(){
    var table = document.getElementById("map-table");
	 var defaultmsg = document.getElementById("defaultmsg");
	 if(defaultmsg != null){
		 table.deleteRow("1");
	 }
	var nameInput = document.getElementById("selectMember");
	var name = nameInput.value;
	var locationInput = document.getElementById("loci");
	var location = locationInput.value;
	var loci;
	var d = new Date();
	var lat;
	var lon;
	var selectindex = nameInput.selectedIndex;
	var markerID = selectindex;
    var img = setMarkerColour(markerID);
	var key = d.getTime();
	d = d.toJSON().slice(0,10).replace(new RegExp("-", 'g'),"/" ).split("/").reverse().join("/")+" "+d.toJSON().slice(11,19);
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
	var content = name + " was here: " + location + "</br>date added: " + d;
	 var marker = new google.maps.Marker({
          position: loci,
          map: map,
		  clickable: true,
          icon: img            
     });
	 var infoWindowOptions = {
		content: content,
		position: loci
	};
	var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
	google.maps.event.addListener(marker, "click", function() {
		infoWindow.open(map);
	});
	
	var l = {
		name: name,
		lat: lat,
		lon: lon,
		date: d,
		location: location,
		markerID: markerID
	}
    
	saveLocation(key, l);
	addRecent(name, l);
	CreatedMarkers.push(marker);
 }

 
 //updates recently added location array when new location is added, check if user is already there
function addRecent(name, loc){
	for(var i = 0; i < recentLocations.length; i++){
		var temp = recentLocations[i];
		var tempName = temp.name;
		if(name == tempName){
			recentLocations.pop(temp);			
			recentLocations.push(loc);
			break;
		}
		else{
			recentLocations.push(loc);
		}
	}
	addRow(loc);
}

//adds new row (or appends row if user is all ready in table) when a new location is added on the page
 function addRow(row){
	 var table = document.getElementById("map-table");
	 var rowNum = table.rows.length; 
	 var tr = document.createElement("tr");
	 var l = row;
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
	colourRows(table);
 }