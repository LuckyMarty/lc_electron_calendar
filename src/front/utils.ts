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






export const rangeDate = (from: Date, to: Date): string => {
    return `${formatDateToFR(from)} ${formatTime12to24(from)} - ${formatDateToFR(to)} ${formatTime12to24(to)}`
}

export const formatTime12to24 = (time: Date): string => {
    return `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
}

export const formatDateToFR = (date: Date): string => {
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
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