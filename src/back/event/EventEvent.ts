import { BrowserWindow, dialog, ipcMain } from "electron"
import { eventAdd, eventDelete, eventGetAll, eventGetById, eventUpdate } from "../model/EventModel"
import { IEvent } from "../../interface/eventInterface";
import { windowAddEvent } from "../window/windowAddEvent";
import { windowViewEditDeleteEvent } from "../window/windowViewEditDeleteEvent";
const fs = require('fs');


export default (parent: BrowserWindow) => {
    // ************************
    // DATA
    // ************************
    // Get all data
    ipcMain.handle('bdd-event-get-all', async (e) => {
        return await eventGetAll()
    });

    // Get data by Id
    ipcMain.handle('bdd-event-get-by-id', async (e, id: Number) => {
        return await eventGetById(id)
    });

    // Add data
    ipcMain.handle('bdd-event-add', async (e, params: IEvent) => {
        return await eventAdd(params)
    });

    // Update data
    ipcMain.handle('bdd-event-update', async (e, params: IEvent) => {
        return await eventUpdate(params)
    });

    // Delete data
    ipcMain.handle('bdd-event-delete', async (e, id: number) => {
        return await eventDelete(id)
    });

    // Export as iCalendar
    ipcMain.on('export-file', async (event, fileData) => {
        const saveResult = await dialog.showSaveDialog(parent, {
            title: 'Export File',
            defaultPath: 'Lucky-Marty_Electron-Calendar.ics',
            filters: [{ name: 'Text Files', extensions: ['ics'] }]
        });

        if (!saveResult.canceled) {
            const filePath = saveResult.filePath;

            // Write the file to the specified location
            fs.writeFile(filePath, fileData, 'utf8', (err: any) => {
                if (err) {
                    console.error('Error saving the file:', err);
                    // Notify the renderer process about the failure
                    event.reply('export-file-response', { success: false, error: err });
                } else {
                    console.log('File saved successfully.');
                    // Notify the renderer process about the success
                    event.reply('export-file-response', { success: true });
                }
            });
        }
    });

    // ************************
    // WINDOWS
    // ************************
    // Add Event Window
    ipcMain.handle('window-add-event', () => {
        windowAddEvent(parent);
    })

    // View Event Window
    ipcMain.on('window-view-edit-delete-event', (event, eventId) => {
        windowViewEditDeleteEvent(parent, eventId);
    })


    // ************************
    // ACTIONS
    // ************************
    // Close Current Window (for every child)
    ipcMain.on('close-current-window', (event) => {
        const currentWindow = BrowserWindow.fromWebContents(event.sender);
        if (currentWindow) {
            currentWindow.close();
        }
    });

    // Refresh Main Window
    ipcMain.on('refresh-main-window', () => {
        parent.reload();
    });
}