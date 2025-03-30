const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  // Set window title to "fukuro"
  win.setTitle("fukuro");
  // Load the static site (built into "public/index.html")
  win.loadFile(path.join(__dirname, 'public/index.html'));
}

app.whenReady().then(createWindow);
