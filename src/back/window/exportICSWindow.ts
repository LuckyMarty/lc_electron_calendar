import { BrowserWindow } from "electron"
import * as path from "path";
import { DevTools } from "../utils";


// ************************
// EXPORT EVENT WINDOW (INVISIBLE !)
// ************************
export function windowExportICS(parent: BrowserWindow) {
    let window: BrowserWindow | null;
    // Create window
    window = new BrowserWindow({
        modal: true,
        parent,
        width: 400,
        height: 300,
        title: "Export ICS",
        show: false,

        icon: path.join(__dirname, "../../../src/assets/img/icon.png"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })

    // Hide Menu Bar
    window.setMenuBarVisibility(false)

    // Load content
    window.loadFile('./pages/event/export.html');

    // Open the DevTools.
    if (DevTools) window.webContents.openDevTools();
}