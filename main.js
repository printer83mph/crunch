const electron = require("electron");
const {app,BrowserWindow} = electron;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  mainWindow.loadURL("file://" + __dirname + "/index.html#projects");
  mainWindow.setMenu(null);
  // mainWindow.toggleDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow;
  }
});
