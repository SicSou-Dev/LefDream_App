const { app, BrowserWindow } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
    icon: path.join(__dirname, "icon.png"), // icône custom
    webPreferences: {
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL("https://lefdreamtest.netlify.app");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Vérifier les updates
app.on("ready", () => {
  createWindow();

  autoUpdater.checkForUpdatesAndNotify(); // vérifie & notifie automatiquement
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

// Logs update (optionnel, pour debug)
autoUpdater.on("update-available", () => {
  console.log("Mise à jour disponible !");
});
autoUpdater.on("update-downloaded", () => {
  console.log("Mise à jour téléchargée, prête à installer.");
});
