function getremoveID(){
	bodyId = document.body.id;
	removelist = bodyId+"removelist";
}

function saveRemove(item) {
	getremoveID();
	var removelistarray = getRemovearray(removelist);
	removelistarray.push(item);
	localStorage.setItem(removelist, JSON.stringify(removelistarray));
}
function removeFriendlist() {
	var removelistarray = getRemovedFriends();
	var ul = document.getElementById("friendlist");
	if (removelistarray != null) {
		for (var i = 0; i < removelistarray.length; i++) {
			var li = document.getElementById(removelistarray[i]);
			ul.removeChild(li);
		}
	}
}
function getRemovedFriends() {
	getremoveID();
	return getRemovearray(removelist);
}
function getRemovearray(key) {
	var removelistarray = localStorage.getItem(key);
	if (removelistarray == null || removelistarray == ""){
		removelistarray = new Array();
	}
	else {
		removelistarray = JSON.parse(removelistarray);
	}
	return removelistarray;
}