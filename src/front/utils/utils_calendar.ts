import { IEvent } from "../../interface/eventInterface";
import { isDateInRange, getDateToString, getTimeToString, isSameDate } from "./utils_date.js";
import { getAllEvents, sendEventIdToViewEditDeleteWindow } from "./utils_ipc.js";

export function dayName(day: number = 1) {
    const dayNames: string[] = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    return { "name": dayNames[day], "length": dayNames.length };
}

export function monthName(month: number): string {
    const monthNames: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    return monthNames[month];
}

export const createNavButton = (id: string, innerHTML: string): HTMLButtonElement => {
    const navButton = document.createElement('button');
    navButton.id = id;
    navButton.innerHTML = innerHTML;
    return navButton;
}

export const createEventCard = (id: number, title: string, content: string): HTMLDivElement => {
    // Events
    const event = document.createElement('div');
    const eventTitle = document.createElement('div');
    const eventTimes = document.createElement('div');
    // → Event Container
    event.id = `id-${id.toString()}`;
    event.className = "event";
    event.onclick = () => sendEventIdToViewEditDeleteWindow(id);
    // → Event Title
    eventTitle.className = "event-title";
    eventTitle.innerText = title;
    // → Event Hour
    eventTimes.className = "event-hour";
    eventTimes.innerHTML = content;
    event.append(eventTitle, eventTimes)

    return event;
}

export async function displayEvents(cell: HTMLElement, currentMonth: number, date: number, currentYear: number) {
    const result = await getAllEvents();
    let events: Array<IEvent> = [];
    if (result) {
        result.forEach(element => {
            if (isDateInRange(new Date(element.date_deb), new Date(element.date_fin), new Date(`${currentMonth + 1}/${date}/${currentYear}`))) {
                events.push(element);
            }
        });
    }

    if (events) {
        events.forEach(event => {
            if (event.id) {
                if (isSameDate(event.date_deb, event.date_fin)) {
                    let from = `${getTimeToString(event.date_deb)}`;
                    let to = `${getTimeToString(event.date_fin)}`;
                    cell.append(createEventCard(event.id, event.titre, `${from} - ${to}`));
                } else {
                    let from = `Du ${getDateToString(event.date_deb)} à ${getTimeToString(event.date_deb)}`;
                    let to = `Au ${getDateToString(event.date_fin)} à ${getTimeToString(event.date_fin)}`;
                    cell.append(createEventCard(event.id, event.titre, `${from} <br> ${to}`));
                }
            }
        });
    }
}