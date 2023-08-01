const { ipcRenderer } = require('electron');
import { IEvent } from "../../interface/eventInterface";
import { getValueAsDate, getValueAsString } from "../utils.js";


// ************************
// ADD EVENT FORM
// ************************
const addEventForm = document.querySelector('#addEventForm');
if (addEventForm) {
    addEventForm.addEventListener('submit', (e: Event) => {
        // Get Inputs
        const date_deb = getValueAsDate("#add_event_date_from");
        const date_end = getValueAsDate("#add_event_date_to");
        const titre = getValueAsString("#add_event_title");
        const location = getValueAsString("#add_event_location");
        const category = getValueAsString("#add_event_category");
        const status = getValueAsString("#add_event_status");
        const description = getValueAsString("#add_event_description");
        const transparence = getValueAsString("#add_event_transparence");

        // Avoid reload
        e.preventDefault();

        // Prepare Data
        const newEvent: IEvent = {
            date_deb,
            date_end,
            titre,
            location,
            category,
            status,
            description,
            transparence,
            nbOfUpdate: 0
        }

        // Send Data
        eventAdd(newEvent);
    })

    async function eventAdd(newEvent: IEvent) {
        await ipcRenderer.invoke('bdd-event-add', newEvent)
    }
}