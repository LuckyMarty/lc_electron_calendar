import { IEvent } from "../../interface/eventInterface.js";

const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.on('event-id', async (event: any, id: Number) => {
        console.log(id);
        const result = await ipcRenderer.invoke('bdd-event-get-by-id', id);
        console.log(result[0]);
        const data: IEvent = result[0];

        setStringValue('#add_event_date', rangeDate(data.date_deb, data.date_fin))
        setStringValue('#add_event_title', data.titre)
        setStringValue('#add_event_location', data.location)
        setStringValue('#add_event_category', data.categorie)
        setStringValue('#add_event_status', data.statut)
        setStringValue('#add_event_description', data.description)
        setStringValue('#add_event_transparence', data.transparence)
    });
})

editable(false);


// Handle Edit
document.querySelector("#edit")?.addEventListener('click', () => {
    let proceed = confirm("Are you sure you want to edit?");
    if (proceed) {
        editable(true);
    } else {
        editable(false);
    }
})


// Handle Delete
document.querySelector("#delete")?.addEventListener('click', () => {
    let proceed = confirm("Are you sure you want to delete?");
    if (proceed) {
        editable(true);
    } else {
        editable(false);
    }
})




// ************************
// FUNCTIONS
// ************************
function editable(status: boolean) {
    if (!status) {
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

function setStringValue(element: string, content: string) {
    (document.querySelector(element) as HTMLInputElement).value = content;
}

function rangeDate(from: Date, to: Date): string {
    return `${formatDateToFR(from)} ${formatTime12to24(from)} - ${formatDateToFR(to)} ${formatTime12to24(to)}`
}

function formatTime12to24(time: Date): string {
    return `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
}

function formatDateToFR(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}