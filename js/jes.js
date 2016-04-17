function drag_start(event) {
	var style = window.getComputedStyle(event.target, null);
	event.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY) + ',' + event.target.getAttribute('data-item'));
}

function drag_over(event) {
	event.preventDefault();
	return false;
}

function drop(event) {
	var offset = event.dataTransfer.getData("text/plain").split(',');
	var dm = document.getElementsByClassName('dragme');
	dm[parseInt(offset[2])].style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
	dm[parseInt(offset[2])].style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
	event.preventDefault();
	return false;
}

var dm = document.getElementsByClassName('dragme');
for (var i = 0; i < dm.length; i++) {
	dm[i].addEventListener('dragstart', drag_start, false);
	document.body.addEventListener('dragover', drag_over, false);
	document.body.addEventListener('drop', drop, false);
}