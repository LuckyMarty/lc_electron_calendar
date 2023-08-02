import { BrowserWindow, ipcMain } from "electron"
import * as path from "path";
import { eventAdd, eventGetAll, eventGetById } from "../model/EventModel"
import { IEvent } from "../../interface/eventInterface";
import { windowEventAdd } from "../window/addEventWindow";
import { windowEventView } from "../window/viewEventWindow";

export default (parent: BrowserWindow) => {
    // ************************
    // DATA
    // ************************
    // Get all data
    ipcMain.handle('bdd-event-get-all', async (e) => {
        return await eventGetAll()
    });

    // Get all data by Id
    ipcMain.handle('bdd-event-get-by-id', async (e, id: Number) => {
        return await eventGetById(id)
    });

    // Add data
    ipcMain.handle('bdd-event-add', async (e, params: IEvent) => {
        return await eventAdd(params)
    });

    // ************************
    // WINDOWS
    // ************************
    // Add Event
    ipcMain.handle('add-event', () => {
        windowEventAdd(parent);
    })
    
    // View Event
    ipcMain.on('view-event', (event, eventId) => {
        windowEventView(parent, eventId);
    })
}