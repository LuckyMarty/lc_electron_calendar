// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.


const { ipcRenderer } = require('electron');
import calendar from "../calendar.js";


// Display Calendar
calendar();


// Add Event Button
const addEventButton = document?.querySelector("#calendar-addEvent");
addEventButton?.addEventListener('click', () => {
    ipcRenderer.invoke('add-event');
})