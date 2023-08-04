import { IICS } from "../../interface/ICSInterface";


// ************************
// ICALENDAR
// ************************
// VALUE=DATE:20230701 or 20110914T184000Z → Date
export function translateIcalDate(date: string): Date {
    let year, month, day, hour, min, sec, convertedDate;

    // Check if in iCal Date are VALUE=DATE or ISO Format
    if (/[a-zA-Z]/.test(date[0])) {
        // VALUE=DATE:20230701
        const dateValue = extractNumbersFromString(date);
        year = parseInt(dateValue.slice(0, 4));
        month = parseInt(dateValue.slice(4, 6)) - 1;
        day = parseInt(dateValue.slice(6, 8));
        hour = parseInt(dateValue.slice(8, 10));
        min = parseInt(dateValue.slice(10, 12));
        sec = parseInt(dateValue.slice(12, 14));

        if (year && month && day && hour && min && sec) {
            convertedDate = new Date(year, month, day, hour, min, sec);
        } else {
            convertedDate = new Date(year, month, day);
        }
    } else {
        // ISO Format
        // 0 1 2 3 | 4 5 | 6 7 | 8 | 9 10 | 11 12 | 13 14 | 15
        // 2 0 1 1 | 0 9 | 1 4 | T | 1  8 |  4  0 |  0  0 |  Z  
        year = parseInt(date.slice(0, 4));
        month = parseInt(date.slice(4, 6)) - 1;
        day = parseInt(date.slice(6, 8));
        hour = parseInt(date.slice(9, 11));
        min = parseInt(date.slice(11, 13));
        sec = parseInt(date.slice(13, 15));
        convertedDate = new Date(year, month, day, hour, min, sec);
    }

    return convertedDate;
}

// VALUE=DATE:20230701 → 20230701
function extractNumbersFromString(inputString: string): string {
    let numberString = "";
    for (let i = 0; i < inputString.length; i++) {
        const char = inputString.charAt(i);
        if (!isNaN(parseInt(char))) {
            numberString += char;
        }
    }
    return numberString;
}

// Convert ics → object
export const parseICS = (fileContent: string): IICS[] => {
    const lines = fileContent.split(/\r?\n/);
    const parsedData: IICS[] = [];
    let event: Partial<IICS> = {};

    lines.forEach(line => {
        if (line.startsWith('BEGIN:VEVENT')) {
            event = {};
        } else if (line.startsWith('END:VEVENT')) {
            parsedData.push(event as IICS);
        } else if (line.startsWith('DTSTART')) {
            event.start = line.substring(8);
        } else if (line.startsWith('DTEND')) {
            event.end = line.substring(6);
        } else if (line.startsWith('SUMMARY')) {
            event.summary = line.substring(8);
        } else if (line.startsWith('DESCRIPTION')) {
            event.description = line.substring(12);
        }
    })

    return parsedData;
}