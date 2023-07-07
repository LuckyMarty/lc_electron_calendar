export default function calendar() {
    const currentDate: Date = new Date();
    let currentMonth: number = currentDate.getMonth();
    let currentYear: number = currentDate.getFullYear();
    displayCalendar(currentMonth, currentYear);

    function displayCalendar(month: number, year: number): void {
        const calendarContainer: HTMLElement | null = document.getElementById("calendar");
        if (calendarContainer) {
            calendarContainer.innerHTML = '';
            const firstDay: Date = new Date(year, month, 1);
            const daysInMonth: number = new Date(year, month + 1, 0).getDate();
            const startingDay: number = firstDay.getDay();
            console.log(currentDate.getDay());
            

            // Create Calendar Table
            const calendarTable: HTMLTableElement = document.createElement("table");

            // Header
            const header: HTMLTableSectionElement = calendarTable.createTHead();
            const headerRow: HTMLTableRowElement = header.insertRow();
            // → Previous Month
            const prevArrowCell: HTMLTableCellElement = headerRow.insertCell();
            const prevButton = document.createElement('button');
            prevButton.id = "previousMonth";
            prevButton.innerHTML = "&#10094;";
            prevArrowCell.append(prevButton);
            // → Current Month
            const headerCell: HTMLTableCellElement = headerRow.insertCell();
            headerCell.setAttribute("colspan", "5");
            headerCell.id = "calendar-title";
            headerCell.textContent = monthName(month) + " " + year;
            // → Previous Month
            const nextArrowCell: HTMLTableCellElement = headerRow.insertCell();
            const nextButton = document.createElement('button');
            nextButton.id = "nextMonth";
            nextButton.innerHTML = "&#10095;";
            nextArrowCell.append(nextButton);
            // → Days Name
            const weekdaysRow: HTMLTableRowElement = calendarTable.insertRow();
            for (let i: number = 0; i < dayName().length; i++) {
                const cell: HTMLTableCellElement = weekdaysRow.insertCell();
                if (i === 5 || i === 6) {
                    cell.className = 'weekEnd';
                }

                // Current Day Name
                if (currentDate.getDay()-1 !== -1) {
                    if (i === currentDate.getDay()-1) {
                        cell.classList.add('dayNameToday');
                    }
                } else {
                    cell.classList.add('dayNameToday');
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
                            cell.append(addEvent('Event Title', '1:00 - 1:20 PM'));
                        }

                        // Display Weekend
                        if (col === 6 || col === 7) {
                            cell.classList.add('weekEnd');
                        }

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
    function addEvent(title: string, content: string): HTMLDivElement {
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
}