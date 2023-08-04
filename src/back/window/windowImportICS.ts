import { BrowserWindow } from "electron"
import * as path from "path";
import { DevTools } from "../utils";


// ************************
// IMPORT EVENT WINDOW
// ************************
export function windowImportICS(parent: BrowserWindow) {
    let window: BrowserWindow | null;
    // Create window
    window = new BrowserWindow({
        modal: true,
        parent,
        width: 400,
        height: 300,
        title: "Import ICS",
        // resizable: false,

        icon: path.join(__dirname, "../../../src/assets/img/icon.png"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })

    // Hide Menu Bar
    window.setMenuBarVisibility(false)

    // Load content
    window.loadFile('./pages/event/displayImportICS.html');

    // Open the DevTools.
    if (DevTools) window.webContents.openDevTools();
}