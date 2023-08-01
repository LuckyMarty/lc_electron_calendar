import { BrowserWindow } from "electron"
import * as path from "path";

export function windowEventAdd(parent: BrowserWindow) {
    const window = new BrowserWindow({
        modal: true,
        parent,
        width: 800,
        height: 600,
        title: "Add New Event",

        icon: path.join(__dirname, "../../../src/assets/img/icon.png"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            // preload: path.join(__dirname, "../front/preload.js"),
        },
    })

    window.setMenuBarVisibility(false)

    // and load the index.html of the app.
    window.loadFile('./pages/event/add.html')
    // mainWindow.loadURL('https://github.com')


    // Open the DevTools.
    window.webContents.openDevTools()
}