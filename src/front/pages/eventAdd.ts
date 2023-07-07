const { ipcRenderer } = require('electron');
import { IEvent } from "../../interface/eventInterface";
import { getValueAsDate, getValueAsString } from "../utils.js";

const addEventForm = document.querySelector('#addEventForm');
if (addEventForm) {
    const date_start = getValueAsDate("#add_event_date_from");
    const date_end = getValueAsDate("#add_event_date_to");
    const title = getValueAsString("#add_event_title");
    const location = getValueAsString("#add_event_location");
    const category = getValueAsString("#add_event_category");
    const status = getValueAsString("#add_event_status");
    const description = getValueAsString("#add_event_description");
    const transparence = getValueAsString("#add_event_transparence");

    addEventForm.addEventListener('submit', (e: Event) => {
        e.preventDefault()
        const newEvent: IEvent = {
            date_start,
            date_end,
            title,
            location,
            category,
            status,
            description,
            transparence,
            nbOfUpdate: 0
        }
        console.log('here', newEvent);
        
        eventAdd(newEvent);
    })

    async function eventAdd(newEvent: IEvent) {
        await ipcRenderer.invoke('bdd-event-add', newEvent)
    }
}