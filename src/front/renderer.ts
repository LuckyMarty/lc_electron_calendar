// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.


const { ipcRenderer } = require('electron');
import { IEvent } from "../interface/eventInterface";
import calendar from "./calendar.js";
import { getInput, getValueAsDate, getValueAsString } from "./utils.js";


// (async () => {
    calendar();

    const addEventButton = document?.querySelector("#calendar-addEvent");
    addEventButton?.addEventListener('click', () => {
        ipcRenderer.invoke('open');
    })


    const addEventForm = document.querySelector('#addEventForm');
    if (addEventForm) {
        const date_deb = getInput("#add_event_date_from");
        const date_end = getInput("#add_event_date_to");
        const title = getInput("#add_event_title");
        const location = getInput("#add_event_location");
        const category = getInput("#add_event_category");
        const status = getInput("#add_event_status");
        const description = getInput("#add_event_description");
        const transparence = getInput("#add_event_transparence");

        addEventForm.addEventListener('submit', (e: Event) => {
            e.preventDefault()

            const newEvent: IEvent = {
                date_deb: new Date(date_deb.value),
                date_end: new Date(date_end.value),
                titre: title.value,
                location: location.value,
                category: category.value,
                status: status.value,
                description: description.value,
                transparence: transparence.value,
                nbOfUpdate: 0
            }
            console.log('here', newEvent);

            eventAddNew(newEvent);
        })

        async function eventAddNew(newEvent: IEvent) {
            await ipcRenderer.invoke('bdd-event-add', newEvent)
        }
    }
// })()