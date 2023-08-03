import { BrowserWindow } from "electron"
import * as path from "path";
import { DevTools } from "../utils";


// ************************
// VIEW / EDIT / DELETE EVENT WINDOW
// ************************
export function windowViewEditDeleteEvent(parent: BrowserWindow, eventId: Number) {
    let window: BrowserWindow | null;
    // Create window
    window = new BrowserWindow({
        modal: true,
        parent,
        width: 800,
        height: 900,
        title: "Event",

        icon: path.join(__dirname, "../../../src/assets/img/icon.png"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })

    // Hide Menu Bar
    window.setMenuBarVisibility(false)

    // Load content
    window.loadFile('./pages/event/displayViewEditDeleteEvent.html');

    // Pass Event Id to ViewEventWindow
    window.webContents.on('did-finish-load', () => {
        window?.webContents.send('event-id', eventId);
    });

    // Open the DevTools.
    if (DevTools) window.webContents.openDevTools();
}