const {app, BrowserWindow, Menu, ipcMain, Notification } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');
const url = require("url");

let mainWindow;
let windowAlert;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600, 
    height: 400,   
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
  }});
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
    require("electron-reload")(__dirname, {
      electron: path.join(__dirname, "../node_modules", ".bin", "electron")
    })
  }
  const mainMenu =  Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.on('closed', () => mainWindow = null);
}

//example to display notification
ipcMain.on('notify', (_, message) => {
  console.log("-----MESSAGE IPC-------", message);
  new Notification({title: 'Notification', body: message}).show();
})

const templateMenu = [
  {
    label: "File",
    submenu: [{
      label: "Alert",
      accelerator: "Ctrl+N",
      click() {
        windowAlertFunction();
      }

    }]
  }
]
const windowAlertFunction = () => {
  console.log("----------ALERTA-------------");
  windowAlert = new BrowserWindow({
    width: 300,
    height: 250,
    title: "Alerta Medica",
    //frame:false
    parent: mainWindow, modal: true,show:false
  });
  windowAlert.setMenu(null);
  windowAlert.loadURL(url.format({
    pathname: path.join(__dirname, "../src/pages/alert.html"),
    protocol: "file",
    slashes: true
  }));
  windowAlert.once('ready-to-show', () => {   windowAlert.show() })
  new Notification({title: 'Notification', body: "Hola mundo 2"}).show();
} 

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});