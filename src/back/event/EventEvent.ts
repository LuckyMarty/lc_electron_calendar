import { BrowserWindow, ipcMain } from "electron"
import * as path from "path";
import { eventAdd, eventGetAll } from "../model/EventModel"
import { IEvent } from "../../interface/eventInterface";
import { windowEventAdd } from "../window/event";

export default (parent: BrowserWindow) => {
    // ************************
    // DATA
    // ************************
    // Get all data
    ipcMain.handle('bdd-event-get-all', async (e) => {
        return await eventGetAll()
    });

    // Add data
    ipcMain.handle('bdd-event-add', async (e, params: IEvent) => {
        return await eventAdd(params)
    });

    // ************************
    // WINDOWS
    // ************************
    // Add Event
    ipcMain.handle('open', () => {
        windowEventAdd(parent);
    })
}