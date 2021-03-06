// Returns the userId that is stored as a
// GET variable. If no userId is set then
// returns -1
function getUserId() {
	let url = window.location.href;
	let key = "?userId=";
	let splitIndex = url.lastIndexOf(key);

	if (splitIndex != -1)
		return url.slice(splitIndex + key.length);
	else
		return -1;
}

// Update link references so that userId as a
// GET variable is preserved among page transfers
function updateLinks() {
	let userId = getUserId();
	let links = document.getElementsByTagName("a");

	for (let i = 0; i < links.length; i++) {
		links[i].href += "?userId=" + userId;
	}
}

/*
function makeColors() {
	let all = document.body.getElementsByTagName("*");
	for (let i = 0; i < all.length; i++) {
		let color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		let bgColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		all[i].style.color = color;
		all[i].style.backgroundColor = bgColor;
	}
}
*/

// Waits for the DOM to fully load before trying
// to update link references
document.addEventListener("DOMContentLoaded", function(event) {
   updateLinks();
   //makeColors();
});
