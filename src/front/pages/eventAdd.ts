const { ipcRenderer } = require('electron');
import { IEvent } from "../../interface/eventInterface";
import { emptyValue, getValueAsDate, getValueAsString } from "../utils.js";


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
    })

    async function eventAdd(newEvent: IEvent) {
        await ipcRenderer.invoke('bdd-event-add', newEvent)
    }

    function splitDate(dates: string) {
        // 01/08/2023 10:00 - 02/08/2023 06:00
        let splitDate = dates.split('-');

        // From
        let from = splitDate[0].split(" ");
        let fromDate = from[0].split("/");
        let fromDay = fromDate[0];
        let fromMonth = fromDate[1];
        let fromYear = fromDate[2];

        let fromTime = from[1].split(":");
        let fromHour = fromTime[0];
        let fromMinute = fromTime[1];

        // To
        let to = splitDate[1].split(" ");
        let toDate = to[1].split("/");
        let toDay = toDate[0];
        let toMonth = toDate[1];
        let toYear = toDate[2];

        let toTime = to[2].split(":");
        let toHour = toTime[0];
        let toMinute = toTime[1];

        return [
            new Date(parseInt(fromYear), parseInt(fromMonth) - 1, parseInt(fromDay), parseInt(fromHour), parseInt(fromMinute)),
            new Date(parseInt(toYear), parseInt(toMonth) - 1, parseInt(toDay), parseInt(toHour), parseInt(toMinute))
        ]
    }
}