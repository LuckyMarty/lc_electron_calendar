// ************************
// DATE
// ************************
// CHECK
export const isDateInRange = (from: Date, to: Date, check: Date): boolean => {
    let fDate, lDate, cDate;
    fDate = Date.parse(`${from.getFullYear()}-${from.getMonth()}-${from.getDate()}`);
    lDate = Date.parse(`${to.getFullYear()}-${to.getMonth()}-${to.getDate()}`);
    cDate = Date.parse(`${check.getFullYear()}-${check.getMonth()}-${check.getDate()}`);

    if ((cDate <= lDate && cDate >= fDate)) {
        return true;
    }
    return false;
}

export const isSameDate = (from: Date, to: Date): boolean => {
    let fDate, lDate;
    fDate = Date.parse(`${from.getFullYear()}-${from.getMonth()}-${from.getDate()}`);
    lDate = Date.parse(`${to.getFullYear()}-${to.getMonth()}-${to.getDate()}`);

    if ((fDate == lDate)) {
        return true;
    }
    return false;
}


// CONVERT
// Convert Date to String, FR Format
export const getDateToString = (date: Date): string => {
    return date.toLocaleDateString('fr-FR');
}

// Convert Time to String, 24h Format
export const getTimeToString = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

// Date - Date → 01/08/2023 10:00 - 02/08/2023 16:00
export const rangeDate = (from: Date, to: Date): string => {
    return `${formatDateToFR(from)} ${formatTime12to24(from)} - ${formatDateToFR(to)} ${formatTime12to24(to)}`
}

// 02:00 PM → 14:00
export const formatTime12to24 = (time: Date): string => {
    return `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
}

// Date → DD/MM/YYYY
export const formatDateToFR = (date: Date): string => {
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

// 01/08/2023 10:00 - 02/08/2023 06:00 → [Date, Date]
export const splitDate = (dates: string) => {
    let splitDate = dates.split('-');

    // From
    let from = splitDate[0].split(" ");
    let fromDate = from[0].split("/");
    let fromDay = fromDate[0];
    let fromMonth = fromDate[1];
    let fromYear = fromDate[2];

    let fromTime = from[1].split(":");
    let fromHour = fromTime[0];
    let fromMinute = fromTime[1];

    // To
    let to = splitDate[1].split(" ");
    let toDate = to[1].split("/");
    let toDay = toDate[0];
    let toMonth = toDate[1];
    let toYear = toDate[2];

    let toTime = to[2].split(":");
    let toHour = toTime[0];
    let toMinute = toTime[1];

    return [
        new Date(parseInt(fromYear), parseInt(fromMonth) - 1, parseInt(fromDay), parseInt(fromHour), parseInt(fromMinute)),
        new Date(parseInt(toYear), parseInt(toMonth) - 1, parseInt(toDay), parseInt(toHour), parseInt(toMinute))
    ]
}