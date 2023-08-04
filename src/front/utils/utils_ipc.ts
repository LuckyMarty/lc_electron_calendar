import { IEvent } from "../../interface/eventInterface";
const { ipcRenderer } = require('electron');


// ------------------------
// ACTIONS
// ------------------------
export const getAllEvents = async () => {
    return await ipcRenderer.invoke('bdd-event-get-all') as IEvent[];
}

export const eventAdd = async (newEvent: IEvent) => {
    await ipcRenderer.invoke('bdd-event-add', newEvent)
}

export const eventUpdate = async (updateEvent: IEvent) => {
    await ipcRenderer.invoke('bdd-event-update', updateEvent)
}

export const eventDelete = async (id: number) => {
    await ipcRenderer.invoke('bdd-event-delete', id)
}

export const sendEventIdToViewEditDeleteWindow = (eventId: Number) => {
    ipcRenderer.send('window-view-edit-delete-event', eventId);
}


// ------------------------
// WINDOWS
// ------------------------
export const openWindowAddEvent = () => {
    ipcRenderer.invoke('window-add-event');
}

export const closeCurrentWindow = () => {
    ipcRenderer.send('close-current-window');
}

export const refreshMainWindow = () => {
    ipcRenderer.send('refresh-main-window');
}