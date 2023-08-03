import { IEvent } from "../../interface/eventInterface";
const { ipcRenderer } = require('electron');

// Run Export
exportFile();

// Export File
async function exportFile() {
    const result = await ipcRenderer.invoke('bdd-event-get-all') as IEvent[];
    ipcRenderer.send('export-file', generateICalContent(result));
}

// Generate iCalendar content
function generateICalContent(events: Array<IEvent>) {
    let icsContent = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\n`;

    events.forEach(event => {
        icsContent += `BEGIN:VEVENT\r\n`;
        icsContent += `UID:${Math.random().toString(36).substring(2, 15)}\r\n`;
        icsContent += `DTSTAMP:${new Date().toISOString().replace(/[-:.]/g, '').split('T').join('').split('Z').join('')}Z\r\n`;
        icsContent += `DTSTART:${formatDate(event.date_deb)}\r\n`;
        icsContent += `DTEND:${formatDate(event.date_fin)}\r\n`;
        icsContent += `SUMMARY:${event.titre}\r\n`;
        icsContent += `DESCRIPTION:${event.description}\r\n`;
        icsContent += `LOCATION:${event.location}\r\n`;
        icsContent += `END:VEVENT\r\n`;
    })

    icsContent += `END:VCALENDAR\r\n`;

    return icsContent;
}

// Format date in iCalendar format (yyyyMMddTHHmmssZ)
function formatDate(date: Date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}