const { ipcRenderer } = require('electron');
import { IEvent } from "../../interface/eventInterface";
import { parseICS, translateIcalDate } from "../utils.js";


// On Click, launch import
document.querySelector('#importButton')?.addEventListener('click', () => {
    importICS();
})

function importICS() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.readAsText(fileInput.files[0]);
        reader.onload = () => {
            const fileContent = reader.result as string;            

            // Parse the ICS file content
            const parsedData = parseICS(fileContent);

            parsedData.forEach(event => {
                // Prepare Data
                const newEvent: IEvent = {
                    date_deb: translateIcalDate(event.start),
                    date_fin: event.end ? translateIcalDate(event.end) : translateIcalDate(event.start),
                    titre: event.summary,
                    location: "",
                    categorie: "",
                    statut: "1",
                    description: event.description,
                    transparence: "",
                    nbOfUpdate: 0
                }

                eventAdd(newEvent);
                refreshMainWindow();
            })

            alert('Successful import');
            closeCurrentWindow();

        };
    } else alert('Please choose a correct format file');

}


// ************************
// FUNCTIONS
// ************************
// Add Event
async function eventAdd(newEvent: IEvent) {
    await ipcRenderer.invoke('bdd-event-add', newEvent)
}

// Close Current Window
function closeCurrentWindow() {
    ipcRenderer.send('close-current-window');
}

// Refresh Main Window
function refreshMainWindow() {
    ipcRenderer.send('refresh-main-window');
}