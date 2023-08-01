const { ipcRenderer } = require('electron');

export function displayEvent(id: number, title: string, content: string): HTMLDivElement {
    // Events
    const event = document.createElement('div');
    const eventTitle = document.createElement('div');
    const eventTimes = document.createElement('div');
    // → Event Container
    event.id = `id-${id.toString()}`;
    event.className = "event";
    event.onclick = () => viewEvent(id);
    // → Event Title
    eventTitle.className = "event-title";
    eventTitle.innerText = title;
    // → Event Hour
    eventTimes.className = "event-hour";
    eventTimes.innerHTML = content;
    event.append(eventTitle, eventTimes)

    return event;
}


// Pass Event Id to ViewEventWindow
function viewEvent(eventId: Number) {
    ipcRenderer.send('view-event', eventId);
}


export function dateCheck(from: string, to: string, check: string): boolean {
    let fDate, lDate, cDate;
    fDate = Date.parse(from);
    lDate = Date.parse(to);
    cDate = Date.parse(check);

    if ((cDate <= lDate && cDate >= fDate)) {
        return true;
    }
    return false;
}

export function sameDate(from: string, to: string): boolean {
    let fDate, lDate;
    fDate = Date.parse(from);
    lDate = Date.parse(to);

    if ((fDate == lDate)) {
        return true;
    }
    return false;
}

export function getDateToString(date: Date) {
    return date.toLocaleDateString('fr-FR');
}

export function getTimeToString(date: Date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}