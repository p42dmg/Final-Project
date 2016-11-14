window.onload = init;

function init() {
	var button = document.getElementById("addFriend");
	//loadFriendlist();
	//removeFriendlist();
	button.onclick = handleButtonClick;
}
function handleButtonClick() {
	var nameInput = document.getElementById("selectMember");
	var name = nameInput.value;
	
	if(name == ""){
		alert("Please choose a member to add");
	}
	else{
		var li = document.createElement("li");
		var currentDate = new Date();
		var key = "friend_"+currentDate.getTime();
		li.setAttribute("id", key);
		li.innerHTML = "<div class=\"remove\"\"><button onclick=\"removeFriend('"+key+"', '"+name+"')\">x</button></div><div class=\"link\"><a href=\"#\" title=\" " + name + "\"><div class=\"friend-img\"><img class=\"small-icon\" src=\"../images/icon02.png\" alt=\" " + name +" \" ></div><div class=\"friend-info\"><p>" + name + "<br></p></div></a></div>";							
		var ul = document.getElementById("friendlist");
		ul.appendChild(li);
		save(li.innerHTML, key);
	}
	
}

function removeFriend(id, name){
	var li = document.getElementById(id);
	var ul = document.getElementById("friendlist");
	ul.removeChild(li);
	saveRemove(id);
}