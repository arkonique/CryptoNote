const electron = require('electron');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const ipcR = electron.ipcRenderer;
const os = require('os');
const storage = require('electron-json-storage');

const BrowserWindow = electron.remote.BrowserWindow;

setInterval(function(){
if (navigator.onLine) {
   document.querySelector('.connection').style.display = 'none';
} else {
   document.querySelector('.connection').style.display = 'flex';
}
},1000)

let targets = new Map()
let symbols = new Map([['USD','$'],['EUR','&euro;'],['JPY','&#165;'],['INR','&#8377;'],['BTC','&#x20BF;']])
const notification = []

let dpath = path.join(os.homedir(),'coins.json');

fs.stat(dpath, function(err, stat) {
    if(err == null) {
    } else if(err.code === 'ENOENT') {
		storage.setDataPath(os.homedir());
		storage.set('coins',["BTC","ETH","XRP","BCH","LTC","XMR","NEO","DASH"])
		ipcR.send('reload',1)
    } else {
		storage.setDataPath(os.homedir());
		storage.set('coins',["BTC","ETH","XRP","BCH","LTC","XMR","NEO","DASH"])
		ipcR.send('reload',1)
    }
});

let currencies = JSON.parse(fs.readFileSync(dpath, 'utf8'));

ipcR.on('fiat',function(event,val){
	fiat = val;
	body_str="";
	for ([i,j] of currencies.entries()){
		curr_string = `
		<div class="currency" id="${j}">
		      <div class="price-container">
		        <p class="subtext">Current ${j} in ${fiat}</p>
		        <h1 class="price">Loading...</h1> 
		      </div>
		      <div class="target-container">
		        <p><i class="fas fa-sort-up"></i><span class="targetprice">Choose a target price</span></p>
		      </div>
		      <div class="right">
		        <button class="notificationbtn">Notify me when...</button>
		      </div>
		    </div>
		`
		body_str = `${body_str}${curr_string}`
	}

	document.querySelector('.container').innerHTML = body_str;

	const notifybtn = document.querySelector('.notificationbtn');
	const price = document.querySelectorAll('.price');
	const targetprice = document.querySelector('.targetprice');

	function getCoin(coin,num,curr){
		axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coin}&tsyms=${curr}&api_key=4c12b0c82b29d68c61e16e617ec933c3be17a151d11de819ddc80730097e9593`)
			.then(res => {
				const cryptos = eval(`res.data.${coin}.${curr}`);
				price[num].innerHTML = symbols.get(fiat)+cryptos.toLocaleString('en')
				yy=targets.get(coin);
				if (price[num].innerHTML != '' && yy < cryptos && yy != null){
					const myNotif = new Notification(notification[num].title,notification[num])
				}
				else{
				}
			})
	}

	for ([i,j] of currencies.entries()){
		notification[i] = {
			appName: "crypto-note",
			title: `${j} Alert`,
			body: `${j} just beat your target price`,
			icon: path.join(__dirname,'../assets/img/crypto-note.png')
		}
		getCoin(j,i,fiat)
		setInterval(getCoin, 30000, j, i, fiat)
	}

	for (i of document.querySelectorAll('.notificationbtn')){
		i.addEventListener('click',function(){cname = this.parentElement.parentElement.id})
		i.addEventListener('click',function(){
			const modalPath = path.join('file://',__dirname,'add.html');
			let win = new BrowserWindow({frame: false, resizable: false, transparent: true, alwaysOnTop: true, width: 400, height: 200});
			win.on('close',function(){
				win = null;
			})
			win.loadURL(modalPath);
		  	//win.webContents.openDevTools()
		  	win.webContents.on('did-finish-load', ()=>{
				win.webContents.send('curr-name',cname)
				win.webContents.send('f-name',fiat)
			})
			win.show();

		});

	}

	ipcR.on('target',function(event,val){
		[target,name] = val;
		targets.set(name,target);
		target = Number(target);
		target = symbols.get(fiat)+target.toLocaleString('en');
		document.querySelector(`#${name} .targetprice`).innerHTML = target;
	})

	ipcR.on('clear',function(event,argument) {
		targets = new Map();		
	})
});
