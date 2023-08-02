import { BrowserWindow } from "electron"
import * as path from "path";


// ************************
// ADD EVENT WINDOW
// ************************
export function windowEventView(parent: BrowserWindow, eventId: Number) {
    // Create window
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
        },
    })

    // Hide Menu Bar
    window.setMenuBarVisibility(false)

    // Load content
    window.loadFile('./pages/event/view.html')

    // Pass Event Id to ViewEventWindow
    window.webContents.send('event-id', eventId);

    // Open the DevTools.
    window.webContents.openDevTools();
}