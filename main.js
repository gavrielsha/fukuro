const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

// Function to run the build script
function runBuildScript() {
  return new Promise((resolve, reject) => {
    console.log('Building RSS feeds...');
    const buildProcess = spawn('npm', ['run', 'build'], {
      stdio: 'inherit'
    });

    buildProcess.on('close', (code) => {
      if (code === 0) {
        console.log('Build completed successfully');
        resolve();
      } else {
        console.error(`Build process exited with code ${code}`);
        reject(new Error(`Build failed with code ${code}`));
      }
    });
  });
}

// Check if output/index.html exists, if not run the build
async function ensureOutputExists() {
  const indexPath = path.join(__dirname, 'output', 'index.html');
  if (!fs.existsSync(indexPath)) {
    await runBuildScript();
  }
}

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
  
  // Load the static site (built into "output/index.html")
  win.loadFile(path.join(__dirname, 'output/index.html'));
  
  // Open external links in the default browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
  
  // Add menu with refresh option
  const { Menu } = require('electron');
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Refresh Feeds',
          accelerator: 'CmdOrCtrl+R',
          click: async () => {
            try {
              await runBuildScript();
              win.reload();
            } catch (error) {
              console.error('Failed to refresh feeds:', error);
            }
          }
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    }
  ]);
  
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(async () => {
  await ensureOutputExists();
  createWindow();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
