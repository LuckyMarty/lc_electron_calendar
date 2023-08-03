import { IEvent } from "../../interface/eventInterface.js";
import { dateCheck, displayEvent, getDateToString, getTimeToString, sameDate } from "./function.js";
const { ipcRenderer } = require('electron');

export default async function calendar() {
    // Init
    const currentDate: Date = new Date();
    let currentMonth: number = currentDate.getMonth();
    let currentYear: number = currentDate.getFullYear();
    displayCalendar(currentMonth, currentYear);


    async function displayCalendar(month: number, year: number) {
        const calendarContainer: HTMLElement | null = document.getElementById("calendar");
        if (calendarContainer) {
            calendarContainer.innerHTML = '';
            const firstDay: Date = new Date(year, month, 1);
            const daysInMonth: number = new Date(year, month + 1, 0).getDate();
            const startingDay: number = firstDay.getDay();


            // Calendar Title
            const calendarTitle = document.querySelector("#calendar-title");
            calendarTitle ? calendarTitle.textContent = monthName(month) + " " + year.toString() : '';


            // Buttons
            const calendarNavigationButtons = document.querySelector("#calendar-navigation-buttons");
            calendarNavigationButtons && (calendarNavigationButtons.innerHTML = '');
            // → Previous
            const prevButton = document.createElement('button');
            prevButton.id = "previousMonth";
            prevButton.innerHTML = "&#10094;";
            calendarNavigationButtons && calendarNavigationButtons.append(prevButton);
            // → Next
            const nextButton = document.createElement('button');
            nextButton.id = "nextMonth";
            nextButton.innerHTML = "&#10095;";
            calendarNavigationButtons && calendarNavigationButtons.append(nextButton);


            // Create Calendar Table
            const calendarTable: HTMLTableElement = document.createElement("table");

            // Header
            const header: HTMLTableSectionElement = calendarTable.createTHead();
            const headerRow: HTMLTableRowElement = header.insertRow();

            const weekdaysRow: HTMLTableRowElement = calendarTable.insertRow();
            for (let i: number = 0; i < dayName().length; i++) {
                const cell: HTMLTableCellElement = weekdaysRow.insertCell();
                if (i === 5 || i === 6) {
                    cell.className = 'weekEnd';
                }

                // Current Day Name
                if (currentDate.getDay() - 1 !== -1) {
                    if (i === currentDate.getDay() - 1 && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear()) {
                        cell.classList.add('dayNameToday');
                    }
                } else {
                    if (i === currentDate.getDay() + 1 && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear()) {
                        cell.classList.add('dayNameToday');
                    }
                }

                cell.textContent = dayName(i).name;
            }


            // Body
            const body: HTMLTableSectionElement = calendarTable.createTBody();
            let date: number = 1;
            // → Rows
            for (let row: number = 0; row < 6; row++) {
                const weekRow: HTMLTableRowElement = body.insertRow();

                // → Columns
                for (let col: number = 1; col <= 7; col++) {

                    // Start Date Number to the right Day
                    if (row === 0 && col < startingDay) {
                        // Shifted Days
                        const cell: HTMLTableCellElement = weekRow.insertCell();
                        cell.className = "empty";
                    } else if (date > daysInMonth) {
                        break;
                    } else {
                        const cell: HTMLTableCellElement = weekRow.insertCell();
                        const today = new Date();

                        // Display Day Number
                        const dayNumber = document.createElement('div');
                        dayNumber.className = "dayNumber";
                        dayNumber.innerText = date.toString();
                        cell.append(dayNumber);

                        // Display Today
                        if (today.getMonth() === currentMonth &&
                            today.getFullYear() === currentYear &&
                            today.getDate() === date
                        ) {
                            cell.classList.add('today');
                        }

                        // Display Weekend
                        if (col === 6 || col === 7) {
                            cell.classList.add('weekEnd');
                        }

                        await displayEvents(cell, currentMonth, date, currentYear);

                        date++;
                    }
                }
            }

            calendarContainer.appendChild(calendarTable);

            // Buttons Action
            // → Previous
            const previousMonthButton = document.querySelector("#previousMonth");
            previousMonthButton?.addEventListener('click', () => previousMonth());
            // → Next
            const nextMonthButton = document.querySelector("#nextMonth");
            nextMonthButton?.addEventListener('click', () => nextMonth());
        }
    }


    // Buttons Action
    function previousMonth(): void {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        displayCalendar(currentMonth, currentYear);
    }

    function nextMonth(): void {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        displayCalendar(currentMonth, currentYear);
    }

    function dayName(day: number = 1) {
        const dayNames: string[] = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
        return { "name": dayNames[day], "length": dayNames.length };
    }
    function monthName(month: number): string {
        const monthNames: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        return monthNames[month];
    }


    // Functions
    async function displayEvents(cell: HTMLElement, currentMonth: number, date: number, currentYear: number) {
        const result = await ipcRenderer.invoke('bdd-event-get-all') as IEvent[];
        let events: Array<IEvent> = [];
        if (result) {
            result.forEach(element => {
                if (dateCheck(new Date(element.date_deb), new Date(element.date_fin), new Date(`${currentMonth + 1}/${date}/${currentYear}`))) {
                    events.push(element);
                }
            });
        }

        if (events) {
            events.forEach(event => {
                if (event.id) {
                    if (sameDate(event.date_deb, event.date_fin)) {
                        let from = `${getTimeToString(event.date_deb)}`;
                        let to = `${getTimeToString(event.date_fin)}`;
                        cell.append(displayEvent(event.id, event.titre, `${from} - ${to}`));
                    } else {
                        let from = `Du ${getDateToString(event.date_deb)} à ${getTimeToString(event.date_deb)}`;
                        let to = `Au ${getDateToString(event.date_fin)} à ${getTimeToString(event.date_fin)}`;
                        cell.append(displayEvent(event.id, event.titre, `${from} <br> ${to}`));
                    }
                }
            });
        }
    }
}