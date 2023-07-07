import { BrowserWindow, ipcMain } from "electron"
import * as path from "path";
import { eventAdd, eventGetAll } from "../model/EventModel"
import { IEvent } from "../../interface/eventInterface";

export default () => {
    ipcMain.handle('bdd-event-get-all', async (e) => {
        return await eventGetAll()
    });

    ipcMain.handle('bdd-event-add', async (e, params: IEvent) => {
        return await eventAdd(params)
    });
}