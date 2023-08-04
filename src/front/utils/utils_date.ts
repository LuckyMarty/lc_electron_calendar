// Check if date is in range
export const dateCheck = (from: Date, to: Date, check: Date): boolean => {
    let fDate, lDate, cDate;
    fDate = Date.parse(`${from.getFullYear()}-${from.getMonth()}-${from.getDate()}`);
    lDate = Date.parse(`${to.getFullYear()}-${to.getMonth()}-${to.getDate()}`);
    cDate = Date.parse(`${check.getFullYear()}-${check.getMonth()}-${check.getDate()}`);

    if ((cDate <= lDate && cDate >= fDate)) {
        return true;
    }
    return false;
}

// Check if From and To Date are the same
export const sameDate = (from: Date, to: Date): boolean => {
    let fDate, lDate;
    fDate = Date.parse(`${from.getFullYear()}-${from.getMonth()}-${from.getDate()}`);
    lDate = Date.parse(`${to.getFullYear()}-${to.getMonth()}-${to.getDate()}`);

    if ((fDate == lDate)) {
        return true;
    }
    return false;
}

// Convert Date to String, FR Format
export const getDateToString = (date: Date): string => {
    return date.toLocaleDateString('fr-FR');
}

// Convert Time to String, 24h Format
export const getTimeToString = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}