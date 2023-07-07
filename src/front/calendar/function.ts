export function addEvent(title: string, content: string): HTMLDivElement {
    // Events
    const event = document.createElement('div');
    const eventTitle = document.createElement('div');
    const eventTimes = document.createElement('div');
    // → Event Container
    event.className = "event";
    // → Event Title
    eventTitle.className = "event-title";
    eventTitle.innerText = title;
    // → Event Hour
    eventTimes.className = "event-hour";
    eventTimes.innerText = content;
    event.append(eventTitle, eventTimes)

    return event;
}