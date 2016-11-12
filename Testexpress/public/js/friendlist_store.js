var savelist;
var bodyId;
function getsaveID(){
	bodyId = document.body.id;
	savelist = bodyId+"friendlist";
}

function save(item, key) {
	getsaveID();
	var friendlistarray = getStorearray(savelist);
	friendlistarray.push(key);
	localStorage.setItem(savelist, JSON.stringify(friendlistarray));
	localStorage.setItem(key, item);
}
function loadFriendlist() {
	var friendlistarray = getSavedFriends();
	var ul = document.getElementById("friendlist");
	if (friendlistarray != null) {
		for (var i = 0; i < friendlistarray.length; i++) {
			var li = document.createElement("li");
			var key = friendlistarray[i];
			li.innerHTML = localStorage[key];
			li.setAttribute("id", key);
			ul.appendChild(li);
		}
	}
}

function getSavedFriends() {
	getsaveID();
	return getStorearray(savelist);
}
function getStorearray(key) {
	var friendlistarray = localStorage.getItem(key);
	if (friendlistarray == null || friendlistarray == ""){
		friendlistarray = new Array();
	}
	else {
		friendlistarray = JSON.parse(friendlistarray);
	}
	return friendlistarray;
}