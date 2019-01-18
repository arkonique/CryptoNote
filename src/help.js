const electron = require('electron');
const path = require('path');
const remote = electron.remote;

const closebtn = document.querySelector('.closelink');

closebtn.addEventListener('click',function(){
	let window = remote.getCurrentWindow();
	window.close();
})