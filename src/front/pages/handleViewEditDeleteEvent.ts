const { ipcRenderer } = require('electron');
import { IEvent } from "../../interface/eventInterface.js";
import { getValueAsString, rangeDate, setStringValue, splitDate } from "../utils/utils.js";
import { closeCurrentWindow, refreshMainWindow } from "../utils/utils_ipc.js";


document.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.on('event-id', async (event: any, id: number) => {
        // Get Data By Id
        const result = await ipcRenderer.invoke('bdd-event-get-by-id', id);
        const data: IEvent = result[0];

        // Change Document & H1 Title
        document.title = data.titre;
        if (document.querySelector('h1')) (document.querySelector('h1') as HTMLHeadElement).innerText = data.titre;

        // Display Data in their Input
        setStringValue('#add_event_date', rangeDate(data.date_deb, data.date_fin))
        setStringValue('#add_event_title', data.titre)
        setStringValue('#add_event_location', data.location)
        setStringValue('#add_event_category', data.categorie)
        setStringValue('#add_event_status', data.statut)
        setStringValue('#add_event_description', data.description)
        setStringValue('#add_event_transparence', data.transparence)

        // Update Form Submit
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
                const updateEvent: IEvent = {
                    id,
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
                eventUpdate(updateEvent);

                // Make the Form Read Only
                editable(false);

                // Refresh Main Window
                refreshMainWindow();
            })
        }

        // Make the Form Read Only
        editable(false);

        // Handle Edit
        document.querySelector("#edit")?.addEventListener('click', (e) => {
            editable(true);
        })

        // Handle Cancel
        document.querySelector(".cancel")?.addEventListener('click', (e) => {
            location.reload();
        })

        // Handle Delete
        document.querySelector("#delete")?.addEventListener('click', () => {
            let proceed = confirm("Are you sure you want to delete?");
            if (proceed) {
                eventDelete(id);
                refreshMainWindow();
                closeCurrentWindow();
            }
        })
    });
})


// ************************
// FUNCTIONS
// ************************
// Make the form editable
function editable(status: boolean) {
    if (!status) {
        // Change the icon color
        (document.querySelector("#edit svg g") as HTMLElement).style.fill = "black";

        // Remove Date Range Picker
        document.querySelector(".daterangepicker")?.remove();

        // Add class
        let form = document.querySelector("#addEventForm");
        let classUneditable = "viewEvent";
        // Add the class only if it doesn't exist
        if (form && !form.classList.contains(classUneditable)) {
            form.classList.add(classUneditable);
        }

        // Make every input read only
        document.querySelectorAll('input').forEach(input => {
            if (input.name === 'add_event_date') input.name = 'add_event_date_readonly';
            input.readOnly = true;
        })
        document.querySelectorAll('textarea').forEach(input => {
            input.readOnly = true;
        })
    } else {
        // Change the icon color
        (document.querySelector("#edit svg g") as HTMLElement).style.fill = "green";

        // Remove Class
        document.querySelector("#addEventForm")?.classList.remove('viewEvent');

        // Make every input editable
        document.querySelectorAll('input').forEach(input => {
            if (input.name === 'add_event_date_readonly') input.name = 'add_event_date';
            input.readOnly = false;
        })
        document.querySelectorAll('textarea').forEach(input => {
            input.readOnly = false;
        })
    }
}

// Update Data Base
async function eventUpdate(updateEvent: IEvent) {
    await ipcRenderer.invoke('bdd-event-update', updateEvent)
}

// Delete Data Base
async function eventDelete(id: number) {
    await ipcRenderer.invoke('bdd-event-delete', id)
}