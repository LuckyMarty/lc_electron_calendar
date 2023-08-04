const { ipcRenderer } = require('electron');
import { IEvent } from "../../interface/eventInterface";
import { parseICS, translateIcalDate } from "../utils.js";


// Save Upload File Data
let file: any;

// On Click, launch import
document.querySelector('#importButton')?.addEventListener('click', () => {
    importICS(file)
})

// Drag & Drop Zone
const dropZone = document.querySelector(".drag-drop-zone");
if (dropZone) {
    dropZone.addEventListener("dragover", (event) => dragOver(event));
    dropZone.addEventListener("dragenter", (event) => dragEnter(event));
    dropZone.addEventListener("dragleave", (event) => dragLeave(event));
    dropZone.addEventListener("drop", (event) => file = drop(event));
}

// Upload Button
const selectFileButton = document.querySelector(".upload-button");
if (selectFileButton) selectFileButton.addEventListener("click", () => openFileUpload())

// File Selected
const fileUpload = document.querySelector("#file-upload");
if (fileUpload) fileUpload.addEventListener("change", (event) => file = fileSelected(event))



// ************************
// FUNCTIONS
// ************************
// Import ICS
function importICS(fileUpload: any) {
    if (fileUpload && fileUpload.name) {
        const reader = new FileReader();

        // Check if the file extension is '.ics'
        if (!fileUpload.name.toLowerCase().endsWith('.ics')) return alert('Please choose a correct format file');

        reader.readAsText(fileUpload);
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

// ------------------------
// ACTIONS
// ------------------------
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


// ------------------------
// DRAG & DROP ZONE
// ------------------------
function dragOver(event: any) {
    event.preventDefault();
}

function dragEnter(event: any) {
    event.preventDefault();
    event.target.classList.add('drag-over');

    let dropText = document.getElementById('drop-text');
    if (dropText) dropText.textContent = 'Drop here';
}

function dragLeave(event: any) {
    event.preventDefault();
    event.target.classList.remove('drag-over');

    let dropText = document.getElementById('drop-text');
    if (dropText) dropText.textContent = 'Drag & Drop iCal files here or';
}

function drop(event: any) {
    let file = event.dataTransfer.files[0]; // Get the first file dropped
    
    event.preventDefault();
    event.target.classList.remove('drag-over');
    
    let dropText = document.getElementById('drop-text');
    if (dropText) dropText.textContent = 'Drag & Drop iCal files here or';
    
    
    // Check if it's .ics
    if (handleFile(file)) {
        return file;
    } else return null;
}

function handleFile(file: HTMLInputElement) {
    const fileNameElement = document.getElementById('file-name');
    const importButton = document.querySelector('#importButton') as HTMLElement;


    if (fileNameElement && importButton) {
        // Check if the file extension is '.ics'
        if (file.name.toLowerCase().endsWith('.ics')) {
            // Display File Name
            fileNameElement.textContent = 'iCalendar File: ' + file.name;

            // Display Import Button
            importButton.style.display = "block";

            // File is .ics
            return true;
        } else {
            // Display Incorrect extenssion
            fileNameElement.textContent = 'Invalid File Format: ' + file.name;

            // Undisplay Import Button
            importButton.style.display = "none";

            // File is not .ics
            return false;
        }
    }
}


// ------------------------
// UPLOAD BUTTON
// ------------------------
function openFileUpload() {
    document.getElementById('file-upload')?.click();
}

function fileSelected(event: any) {
    let file = event.target.files[0];

    // Check if it's .ics
    if (handleFile(file)) {
        return file;
    } else return null;
}