const { app, BrowserWindow, Menu } = require('electron')
const shell = require('electron').shell
const path = require('path');
const ipc = require('electron').ipcMain
const remote = require('electron').remote
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let templates
app.setAppUserModelId(process.execPath)

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  win.loadFile('src/index.html')

  // Open the DevTools.
win.webContents.on('did-finish-load', ()=>{
  win.webContents.send('fiat','USD')
});
//win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  const handleClick = (menuItem, browserWindow, event) => {win.webContents.send('fiat',menuItem.label)}
  templates = [
      {
        label:'Menu',
        submenu: [
          {
            label: 'Add New Cryptocurrency',
            click (){
              openNewWindow();
            }
          },
          {
            label: 'Change output currency',
            submenu: [
              {
                type: 'radio',
                label: 'USD',
                checked: true,
                click: handleClick,
              },
              {
                type: 'radio',
                label: 'EUR',
                click: handleClick,
              },
              {
                type: 'radio',
                label: 'JPY',
                click: handleClick,
              },
              {
                type: 'radio',
                label: 'INR',
                click: handleClick,
              },
              {
                type: 'radio',
                label: 'BTC',
                click: handleClick,
              }
            ]
          },
          {
            label: 'Clear all alerts',
            click(){
              win.reload()
            }
          },
          {
            type: 'separator',
          },
          {
            label: 'CoinMarketCap',
            click(){
              shell.openExternal('https://coinmarketcap.com');
            }
          },
          {
            type: 'separator',
          },
          {
            label: 'Exit',
            click(){
              app.quit();
            }
          },
        ]
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'v1.0.0',
            enabled: false
          },
          {
            type: 'separator',
          },
          {
            label: 'Issues',
            submenu: [
              {
                label: 'Turning on Windows Notifications',
                click(){
                  openHelpWindow()
                }
              }
            ]
          }
        ]
      }
    ]


  var menu = Menu.buildFromTemplate(templates)
  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipc.on('value', (event, val) => {win.webContents.send('target',val)});
ipc.on('reload', (event, val) => {win.reload()});



var newWindow = null

function openNewWindow() {
  if (newWindow) {
    newWindow.focus()
    return
  }

  newWindow = new BrowserWindow({frame: false, resizable: false, transparent: true, alwaysOnTop: true, width: 400, height: 200})
  const modalPath = path.join('file://',__dirname,'src','new.html');
  newWindow.loadURL(modalPath)

  newWindow.on('closed', function() {
    newWindow = null
  })
  //newWindow.webContents.openDevTools()
  newWindow.show();
}

var helpWindow = null
function openHelpWindow() {
  if (helpWindow) {
    helpWindow.focus()
    return
  }

  helpWindow = new BrowserWindow({frame: false, resizable: false, transparent: true, alwaysOnTop: true, width: 400, height: 200})
  const modalPath = path.join('file://',__dirname,'src','help.html');
  helpWindow.loadURL(modalPath)

  helpWindow.on('closed', function() {
    helpWindow = null
  })
  helpWindow.webContents.openDevTools()
  helpWindow.show();
}



