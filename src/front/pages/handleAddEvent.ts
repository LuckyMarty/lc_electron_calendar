const { ipcRenderer } = require('electron');
import { IEvent } from "../../interface/eventInterface";
import { emptyValue, getValueAsString, splitDate } from "../utils/utils.js";
import { closeCurrentWindow, eventAdd, refreshMainWindow } from "../utils/utils_ipc.js";


// ************************
// ADD EVENT FORM
// ************************
const addEventForm = document.querySelector('#addEventForm');
if (addEventForm) {
    addEventForm.addEventListener('submit', (e: Event) => {
        // Get Inputs
        const dates = getValueAsString("#add_event_date");
        const titre = getValueAsString("#add_event_title");
        const location = getValueAsString("#add_event_location");
        const categorie = getValueAsString("#add_event_category");
        const statut = getValueAsString("#add_event_status");
        const description = getValueAsString("#add_event_description");
        const transparence = getValueAsString("#add_event_transparence");

        // Avoid reload
        e.preventDefault();

        // Prepare Data
        const newEvent: IEvent = {
            date_deb: splitDate(dates)[0],
            date_fin: splitDate(dates)[1],
            titre,
            location,
            categorie,
            statut,
            description,
            transparence,
            nbOfUpdate: 0
        }


        // Send Data
        eventAdd(newEvent);

        emptyValue('#add_event_date');
        emptyValue("#add_event_title");
        emptyValue("#add_event_location");
        emptyValue("#add_event_category");
        emptyValue("#add_event_status");
        emptyValue("#add_event_description");
        emptyValue("#add_event_transparence");

        refreshMainWindow();
        closeCurrentWindow();
    })
}