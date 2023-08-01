import { BrowserWindow, ipcMain } from "electron"
import * as path from "path";
import { eventAdd, eventGetAll } from "../model/EventModel"
import { IEvent } from "../../interface/eventInterface";
import { windowEventAdd } from "../window/event";

export default (parent: BrowserWindow) => {
    ipcMain.handle('bdd-event-get-all', async (e) => {
        return await eventGetAll()
    });

    ipcMain.handle('bdd-event-add', async (e, params: IEvent) => {
        return await eventAdd(params)
    });

    ipcMain.handle('open', () => {
        // const window = new BrowserWindow({
        //     width: 800,
        //     height: 600,
        //     title: "Add event",
        //     icon: path.join(__dirname, "../../../src/assets/img/icon.png"),
        // })

        // // and load the index.html of the app.
        // window.loadFile('./pages/event/add.html');
        // window.setMenuBarVisibility(false);
        // window.webContents.openDevTools();

        windowEventAdd(parent);
    })
}