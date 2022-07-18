const { app, BrowserWindow, globalShortcut } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
//testing
console.log("Inside main.js file to check if it hit.");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false
    });
    const startURL = isDev ? 'https://localhost:3000' : `file://${path.join(__dirname, './public/index.html')}`;

    //testing
    console.log(startURL);
    mainWindow.loadURL(startURL);

    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    globalShortcut.register('f5', function () {
        mainWindow.reload();
    })
    globalShortcut.register('CommandOrControl+R', function () {
        mainWindow.reload()
    })
}
app.on('ready', createWindow);