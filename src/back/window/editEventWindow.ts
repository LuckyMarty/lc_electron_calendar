import { BrowserWindow } from "electron"
import * as path from "path";


// ************************
// ADD EVENT WINDOW
// ************************
export function windowEventAdd(parent: BrowserWindow) {
    // Create window
    const window = new BrowserWindow({
        modal: true,
        parent,
        width: 800,
        height: 600,
        title: "Edit Event",

        icon: path.join(__dirname, "../../../src/assets/img/icon.png"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })

    // Hide Menu Bar
    window.setMenuBarVisibility(false)

    // Load content
    window.loadFile('./pages/event/adit.html')

    // Open the DevTools.
    window.webContents.openDevTools()
}