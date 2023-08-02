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

editable(true);


function editable(status: boolean) {
    if (status) {
        let form = document.querySelector("#addEventForm");
        let classUneditable = "viewEvent";
        // Add the class only if it doesn't exist
        if (form && !form.classList.contains(classUneditable)) {
            form.classList.add(classUneditable);
        }

        document.querySelectorAll('input').forEach(input => {
            if (input.name === 'add_event_date') input.name = 'add_event_date_readonly';
            input.readOnly = true;
        })
    } else {
        document.querySelector("#addEventForm")?.classList.remove();
        document.querySelectorAll('input').forEach(input => {
            if (input.name === 'add_event_date_readonly') input.name = 'add_event_date';
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



// let data = await eventData(eventId);
// if (data) {
//     console.log(data);

//     setStringValue('#add_event_title', data.titre);
// } else console.log("no data");



// async function eventData(id: Number) {
//     const result = await ipcRenderer.invoke('bdd-event-get-by-id', id);
//     return result ? result : false;
// }