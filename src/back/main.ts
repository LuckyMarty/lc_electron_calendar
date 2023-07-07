import { app, BrowserWindow, Menu } from "electron";
import * as path from "path";
import EventEvent from "./event/EventEvent";
import { windowEventAdd } from "./window/event";

EventEvent();




const menuTpl: any = [
  {
    label: "Event",
    type: "submenu",
    submenu: [
      {
        label: 'Add',
        type: 'normal',
        click: () => {
          console.log('click sur menu');
          windowEventAdd();
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Exit',
        type: 'normal',
        role: 'quit'
      }
    ]
  }
]
const menu = Menu.buildFromTemplate(menuTpl)


Menu.setApplicationMenu(menu)


function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    icon: path.join(__dirname, "../../src/assets/img/icon.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "../front/preload.js"),
    },
  });

  mainWindow.maximize()

  // and load the index.html of the app.
  mainWindow.loadFile(path.join("./pages/index.html"));


  mainWindow.setMenu(menu)


  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
