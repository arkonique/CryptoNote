
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

const electron = require('electron');
const path = require('path');
const remote = electron.remote;
var fs = require('fs');
const ipcR = electron.ipcRenderer;

const os = require('os');
const storage = require('electron-json-storage');

const closebtn = document.querySelector('.closelink');
const notify = document.querySelector('.notify');
const updatebtn = document.querySelector('.updatebtn');


let dpath = path.join(os.homedir(),'coins.json');
let currencies
storage.setDataPath(os.homedir());
storage.get('coins', function(error, currencies) {
	updatebtn.addEventListener('click',function(){
		val = document.querySelector('.target').value;
		if (val!=null && val!=''){
			currencies.push(val)
			currencies = currencies.filter(onlyUnique)
			jsonData=JSON.stringify(currencies)
			storage.set('coins',currencies);
			document.querySelector('.added').innerHTML = `${val} has been added to list (if not previously present)`
			ipcR.send('reload',1);
		}
	})
})

closebtn.addEventListener('click',function(){
	let window = remote.getCurrentWindow();
	window.close();
})

