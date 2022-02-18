import { app, BrowserWindow } from 'electron';
import path from 'path';

const isDev = !app.isPackaged;
const webUrl = isDev
  ? 'http://localhost:11011'
  : 'https://nightly.paw.msgbyte.com';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 640,
    width: 960,
    minHeight: 640,
    minWidth: 960,
    center: true,
    icon: path.resolve(__dirname, '../assets/logo@192.png'),
    webPreferences: {
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainWindow.loadURL(webUrl);

  if (isDev) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
