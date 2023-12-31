import { BrowserWindow } from "electron"
import * as path from "path";
import { DevTools } from "../utils";


// ************************
// ADD EVENT WINDOW
// ************************
export function windowAddEvent(parent: BrowserWindow) {
    // Create window
    const window = new BrowserWindow({
        modal: true,
        parent,
        width: 800,
        height: 900,
        title: "Add New Event",

        icon: path.join(__dirname, "../../../src/assets/img/icon.png"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })

    // Hide Menu Bar
    window.setMenuBarVisibility(false)

    // Load content
    window.loadFile('./pages/event/displayAddEvent.html')

    // Open the DevTools.
    if (DevTools) window.webContents.openDevTools();
}