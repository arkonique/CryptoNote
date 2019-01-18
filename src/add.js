const electron = require('electron');
const path = require('path');
const remote = electron.remote;
const ipcR = electron.ipcRenderer;

const closebtn = document.querySelector('.closelink');
const notify = document.querySelector('.notify');
const updatebtn = document.querySelector('.updatebtn');

closebtn.addEventListener('click',function(){
	let window = remote.getCurrentWindow();
	window.close();
})

const headText = document.querySelector('.notify');

let currr
ipcR.on('curr-name',(event,curr) => {
	currr=curr
	notify.innerHTML = `Notify me when ${curr} reaches...`
})

ipcR.on('f-name',(event,curr) => {
	document.querySelector('.target').setAttribute('placeholder',curr)
})


updatebtn.addEventListener('click',function(){
	ipcR.send('value',[document.querySelector('.target').value,currr]);
	let window = remote.getCurrentWindow();
	window.close();
})