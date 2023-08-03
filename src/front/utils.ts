// ************************
// INPUTS

import { IICS } from "../interface/ICSInterface";

// ************************
export const getInput = (element: string): HTMLInputElement => {
    return document.querySelector(element) as HTMLInputElement;
}

export const getValueAsDate = (element: string): Date => {
    return new Date((document.querySelector(element) as HTMLInputElement).value);
}

export const getValueAsString = (element: string): string => {
    return (document.querySelector(element) as HTMLInputElement).value;
}

export const getValueAsNumber = (element: string): number => {
    return parseFloat((document.querySelector(element) as HTMLInputElement).value);
}

export const emptyValue = (element: string) => {
    (document.querySelector(element) as HTMLInputElement).value = "";
}

export const setStringValue = (element: string, content: string) => {
    (document.querySelector(element) as HTMLInputElement).value = content;
}


// ************************
// DATE
// ************************
// 01/08/2023 10:00 - 02/08/2023 16:00
export const rangeDate = (from: Date, to: Date): string => {
    return `${formatDateToFR(from)} ${formatTime12to24(from)} - ${formatDateToFR(to)} ${formatTime12to24(to)}`
}

// 02:00 PM → 14:00
export const formatTime12to24 = (time: Date): string => {
    return `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
}

// DD/MM/YYYY
export const formatDateToFR = (date: Date): string => {
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

export function translateIcalDate(date: string): Date {
    let year, month, day, hour, min, sec, convertedDate;

    // VALUE=DATE:20230701
    if (/[a-zA-Z]/.test(date[0])) {
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


export const splitDate = (dates: string) => {
    // 01/08/2023 10:00 - 02/08/2023 06:00
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

export const parseICS = (fileContent: string): IICS[] => {
    const lines = fileContent.split(/\r?\n/);
    const parsedData: IICS[] = [];
    let event: Partial<IICS> = {};

    for (const line of lines) {
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
    }

    return parsedData;
}